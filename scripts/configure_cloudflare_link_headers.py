#!/usr/bin/env python3
"""Configure the Cloudflare Link header that advertises site discovery documents."""

from __future__ import annotations

import json
import os
import sys
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

API_BASE_URL = 'https://api.cloudflare.com/client/v4'
RESPONSE_HEADER_PHASE = 'http_response_headers_transform'
RULE_REF = 'cloud_resume_discovery_links'


def api_request(
    method: str,
    path: str,
    token: str,
    payload: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Call Cloudflare's Rulesets API and return a successful JSON response."""
    body = None if payload is None else json.dumps(payload).encode('utf-8')
    request = Request(
        f'{API_BASE_URL}{path}',
        data=body,
        method=method,
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
        },
    )

    try:
        with urlopen(request, timeout=30) as response:
            result = json.load(response)
    except HTTPError as error:
        error_body = error.read().decode('utf-8', errors='replace')
        raise RuntimeError(
            f'Cloudflare API request failed ({error.code}) for {method} {path}: {error_body}'
        ) from error
    except URLError as error:
        raise RuntimeError(f'Cloudflare API request failed for {method} {path}: {error}') from error

    if not result.get('success'):
        raise RuntimeError(f'Cloudflare API reported failure for {method} {path}: {result}')

    return result


def discovery_link_value(public_site_url: str) -> tuple[str, str]:
    """Return the public host and Link header value derived from the site URL."""
    parsed_url = urlparse(public_site_url)
    if parsed_url.scheme != 'https' or not parsed_url.netloc or parsed_url.path not in ('', '/'):
        raise ValueError('PUBLIC_SITE_URL must be an HTTPS origin URL without a path.')

    base_url = public_site_url.rstrip('/')
    return (
        parsed_url.hostname or '',
        (
            f'<{base_url}/resume.md>; rel="alternate"; type="text/markdown", '
            f'<{base_url}/llms.txt>; rel="describedby", '
            f'<{base_url}/.well-known/ard.json>; rel="ard"; type="application/json"'
        ),
    )


def desired_rule(public_site_url: str) -> dict[str, Any]:
    """Build the idempotent response-header transform rule definition."""
    host, link_value = discovery_link_value(public_site_url)
    return {
        'ref': RULE_REF,
        'description': 'Advertise Cloud Resume discovery documents',
        'expression': f'(http.host eq "{host}")',
        'action': 'rewrite',
        'action_parameters': {
            'headers': {
                'link': {
                    'operation': 'set',
                    'value': link_value,
                }
            }
        },
    }


def matching_ruleset(rulesets: list[dict[str, Any]]) -> dict[str, Any] | None:
    """Find the zone-level response-header transform ruleset, if it exists."""
    return next(
        (
            ruleset
            for ruleset in rulesets
            if ruleset.get('kind') == 'zone' and ruleset.get('phase') == RESPONSE_HEADER_PHASE
        ),
        None,
    )


def rule_matches(existing_rule: dict[str, Any], desired: dict[str, Any]) -> bool:
    """Compare only the author-controlled properties of a transform rule."""
    return all(existing_rule.get(key) == value for key, value in desired.items())


def main() -> None:
    """Create or update the discovery Link response-header rule."""
    token = os.environ['CLOUDFLARE_API_TOKEN']
    zone_id = os.environ['CLOUDFLARE_ZONE_ID']
    desired = desired_rule(os.environ['PUBLIC_SITE_URL'])

    rulesets_response = api_request('GET', f'/zones/{zone_id}/rulesets', token)
    ruleset = matching_ruleset(rulesets_response.get('result', []))

    if ruleset is None:
        response = api_request(
            'POST',
            f'/zones/{zone_id}/rulesets',
            token,
            {
                'name': 'Cloud Resume Response Header Transform Rules',
                'description': 'Cloud Resume edge response headers managed by CI/CD.',
                'kind': 'zone',
                'phase': RESPONSE_HEADER_PHASE,
                'rules': [desired],
            },
        )
        print(f'Created response-header transform ruleset {response["result"]["id"]}.')
        return

    ruleset_id = ruleset['id']
    ruleset_response = api_request('GET', f'/zones/{zone_id}/rulesets/{ruleset_id}', token)
    existing_rule = next(
        (
            rule
            for rule in ruleset_response['result'].get('rules', [])
            if rule.get('ref') == RULE_REF
        ),
        None,
    )

    if existing_rule is None:
        api_request('POST', f'/zones/{zone_id}/rulesets/{ruleset_id}/rules', token, desired)
        print(f'Added discovery Link header rule to ruleset {ruleset_id}.')
    elif rule_matches(existing_rule, desired):
        print('Discovery Link header rule already matches the repository configuration.')
    else:
        api_request(
            'PATCH',
            f'/zones/{zone_id}/rulesets/{ruleset_id}/rules/{existing_rule["id"]}',
            token,
            desired,
        )
        print(f'Updated discovery Link header rule in ruleset {ruleset_id}.')


if __name__ == '__main__':
    try:
        main()
    except (KeyError, RuntimeError, ValueError) as error:
        print(f'error: {error}', file=sys.stderr)
        raise SystemExit(1) from error
