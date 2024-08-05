const axios = require('axios');
const crypto = require('crypto');
const readline = require('readline');

// Fonction pour obtenir le jeton d'accès Facebook
const getFacebookAccessToken = async (login, password) => {
    const api_key = '882a8490361da98702bf97a021ddc14d';
    const secret = '62f8ce9f74b12f84c123cc23437a4a32';
    const req = {
        api_key: api_key,
        email: login,
        format: 'json',
        locale: 'fr_FR',
        method: 'auth.login',
        password: password,
        return_ssl_resources: 0,
        v: '1.0',
    };
    const sig = Object.keys(req).sort().map(k => `${k}=${req[k]}`).join('') + secret;
    req.sig = crypto.createHash('md5').update(sig).digest('hex');

    const api_url = 'https://api.facebook.com/restserver.php';
    try {
        const response = await axios.post(api_url, new URLSearchParams(req), {
            headers: { 'User-Agent': '[FBAN/FB4A;FBAV/35.0.0.48.273;FBDM/{density=1.33125,width=800,height=1205};FBLC/fr_FR;FBCR/;FBPN/com.facebook.katana;FBDV/Nexus 7;FBSV/4.1.1;FBBK/0;]' }
        });
        const reg = response.data;
        if (reg.access_token) {
            console.log(`[✓] Jeton d'accès récupéré: ${reg.access_token}`);
            return reg.access_token;
        } else {
            console.error(`[×] Erreur d'obtention du jeton d'accès: ${reg.error_msg ? reg.error_msg : 'Erreur inconnue'}`);
            return null;
        }
    } catch (error) {
        console.error(`[×] Erreur d'obtention du jeton d'accès: ${error}`);
        return null;
    }
};

// Créez une interface de lecture pour obtenir l'entrée utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour afficher les messages avec les codes d'échappement ANSI
const displayPrompt = () => {
    console.log('\x1b[33m[ ! ] - \x1b[0m\x1b[37myour email/phone number\x1b[0m');
    console.log('\x1b[33m[ ! ] - \x1b[0m\x1b[37myour password\x1b[0m');
};

// Demander les informations à l'utilisateur
const askForCredentials = () => {
    displayPrompt();
    rl.question('\x1b[33m[ ! ] - \x1b[0m\x1b[37mPlease enter your email/phone number: \x1b[0m', (login) => {
        rl.question('\x1b[33m[ ! ] - \x1b[0m\x1b[37mPlease enter your password: \x1b[0m', (password) => {
            rl.close();
            getFacebookAccessToken(login, password);
        });
    });
};

// Exécuter la fonction pour demander les informations
askForCredentials();