(() => {
    const themeStorageKey = 'cloud-resume-theme';
    const themeToggle = document.querySelector('[data-theme-toggle]');
    const themeLabels = {
        en: { dark: 'Dark mode', light: 'Light mode', darkAction: 'Switch to dark mode', lightAction: 'Switch to light mode' },
        'pt-BR': { dark: 'Modo escuro', light: 'Modo claro', darkAction: 'Mudar para o modo escuro', lightAction: 'Mudar para o modo claro' },
        es: { dark: 'Modo oscuro', light: 'Modo claro', darkAction: 'Cambiar al modo oscuro', lightAction: 'Cambiar al modo claro' },
    };
    let locale = document.documentElement.lang;

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
        const labels = themeLabels[locale] ?? themeLabels.en;

        document.documentElement.dataset.theme = theme;
        themeToggle.setAttribute('aria-pressed', String(isDarkTheme));
        themeToggle.setAttribute('aria-label', isDarkTheme ? labels.lightAction : labels.darkAction);

        if (themeToggleLabel) {
            themeToggleLabel.textContent = isDarkTheme ? labels.light : labels.dark;
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

    window.addEventListener('cloudresumelanguagechange', (event) => {
        locale = event.detail.locale;
        setTheme(document.documentElement.dataset.theme, false);
    });
})();
