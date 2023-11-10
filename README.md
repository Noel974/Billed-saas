# Débuggez et testez un SaaS RH
<center>

# Billed

</center>

# Introduction
Mission fiabiliser et améliorer et ajouter  des test pour résoudre des bugs.
# Sommaire
1. [back-end](#back-end)
2. [Front-end](#front-end)
3. [Outils](#outils)
4. [Utilisation](#utilisation)

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

## Outils

Jest pour tester et debuger le front

## Utilisation

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