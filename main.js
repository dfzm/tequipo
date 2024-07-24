document.addEventListener('DOMContentLoaded', function() {
    const languageButtons = document.querySelectorAll('#language-switcher button');

    function loadTranslations(lang) {
        fetch(`/web/lang/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(translations => {
                // Aplicar las traducciones al contenido
                for (const key in translations) {
                    const element = document.getElementById(key);
                    if (element) {
                        element.innerText = translations[key];
                    }
                }
            })
            .catch(error => console.error('Error cargando las traducciones:', error));
    }

    // Recuperar el idioma guardado o usar el predeterminado
    const savedLang = localStorage.getItem('lang') || 'es';
    loadTranslations(savedLang);

    // Agregar event listeners a los botones de idioma
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.id === 'btn-es' ? 'es' : 'en';
            loadTranslations(lang);
            localStorage.setItem('lang', lang); // Guardar el idioma seleccionado
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    fetch('/web/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el header:', error));
});