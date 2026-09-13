(() => {
    const requestTimeoutMilliseconds = 5_000;
    const counterElement = document.querySelector('[data-visitor-counter]');

    if (!counterElement) {
        return;
    }

    const countElement = counterElement.querySelector('.visitor-counter__value');
    const endpoint = counterElement.dataset.visitorCounterEndpoint;

    if (!countElement || !endpoint) {
        return;
    }

    const setCountText = (text) => {
        countElement.textContent = text;
    };

    const incrementVisitorCount = async () => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMilliseconds);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`Visitor counter request failed with status ${response.status}.`);
            }

            const data = await response.json();

            if (!Number.isSafeInteger(data.count) || data.count < 0) {
                throw new Error('Visitor counter response contained an invalid count.');
            }

            setCountText(data.count.toLocaleString());
        } catch {
            setCountText('Unavailable');
        } finally {
            window.clearTimeout(timeoutId);
        }
    };

    setCountText('Loading…');
    void incrementVisitorCount();
})();
