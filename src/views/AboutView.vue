<script setup>
import { useGlobalStore } from '@/store'
import { useSeoMeta } from '@vueuse/head'

const title = `À Propos`
const description = `Toutes les informations à connaître à propos d'Administrans : histoire, utilisation, contacts…`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  
})

const plausibleEnabled = import.meta.env.VITE_PLAUSIBLE_URL
const store = useGlobalStore()

function deleteData() {
  if (confirm('Toutes les données stockées localement seront supprimées.')) {
    store.deleteData()
  }
}
</script>

<template>
  <section class="width--xnarrow my-2">
    <h1>À propos d'Administrans</h1>
    <p>
      Administrans est un outil gratuit conçu pour vous aider dans votre transition administrative
      en France.
    </p>
    <p>
      Il est directement inspiré du projet Trans-CEC lancé en 2019 par Maria Climent-Pommeret, et des
      <a href="https://github.com/entropyqueen/trans-cec#ont-contribu%C3%A9">
        contributions et améliorations apportées par des bénévoles.
      </a>
    </p>
    <p>
      L'Administrans que vous utilisez ici est une version différente, maintenue séparément par l'associations <a href="https://toutesdesfemmes.fr">Toutes des Femmes</a>.
      Initialement crées par Agate, Emy, et s'appuyant sur le travail des précédentes versions et également sur celui de nombreuses associations et personnes
      qui mettent à disposition des ressources sur la transition administrative.
    </p>
  </section>
  <section class="width--xnarrow my-2">
    <h2>Comment utiliser le service</h2>
    <p>
      Choisissez simplement le ou les demandes que vous souhaitez effectuer et remplissez les
      formulaires qui vous sont proposés.
    </p>
    <p>
      Une fois cette étape terminée, vous pouvez optionnellement éditer directement le document qui
      vous est proposé, puis l'enregistrer en format PDF.
    </p>
    <p>
      L'enregistrement en PDF se fait via la fonction impression de votre navigateur. Il est
      possible que cela ne fonctionne pas sur certains navigateurs mobile. Voici la liste des
      navigateurs testés avec lesquels Administrans fonctionne :
    </p>
    <ul>
      <li>Sur ordinateur : Firefox, Chrome, Chromium</li>
      <li>Sur smartphone : Chrome, Vivaldi</li>
    </ul>
  </section>
  <section class="width--xnarrow my-2">
    <h2>Concernant vos données</h2>
    <p>
      Les données que vous saisissez et les documents générés ne quittent jamais votre appareil.
      Aucune information personnelle n'est transmise à un tiers, ni même à l'hébergeur du site.
    </p>
    <p>
      Une copie de vos informations est conservée localement sur votre navigateur pour faciliter
      l'édition successive de plusieurs documents. Si vous souhaitez supprimer cette copie locale,
      cliquez simplement sur le bouton ci-dessous :
    </p>
    <button @click.prevent="deleteData">Supprimer mes données…</button>
  </section>
  <section class="width--xnarrow my-2" id="contact">
    <h2>Nous contacter / Contribuer à Administrans</h2>
    <p>
      Administrans est développé par l'associations <a href="https://toutesdesfemmes.fr">Toutes des Femmes</a>, toutes contribution y est la bienvenue.
      Nous faisons de notre mieux, mais il n'est pas impossible qu'il existe des bugs ou qu'il manque des fonctionnalités
      qui vous paraissent importantes.
    </p>
    <p>
      <strong>À l'heure actuelle, nous recherchons activement des retours d'utilisateur·ices du service, qu'ils soient positifs ou négatifs.</strong>
    </p>
    <p>
      Si vous souhaitez nous transmettre vos retours, poser une question, signaler une anomalie, suggérer une amélioration,
      participer ou suivre le développement, vous pouvez :
    </p>
    <ul>
      <li>Écrire un mail à <a href="mailto:contact@administrans.fr">contact@administrans.fr</a></li>
      <li>
        Consulter la <a href="https://github.com/toutesdesfemmes/administrans">page GitHub du projet</a>
      </li>
    </ul>
    <p>Merci beaucoup et prenez soin de vous &lt;3</p>
  </section>
  <section class="width--xnarrow my-2" v-if="plausibleEnabled">
    <h2>Analytique</h2>
    <p>
      Pour avoir une idée de l'utilisation du site et des aspects à améliorer ou retravailler, des
      données de visites et d'utilisation anonymes sont collectées.
    </p>
    <p>Ces données se limitent exclusivement à :</p>
    <ul>
      <li>Votre système d'exploitation</li>
      <li>Votre navigateur</li>
      <li>Les URLs visitées</li>
      <li>Les types de documents générés</li>
      <li>La durée d'utilisation du site</li>
    </ul>
    <p>
      Aucun cookie ni identifiant unique n'est déposé sur votre appareil, votre adresse IP et les
      données saisies dans les formulaires ne sont pas non plus collectées.
    </p>
  </section>
</template>
