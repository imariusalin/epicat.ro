const translations = {
    en: {
        title: "ePicat.ro",
        enterDomain: "Enter domain",
        checkDomain: "Check Domain",
        domainInfo: "Domain Info",
        status: "Status:",
        ip: "IP:",
        nameservers: "Nameservers:",
        reverseDns: "Reverse DNS:"
    },
    ro: {
        title: "ePicat.ro",
        enterDomain: "Introduceți domeniul",
        checkDomain: "Verifică Domeniul",
        domainInfo: "Informații Domeniu",
        status: "Stare:",
        ip: "IP:",
        nameservers: "Nume servere:",
        reverseDns: "DNS invers:"
    },
    fr: {
        title: "Vérificateur de Domaine",
        enterDomain: "Entrez le domaine",
        checkDomain: "Vérifier le Domaine",
        domainInfo: "Informations sur le Domaine",
        status: "Statut:",
        ip: "IP:",
        nameservers: "Serveurs de noms:",
        reverseDns: "DNS inversé:"
    },
    de: {
        title: "Domain Prüfer",
        enterDomain: "Domain eingeben",
        checkDomain: "Domain Prüfen",
        domainInfo: "Domain Informationen",
        status: "Status:",
        ip: "IP:",
        nameservers: "Nameserver:",
        reverseDns: "Reverse DNS:"
    },
    it: {
        title: "Controllo Dominio",
        enterDomain: "Inserisci il dominio",
        checkDomain: "Verifica Dominio",
        domainInfo: "Informazioni sul Dominio",
        status: "Stato:",
        ip: "IP:",
        nameservers: "Nameserver:",
        reverseDns: "DNS inverso:"
    }
};

function setLanguage(lang) {
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('domainInput').placeholder = translations[lang].enterDomain;
    document.getElementById('checkButton').textContent = translations[lang].checkDomain;
    document.getElementById('domainInfoTitle').textContent = translations[lang].domainInfo;
    document.getElementById('statusLabel').textContent = translations[lang].status;
    document.getElementById('ipLabel').textContent = translations[lang].ip;
    document.getElementById('nameserversLabel').textContent = translations[lang].nameservers;
    document.getElementById('reversednsLabel').textContent = translations[lang].reverseDns;
}

document.getElementById('languageSelect').addEventListener('change', function() {
    setLanguage(this.value);
});

document.getElementById('checkButton').addEventListener('click', function() {
    var domain = document.getElementById('domainInput').value;
    fetch('/check?domain=' + domain)
        .then(response => response.json())
        .then(data => {
            const statusElement = document.getElementById('status');
            if (data.status.toLowerCase() === 'online') {
                statusElement.textContent = data.status.toUpperCase();
                statusElement.classList.remove('text-red-500');
                statusElement.classList.add('text-green-500');
            } else {
                statusElement.textContent = data.status.toUpperCase();
                statusElement.classList.remove('text-green-500');
                statusElement.classList.add('text-red-500');
            }
            document.getElementById('ip').textContent = data.ip;
            document.getElementById('nameservers').textContent = data.nameservers.join(', ');
            document.getElementById('reversedns').textContent = data.reversedns;
            document.getElementById('result').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Set default language to English
setLanguage('ro');
