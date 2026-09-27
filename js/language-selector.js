(() => {
    const languageStorageKey = 'cloud-resume-language';
    const languageSelector = document.querySelector('[data-language-selector]');
    const supportedLanguages = ['en', 'pt-BR', 'es'];

    if (!languageSelector) {
        return;
    }

    const translations = {
        en: {
            documentTitle: 'Rafael Ferreira | Lead Architect',
            metaDescription: 'Cloud resume for Rafael Ferreira, MIT Innovator Under 35 and Lead Architect specializing in Python, FastAPI, AWS, and Azure.',
            ogDescription: 'Cloud resume of Rafael Ferreira, Lead Architect specializing in software architecture, Python, AWS, Azure, and spatial computing.',
            ogLocale: 'en_US',
            skipToMain: 'Skip to main content',
            headline: 'MIT Innovator Under 35 | Lead Architect at NTT DATA',
            linkedinProfile: 'LinkedIn profile',
            githubProfile: 'GitHub profile',
            languageSelectorLabel: 'Language',
            languageSelectorAriaLabel: 'Choose language',
            resumeSections: 'Resume sections',
            summary: 'Summary', skills: 'Skills', experience: 'Experience', projects: 'Projects', education: 'Education', certifications: 'Certifications', languages: 'Languages',
            summaryBody: 'Passionate software engineer and cloud architect with extensive experience building scalable backend systems using Python, FastAPI, AWS, and Azure. Proven ability to lead engineering teams while remaining deeply involved in hands-on development. Recognized as an MIT Innovator Under 35 for pioneering work in spatial computing. Committed to writing clean, efficient code and delivering robust solutions in high-impact environments.',
            skillCiCd: 'Continuous Integration and Continuous Delivery (CI/CD)', skillArchitecture: 'Software Architecture', skillCloud: 'Cloud Infrastructure',
            leadArchitect: 'Lead Architect', experienceDates: 'April 2018–Present', saoPauloArea: 'São Paulo Area, Brazil', experienceIntro: "Lead Architect of Spatial Web at Innovation Center Brazil's team.", techStack: 'Tech stack',
            experienceBodyOne: 'As Lead Architect in the Innovation Center Brazil team, I design and implement scalable backend systems and cloud-native solutions using Python, FastAPI, Docker, AWS, and Azure. I lead multidisciplinary teams in the development of spatial computing platforms, combining AR/VR technologies with Artificial Intelligence and Open Gateway to deliver immersive user experiences.',
            experienceBodyTwo: 'I collaborate closely with stakeholders to translate business needs into robust technical architectures, drive R&D initiatives, and mentor engineers and college students. My work emphasizes clean software design, performance, and cloud scalability while fostering innovation and continuous learning within the team.',
            cloudResumeChallenge: 'Azure Cloud Resume Challenge', completed: 'Completed',
            projectBody: 'This website is an evolving cloud resume built to demonstrate frontend development, Python backend engineering, automated testing, infrastructure as code, and cloud deployment on Azure. The project follows Clean Architecture and clean coding standards so each feature can be developed, tested, and deployed independently.',
            projectMilestones: 'Project milestones', milestoneResume: 'Completed: semantic, accessible, responsive cloud resume', milestoneStorage: 'Completed: Azure Storage static website hosting', milestoneDomain: 'Completed: custom domain, HTTPS, and CDN through Cloudflare', milestoneCounter: 'Completed: JavaScript visitor counter backed by Azure Functions and Cosmos DB', milestoneTests: 'Completed: automated Python tests with coverage enforcement', milestoneBicep: 'Completed: Azure infrastructure defined with Bicep', milestoneBackendCi: 'Completed: backend CI/CD using GitHub Actions and OIDC', milestoneFrontendCi: 'Completed: frontend CI/CD with Cloudflare cache invalidation',
            postgraduate: 'Postgraduate Degree in Software Architecture', postgraduateDates: 'March 2023–March 2024', bachelors: "Bachelor's Degree in Information Systems", bachelorsDates: '2014–2017',
            spanishCertificate: 'EF SET Spanish Certificate — 58/100 (B2 Upper Intermediate)', englishCertificate: 'EF SET English Certificate — 76/100 (C2 Proficient)',
            portuguese: 'Portuguese', english: 'English', spanish: 'Spanish', nativeProficiency: 'Native or bilingual proficiency', professionalProficiency: 'Professional working proficiency',
            footerThanks: 'Thank you for visiting my cloud resume.', visitorCount: 'Visitor count:',
        },
        'pt-BR': {
            documentTitle: 'Rafael Ferreira | Arquiteto Líder',
            metaDescription: 'Currículo em nuvem de Rafael Ferreira, Inovador do MIT com menos de 35 anos e Arquiteto Líder especializado em Python, FastAPI, AWS e Azure.',
            ogDescription: 'Currículo em nuvem de Rafael Ferreira, Arquiteto Líder especializado em arquitetura de software, Python, AWS, Azure e computação espacial.',
            ogLocale: 'pt_BR',
            skipToMain: 'Ir para o conteúdo principal',
            headline: 'Inovador do MIT com menos de 35 anos | Arquiteto Líder na NTT DATA',
            linkedinProfile: 'Perfil do LinkedIn', githubProfile: 'Perfil do GitHub', languageSelectorLabel: 'Idioma', languageSelectorAriaLabel: 'Escolher idioma', resumeSections: 'Seções do currículo',
            summary: 'Resumo', skills: 'Competências', experience: 'Experiência', projects: 'Projetos', education: 'Formação', certifications: 'Certificações', languages: 'Idiomas',
            summaryBody: 'Engenheiro de software e arquiteto de nuvem apaixonado, com ampla experiência na construção de sistemas de backend escaláveis usando Python, FastAPI, AWS e Azure. Capacidade comprovada de liderar equipes de engenharia enquanto permanece profundamente envolvido no desenvolvimento prático. Reconhecido como Inovador do MIT com menos de 35 anos por trabalhos pioneiros em computação espacial. Comprometido em escrever código limpo e eficiente e em entregar soluções robustas em ambientes de alto impacto.',
            skillCiCd: 'Integração e Entrega Contínuas (CI/CD)', skillArchitecture: 'Arquitetura de Software', skillCloud: 'Infraestrutura de Nuvem',
            leadArchitect: 'Arquiteto Líder', experienceDates: 'Abril de 2018–Atual', saoPauloArea: 'Região de São Paulo, Brasil', experienceIntro: 'Arquiteto Líder de Spatial Web na equipe do Innovation Center Brazil.', techStack: 'Tecnologias',
            experienceBodyOne: 'Como Arquiteto Líder da equipe do Innovation Center Brazil, projeto e implemento sistemas de backend escaláveis e soluções nativas de nuvem usando Python, FastAPI, Docker, AWS e Azure. Lidero equipes multidisciplinares no desenvolvimento de plataformas de computação espacial, combinando tecnologias de AR/VR, Inteligência Artificial e Open Gateway para oferecer experiências imersivas aos usuários.',
            experienceBodyTwo: 'Colaboro de perto com as partes interessadas para transformar necessidades de negócio em arquiteturas técnicas robustas, conduzir iniciativas de P&D e orientar engenheiros e estudantes universitários. Meu trabalho enfatiza design de software limpo, desempenho e escalabilidade em nuvem, promovendo inovação e aprendizado contínuo dentro da equipe.',
            cloudResumeChallenge: 'Desafio do Currículo em Nuvem no Azure', completed: 'Concluído',
            projectBody: 'Este site é um currículo em nuvem em evolução, criado para demonstrar desenvolvimento frontend, engenharia de backend em Python, testes automatizados, infraestrutura como código e implantação em nuvem no Azure. O projeto segue padrões de Clean Architecture e código limpo para que cada funcionalidade possa ser desenvolvida, testada e implantada de forma independente.',
            projectMilestones: 'Marcos do projeto', milestoneResume: 'Concluído: currículo em nuvem semântico, acessível e responsivo', milestoneStorage: 'Concluído: hospedagem de site estático no Azure Storage', milestoneDomain: 'Concluído: domínio personalizado, HTTPS e CDN pelo Cloudflare', milestoneCounter: 'Concluído: contador de visitantes em JavaScript com Azure Functions e Cosmos DB', milestoneTests: 'Concluído: testes automatizados em Python com cobertura obrigatória', milestoneBicep: 'Concluído: infraestrutura Azure definida com Bicep', milestoneBackendCi: 'Concluído: CI/CD de backend usando GitHub Actions e OIDC', milestoneFrontendCi: 'Concluído: CI/CD de frontend com invalidação de cache do Cloudflare',
            postgraduate: 'Pós-graduação em Arquitetura de Software', postgraduateDates: 'Março de 2023–Março de 2024', bachelors: 'Bacharelado em Sistemas de Informação', bachelorsDates: '2014–2017',
            spanishCertificate: 'Certificado de Espanhol EF SET — 58/100 (B2 Intermediário Superior)', englishCertificate: 'Certificado de Inglês EF SET — 76/100 (C2 Proficiente)',
            portuguese: 'Português', english: 'Inglês', spanish: 'Espanhol', nativeProficiency: 'Proficiência nativa ou bilíngue', professionalProficiency: 'Proficiência profissional',
            footerThanks: 'Obrigado por visitar meu currículo em nuvem.', visitorCount: 'Contagem de visitantes:',
        },
        es: {
            documentTitle: 'Rafael Ferreira | Arquitecto Líder',
            metaDescription: 'Currículum en la nube de Rafael Ferreira, Innovador del MIT menor de 35 años y Arquitecto Líder especializado en Python, FastAPI, AWS y Azure.',
            ogDescription: 'Currículum en la nube de Rafael Ferreira, Arquitecto Líder especializado en arquitectura de software, Python, AWS, Azure y computación espacial.',
            ogLocale: 'es_ES',
            skipToMain: 'Saltar al contenido principal',
            headline: 'Innovador del MIT menor de 35 años | Arquitecto Líder en NTT DATA',
            linkedinProfile: 'Perfil de LinkedIn', githubProfile: 'Perfil de GitHub', languageSelectorLabel: 'Idioma', languageSelectorAriaLabel: 'Elegir idioma', resumeSections: 'Secciones del currículum',
            summary: 'Resumen', skills: 'Habilidades', experience: 'Experiencia', projects: 'Proyectos', education: 'Educación', certifications: 'Certificaciones', languages: 'Idiomas',
            summaryBody: 'Ingeniero de software y arquitecto de nube apasionado, con amplia experiencia en la creación de sistemas backend escalables con Python, FastAPI, AWS y Azure. Capacidad demostrada para liderar equipos de ingeniería y, al mismo tiempo, mantener una participación profunda en el desarrollo práctico. Reconocido como Innovador del MIT menor de 35 años por trabajo pionero en computación espacial. Comprometido con escribir código limpio y eficiente y entregar soluciones robustas en entornos de alto impacto.',
            skillCiCd: 'Integración y Entrega Continuas (CI/CD)', skillArchitecture: 'Arquitectura de Software', skillCloud: 'Infraestructura en la Nube',
            leadArchitect: 'Arquitecto Líder', experienceDates: 'Abril de 2018–Actualidad', saoPauloArea: 'Área de São Paulo, Brasil', experienceIntro: 'Arquitecto Líder de Spatial Web en el equipo de Innovation Center Brazil.', techStack: 'Tecnologías',
            experienceBodyOne: 'Como Arquitecto Líder del equipo de Innovation Center Brazil, diseño e implemento sistemas backend escalables y soluciones nativas de nube con Python, FastAPI, Docker, AWS y Azure. Lidero equipos multidisciplinarios en el desarrollo de plataformas de computación espacial, combinando tecnologías de AR/VR con Inteligencia Artificial y Open Gateway para ofrecer experiencias de usuario inmersivas.',
            experienceBodyTwo: 'Colaboro estrechamente con las partes interesadas para traducir necesidades de negocio en arquitecturas técnicas robustas, impulsar iniciativas de I+D y orientar a ingenieros y estudiantes universitarios. Mi trabajo enfatiza el diseño de software limpio, el rendimiento y la escalabilidad en la nube, al tiempo que promueve la innovación y el aprendizaje continuo dentro del equipo.',
            cloudResumeChallenge: 'Desafío del Currículum en la Nube de Azure', completed: 'Completado',
            projectBody: 'Este sitio es un currículum en la nube en evolución, creado para demostrar desarrollo frontend, ingeniería backend con Python, pruebas automatizadas, infraestructura como código e implementación en la nube en Azure. El proyecto sigue estándares de Clean Architecture y código limpio para que cada funcionalidad pueda desarrollarse, probarse e implementarse de forma independiente.',
            projectMilestones: 'Hitos del proyecto', milestoneResume: 'Completado: currículum en la nube semántico, accesible y adaptable', milestoneStorage: 'Completado: alojamiento de sitio web estático en Azure Storage', milestoneDomain: 'Completado: dominio personalizado, HTTPS y CDN mediante Cloudflare', milestoneCounter: 'Completado: contador de visitantes en JavaScript respaldado por Azure Functions y Cosmos DB', milestoneTests: 'Completado: pruebas automatizadas de Python con exigencia de cobertura', milestoneBicep: 'Completado: infraestructura de Azure definida con Bicep', milestoneBackendCi: 'Completado: CI/CD de backend mediante GitHub Actions y OIDC', milestoneFrontendCi: 'Completado: CI/CD de frontend con invalidación de caché de Cloudflare',
            postgraduate: 'Posgrado en Arquitectura de Software', postgraduateDates: 'Marzo de 2023–Marzo de 2024', bachelors: 'Licenciatura en Sistemas de Información', bachelorsDates: '2014–2017',
            spanishCertificate: 'Certificado de Español EF SET — 58/100 (B2 Intermedio Alto)', englishCertificate: 'Certificado de Inglés EF SET — 76/100 (C2 Competente)',
            portuguese: 'Portugués', english: 'Inglés', spanish: 'Español', nativeProficiency: 'Dominio nativo o bilingüe', professionalProficiency: 'Dominio profesional',
            footerThanks: 'Gracias por visitar mi currículum en la nube.', visitorCount: 'Número de visitantes:',
        },
    };

    const getSavedLanguage = () => {
        try {
            const language = window.localStorage.getItem(languageStorageKey);
            return supportedLanguages.includes(language) ? language : null;
        } catch {
            return null;
        }
    };

    const getBrowserLanguage = () => {
        const browserLanguages = navigator.languages ?? [navigator.language];
        const matchingLanguage = browserLanguages.find((language) => {
            const normalizedLanguage = language.toLowerCase();
            return normalizedLanguage.startsWith('pt') || normalizedLanguage.startsWith('es') || normalizedLanguage.startsWith('en');
        });

        if (!matchingLanguage) {
            return 'en';
        }

        if (matchingLanguage.toLowerCase().startsWith('pt')) {
            return 'pt-BR';
        }

        return matchingLanguage.toLowerCase().startsWith('es') ? 'es' : 'en';
    };

    const setMetaContent = (selector, value) => {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute('content', value);
        }
    };

    const setLanguage = (language, savePreference) => {
        const locale = supportedLanguages.includes(language) ? language : 'en';
        const content = translations[locale];

        document.documentElement.lang = locale;
        document.title = content.documentTitle;
        languageSelector.value = locale;
        languageSelector.setAttribute('aria-label', content.languageSelectorAriaLabel);

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const value = content[element.dataset.i18n];
            if (value) {
                element.textContent = value;
            }
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
            const value = content[element.dataset.i18nAriaLabel];
            if (value) {
                element.setAttribute('aria-label', value);
            }
        });

        setMetaContent('meta[name="description"]', content.metaDescription);
        setMetaContent('meta[property="og:title"]', content.documentTitle);
        setMetaContent('meta[property="og:description"]', content.ogDescription);
        setMetaContent('meta[property="og:locale"]', content.ogLocale);
        setMetaContent('meta[name="twitter:title"]', content.documentTitle);
        setMetaContent('meta[name="twitter:description"]', content.ogDescription);

        if (savePreference) {
            try {
                window.localStorage.setItem(languageStorageKey, locale);
            } catch {
                // The selected language remains active for this page when storage is unavailable.
            }
        }

        window.dispatchEvent(new CustomEvent('cloudresumelanguagechange', { detail: { locale } }));
    };

    setLanguage(getSavedLanguage() ?? getBrowserLanguage(), false);
    languageSelector.addEventListener('change', () => setLanguage(languageSelector.value, true));
})();
