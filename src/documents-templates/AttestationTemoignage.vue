<script setup>
import useDocumentTemplate from '@/templates'

const p = defineProps({
  data: { type: Object, default: () => ({}) },
  structure: { type: Array, default: () => [] }
})
const { renderValue, renderWithGender, renderDate, renderFullDescription } = useDocumentTemplate(p)
</script>

<template>
  <div class="grid--row">
    <div class="grid--column">
      <div v-if="renderValue('adresseTiers')" class="adress--sender">
        {{ renderValue('prénomTiers') }} {{ renderValue('nomTiers') }}<br />{{
          renderValue('adresseTiers')
        }}
        <template v-if="data['téléphoneTiers']">
          <br />Téléphone : {{ renderValue('téléphoneTiers') }}
        </template>
        <template v-if="data['emailTiers']">
          <br />Email : {{ renderValue('emailTiers') }}
        </template>
      </div>
    </div>
    <div v-if="data.villeDocument && data.dateDocument" class="grid--column date">
      {{ renderValue('villeDocument') }}, le
      {{ new Date(data.dateDocument).toLocaleDateString('fr-FR') }}
    </div>
  </div>
  <p v-if="data.typeAttestation === 'prénom'" class="subject">
    Objet : Attestation de changement de prénom pour une personne transgenre
  </p>
  <p v-else-if="data.typeAttestation === 'genre'" class="subject">
    Objet : Attestation de changement de mention de sexe pour une personne transgenre
  </p>
  <p v-else class="subject">
    Objet : Attestation de changement de prénom et de mention de sexe pour une personne transgenre
  </p>
  <p>Madame, Monsieur,</p>
  <p>
    Je sous-{{ renderWithGender('signé', 'genreTiers') }} {{ renderValue('prénomTiers') }}
    {{ renderValue('nomTiers') }}, {{ renderWithGender('né', 'genreTiers') }} le
    {{ renderDate('dateNaissanceTiers') }} à {{ renderValue('lieuNaissanceTiers') }}, demeurant au
    {{ renderValue('adresseTiers') }}
    déclare sur l'honneur
    <template v-if="data.typeAttestation === 'prénom'">
      <template v-if="data.deadname && data.deadname.trim()">
        n'appeler {{ renderFullDescription() }} que par son véritable prénom
        {{ renderValue('prénom') }} {{ renderValue('nom') }}.
      </template>
      <template v-else>
        ignorer le prénom d'état civil de {{ renderFullDescription() }} et ne l'appeler que
        {{ renderValue('prénom') }} {{ renderValue('nom') }}.
      </template>
    </template>
    <template v-else-if="data.typeAttestation === 'genre'">
      genrer {{ renderFullDescription() }} exclusivement au {{ renderValue('genre') }}.
    </template>
    <template v-else>
      genrer {{ renderFullDescription() }} exclusivement au {{ renderValue('genre') }}.
      <template v-if="data.deadname && data.deadname.trim()">
        Je ne l'appelle que par son véritable prénom {{ renderValue('prénom') }}
        {{ renderValue('nom') }}.
      </template>
      <template v-else>
        J'ignore son prénom d'état civil et ne l'appelle que {{ renderValue('prénom') }}
        {{ renderValue('nom') }}.
      </template>
    </template>
  </p>
  <p v-if="data.contenuAttestation && data.contenuAttestation.trim()">
    {{ data.contenuAttestation }}
  </p>
  <p>Fait pour faire valoir ce que de droit,</p>
  <p class="signature">{{ renderValue('prénomTiers') }} {{ renderValue('nomTiers') }}</p>
  <p>Pièces jointes :</p>
  <ul class="attachments">
    <li>
      Copie d'une pièce d'identité de {{ renderValue('prénomTiers') }} {{ renderValue('nomTiers') }}
    </li>
  </ul>
</template>
