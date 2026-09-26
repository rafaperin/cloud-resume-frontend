(() => {
    const themeStorageKey = 'cloud-resume-theme';
    const themeToggle = document.querySelector('[data-theme-toggle]');

    if (!themeToggle) {
        return;
    }

    const themeToggleLabel = themeToggle.querySelector('[data-theme-toggle-label]');
    const themeToggleIcon = themeToggle.querySelector('[data-theme-toggle-icon]');
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

        if (themeToggleIcon) {
            themeToggleIcon.textContent = isDarkTheme ? '☀' : '☾';
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
