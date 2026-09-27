(() => {
    const requestTimeoutMilliseconds = 5_000;
    const counterElement = document.querySelector('[data-visitor-counter]');
    const counterLabels = {
        en: { loading: 'Loading…', unavailable: 'Unavailable' },
        'pt-BR': { loading: 'Carregando…', unavailable: 'Indisponível' },
        es: { loading: 'Cargando…', unavailable: 'No disponible' },
    };
    let locale = document.documentElement.lang;
    let count = null;
    let state = 'loading';

    if (!counterElement) {
        return;
    }

    const countElement = counterElement.querySelector('.visitor-counter__value');
    const endpoint = counterElement.dataset.visitorCounterEndpoint;

    if (!countElement || !endpoint) {
        return;
    }

    const renderCount = () => {
        const labels = counterLabels[locale] ?? counterLabels.en;
        countElement.textContent = count === null ? labels[state] : count.toLocaleString(locale);
    };

    const incrementVisitorCount = async () => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMilliseconds);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`Visitor counter request failed with status ${response.status}.`);
            }

            const data = await response.json();

            if (!Number.isSafeInteger(data.count) || data.count < 0) {
                throw new Error('Visitor counter response contained an invalid count.');
            }

            count = data.count;
        } catch {
            state = 'unavailable';
        } finally {
            window.clearTimeout(timeoutId);
            renderCount();
        }
    };

    window.addEventListener('cloudresumelanguagechange', (event) => {
        locale = event.detail.locale;
        renderCount();
    });

    renderCount();
    void incrementVisitorCount();
})();
