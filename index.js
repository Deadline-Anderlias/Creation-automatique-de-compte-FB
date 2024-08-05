const { exec } = require('child_process');
const readline = require('readline');

// Créez une interface de lecture pour obtenir l'entrée utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour afficher les informations
const displayInfo = () => {
    console.log('\x1b[33mThis Tools made by Deadline Anderlias\x1b[0m');
    console.log('\x1b[33m────────────────────────────────────────────────────────────────────────────────\x1b[0m');
    console.log('\x1b[31m\x1b[1m[ 1 ]\x1b[0m - \x1b[34mAuto create Facebook account\x1b[0m');
    console.log('\x1b[31m\x1b[1m[ 2 ]\x1b[0m - \x1b[34mGet Access Token\x1b[0m\n');
};

// Fonction pour effacer l'écran
const clearScreen = () => {
    process.stdout.write('\x1b[2J\x1b[0;0H'); // Efface l'écran et remet le curseur en haut à gauche
};

// Fonction pour exécuter les scripts en fonction de l'entrée utilisateur
const executeScript = (choice) => {
    clearScreen(); // Effacer l'écran avant d'exécuter le script
    if (choice === '1') {
        exec('node compte.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de compte.js: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Erreur: ${stderr}`);
                return;
            }
            console.log(`Sortie de compte.js:\n${stdout}`);
        });
    } else if (choice === '2') {
        exec('node connexion.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur lors de l'exécution de connexion.js: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Erreur: ${stderr}`);
                return;
            }
            console.log(`Sortie de connexion.js:\n${stdout}`);
        });
    } else {
        console.log('\x1b[31mInvalide Option. Please enter 1 or 2.\x1b[0m');
    }
};

// Afficher les informations et demander à l'utilisateur de faire un choix
displayInfo();
rl.question('\x1b[37mPlease choice : \x1b[0m', (answer) => {
    executeScript(answer.trim());
    rl.close();
});