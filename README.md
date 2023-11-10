# Débuggez et testez un SaaS RH
<center>

# Billed

</center>

# Introduction
Mission fiabiliser et améliorer et ajouter  des test pour résoudre des bugs.
# Sommaire
1. [back-end](#back-end)
2. [Front-end](#front-end)
4. [Utilisation](#utilisation)
5. [Rapport](#Rapport)

<center>

## back-end

</center>

## back-end
 suivre les etape d'installation [back-end](Billed-back/README.md)
### Acceder au repertoire du projet :
```
cd Billed-app-FR-Back
```

### Installer les dépendances du projet :

```
npm install
```

### Lancer l'API :

```
npm run run:dev
```
### Accéder à l'API :

L'api est accessible sur le port `5678` en local, c'est à dire `http://localhost:5678`


<center>

## Front-end

</center>



## L'architecture du projet :
Ce projet, dit frontend, est connecté à un service API backend que vous devez aussi lancer en local.

Le projet backend se trouve ici: https://github.com/Noel974/Billed-saas/tree/main/Billed-back

## Organiser son espace de travail :
Pour une bonne organization, vous pouvez créer un dossier exemple:billed dans lequel vous allez cloner le projet backend et par la suite, le projet frontend:

Clonez le projet backend dans le dossier billed :
```
$ git clone https://github.com/Noel974/Billed-saas/tree/main/Billed-back
```

```
billed/
   - Billed-back
```

Clonez le projet frontend dans le dossier bill-app :
```
$ git clone https://github.com/Noel974/Billed-saas/tree/main/Billed-front
```

```
bill-app/
   - Billed-back
   - Billed-front
```

En suivre les etape d'installation [front-end](Billed-front/README.md).

<center>

## Utilisation

</center>


pour faire les test unitaire 
 ```
npx jest src/__tests__/fichier.js

```

## Comptes et utilisateurs :

Vous pouvez vous connecter en utilisant les comptes:

### administrateur : 
```
utilisateur : admin@test.tld 
mot de passe : admin
```
### employé :
```
utilisateur : employee@test.tld
mot de passe : employee
```

<center>

## Rapport

</center>

### Rapport de tests Jest :
Jest est un framework de test populaire pour les applications JavaScript. Un rapport de tests Jest fournit des informations détaillées sur l'exécution des tests unitaires dans votre application. Voici quelques éléments clés que vous pourriez trouver dans un rapport de tests Jest :

* Nombre de tests réussis et échoués : Il vous donne une vue d'ensemble du nombre total de tests exécutés et de leur succès ou échec.

* Détails sur les échecs : En cas d'échec de tests, Jest fournit des détails spécifiques sur les erreurs rencontrées, facilitant ainsi le processus de débogage.

* Couverture de code : Jest génère également un rapport sur la couverture de code, indiquant quel pourcentage du code source a été couvert par les tests. Cela aide à identifier les parties du code qui ne sont pas suffisamment testées.

* Durée d'exécution : Le rapport peut inclure des informations sur le temps nécessaire à l'exécution de l'ensemble des tests, ce qui peut être utile pour évaluer les performances.

### Plan de tests End-to-End (E2E) :
Un plan de tests End-to-End est une documentation décrivant les scénarios de test, les fonctionnalités à tester, les étapes à suivre et les résultats attendus pour les tests End-to-End. Voici ce que vous pourriez inclure dans un plan de tests E2E :

* Scénarios de test : Une liste des cas d'utilisation ou des fonctionnalités à tester. Par exemple, pour une application Web, cela pourrait inclure des actions telles que la connexion, la navigation entre les pages, la saisie de données dans les formulaires, etc.

* Étapes de test : Des instructions détaillées sur les étapes spécifiques à suivre pour exécuter chaque scénario de test. Cela peut inclure des informations sur la configuration préalable, les actions de l'utilisateur et les vérifications à effectuer.

* Résultats attendus : Les résultats attendus après l'exécution de chaque scénario de test. Cela peut inclure des captures d'écran, des valeurs attendues dans l'interface utilisateur, ou d'autres critères de validation.

* Données de test : Les données spécifiques nécessaires à l'exécution des tests. Cela peut inclure des identifiants de connexion, des valeurs de formulaire, etc.