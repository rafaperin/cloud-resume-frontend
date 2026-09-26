(() => {
    const themeStorageKey = 'cloud-resume-theme';
    const themeToggle = document.querySelector('[data-theme-toggle]');

    if (!themeToggle) {
        return;
    }

    const themeToggleLabel = themeToggle.querySelector('[data-theme-toggle-label]');
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

    const getSavedTheme = () => {
        try {
            const theme = window.localStorage.getItem(themeStorageKey);
            return theme === 'light' || theme === 'dark' ? theme : null;
        } catch {
            return null;
        }
    };

    const setTheme = (theme, savePreference) => {
        const isDarkTheme = theme === 'dark';

        document.documentElement.dataset.theme = theme;
        themeToggle.setAttribute('aria-pressed', String(isDarkTheme));
        themeToggle.setAttribute('aria-label', isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode');

        if (themeToggleLabel) {
            themeToggleLabel.textContent = isDarkTheme ? 'Light mode' : 'Dark mode';
        }

        if (savePreference) {
            try {
                window.localStorage.setItem(themeStorageKey, theme);
            } catch {
                // Theme selection remains active for this page even if storage is unavailable.
            }
        }
    };

    setTheme(getSavedTheme() ?? (prefersDarkTheme.matches ? 'dark' : 'light'), false);

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme, true);
    });
})();

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
