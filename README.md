# GROUPOMANIA #

Voici le MVP du projet 7, du parcours Développeur Web d'OCR.


### Prérequis ###

Au préalable, vous devrez avoir installé localement sur votre ordinateur :
- `Node`, 
- `npm`, 
- `nodemon`, 
- `wamp` ou `mamp` ou autre pour la base de données


### Installation des serveurs ###

1) Téléchargez le code source : dossier GROUPOMANIA, comportant les 3 dossiers backend, frontend et database.

2) Dans le dossier frontend, dans le terminal : 
- Exécutez `npm install`,
- Exécutez `npm run build`,
- Exécutez `npm start`

3) Dans le dossier backend, dans le terminal :  
- Exécutez `npm install`,
- Exécutez `npm start`


### Installation et connexion de la Base De Données MySQL ###

- Importez le fichier `database_groupomania` dans `wamp` ou `mamp` ou autre.
- Ou vous pouvez initialiser une nouvelle base de données, en décommentant `force:true` en ligne 14 du fichier `app.js` se trouvant dans le backend, puis sauvegardez. Ensuite recommentez et sauvegardez.


### Sécurisation des données ###

1) Créez un fichier `.env` dans le backend.

2) Notez les infos suivantes avec vos propres données dans les guillemets: 
- TOKEN=
- HOST_DEV=" "
- USER_DEV=" "
- PASSWORD_DEV=" " 
- DATABASE_DEV=" " 
- DIALECT_DEV="mysql"


### Fonctionnalités des serveurs ###

1) Dans le dossier backend, dans le terminal : 
- Exécutez `node server.js` ou `nodemon server.js` ou `npm start`
- Exécution de l’API backend sur le port `http://localhost:3000`

2) Dans le dossier frontend, dans le terminal : 
- Exécutez `ng serve` ou `npm start` pour avoir accès au serveur de développement.
- Exécution de l’API frontend sur le port `http://localhost:8080`

