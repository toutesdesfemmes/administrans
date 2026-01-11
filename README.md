# Administrans

Administrans est un outil gratuit conçu pour vous aider dans votre transition administrative.

Il est directement inspiré du projet Trans-CEC lancé par Maria Climent-Pommeret,
et des différentes versions qui ont ensuites été améliorées et maintenues par des volontaires.

Le projet n'est pas encore fini, mais vous pouvez commencer à regarder le résultat ici :
https://administrans.fr/

# Contribuer

Afin de travailler efficacement et dans un environnement qui nous convienne, nous travaillons en non-mixité choisie : 

1. Avec des personnes trans, effectuant ou cherchant à effectuer une transition administrative
2. Avec des personnes accompagnant leur(s) proche(s) trans dans leur transision administrative

Nous nous réservons le droit d'arrêter de travailler avec un contributeur si nous ne nous sentons pas à l'aise pour quelque raison que ce soit.

Avant de contribuer, nous vous invitons à lire notre [code de conduite](/CODE_OF_CONDUCT.md)

[Informations de contact pour contribuer](https://administrans.fr/#/a-propos#contact)

Nous attendons des contributeurs qu'ils prennent connaissance de la feuille de route ci-dessous avant de proposer des changements sur le projet.

## Feuille de route

Voici **ce que nous souhaitons faire** :

1. Faciliter la transition administrative des personnes trans en France
2. Lorsque c'est pertinent, référencer, intégrer des ressources, contenus et services tiers
3. Fournir un service léger, rapide, simple d'utilisation et accessibles à tous et toutes
4. Limiter au maximum les barrières à l'entrée pour de nouvelles personnes souhaitant contribuer

Voici **ce que nous ne voulons pas faire** :

1. Intégrer des fonctionnalités et contenus qui ne sont pas directement liés à la transistion administrative en France
2. Faire de la tech pour de la tech : les contributions doivent servir le projet et ses utilisateurs avant tout
3. Faire dépendre le fonctionnement d'Administrans de site, outils ou services tiers. Administrans doit pouvoir continuer de fonctionner sans interruption et en dépendant du moins de choses possibles

## Utiliser administrans et transmettre vos retours

À l'heure actuelle, l'action de contribution la plus utile est de simplement utiliser le service
pour vos démarches et faire remonter vos retours, positifs comme négatifs.

## Remonter des bugs et demandes de fonctionnalités

Si vous constatez des problèmes sur les contenus, des bugs ou des fonctionnalités manquantes, n'hésitez pas à prendre contact afin que nous puissions en tenir compte pour améliorer le service.

## Contribuer au code

Administrans est un projet écrit en Javascript, HTML et CSS, fonctionnant avec Vue 3 et Vite.

Vous pouvez lancer et modifier le projet localement.

Pour rajouter de nouveaux documents ou modifier les existants, les fichiers importants sont :

- `src/documents.js` qui contient la définition des différents documents et des champs de formulaires associés
- `src/documentsComponents.js` qui contient l'association entre un document et le template à utiliser pour le rendu
- `src/documents-templates/` qui contient tous les fichiers de rendu des documents

### Installation initiale

Il vous faudra NodeJS, et Yarn installé au préalable. Le projet utilisant yarn `v1` et node `v18`, il est possible d'utliser [Volta](https://volta.sh) pour ne pas avoir à rétrograder son installation locale de yarn et node. Si vous développez avec les dernières versions, en particulier de yarn, pensez à ne pas commit `yarn.lock`.

```sh
git clone git@github.com:toutesdesfemmes/administrans.git
cd administrans
yarn install
```

### Lancer le serveur de développement

```sh
yarn dev
```

Vous pouvez à ce stade accéder au service en visitant http://localhost:5173/.

### Compiler le site de production

```sh
yarn build
```

Le site final sera compilé dans le dossier `dist/` et peut-être déployé tel quel sur n'importe quel serveur web.
