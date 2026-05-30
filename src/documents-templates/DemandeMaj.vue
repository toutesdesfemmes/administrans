<script setup>
import useDocumentTemplate from '@/templates'

const p = defineProps({ data: { type: Object }, structure: { type: Array } })
const { renderValue, genderSwitch, renderWithGender } = useDocumentTemplate(p)
</script>

<template>
  <div class="grid--row">
    <div class="grid--column">
      <div class="adress--sender" v-if="renderValue('adresse')">
        {{ renderValue('prénom') }} {{ renderValue('nom') }}<br />{{ renderValue('adresse') }}
        <template v-if="data['téléphone']"
          ><br />Téléphone : {{ renderValue('téléphone') }}</template
        >
        <template v-if="data['email']"><br />Email : {{ renderValue('email') }}</template>
      </div>
    </div>
    <div class="grid--column date" v-if="data.villeDocument && data.dateDocument">
      {{ renderValue('villeDocument') }}, le
      {{ new Date(data.dateDocument).toLocaleDateString('fr-FR') }}
    </div>
  </div>
  <div class="adress--recipient">
    {{ renderValue('ligneDestinataire') }}
  </div>
  <p class="subject">
    Objet : Demande de changement
    <template v-if="data['changementDemandé'] === 'prénom'"> de prénom </template>
    <template v-if="data['changementDemandé'] === 'civilité'"> de civilité </template>
    <template v-if="data['changementDemandé'] === 'prénomEtCivilité'">
      de prénom et de civilité
    </template>
    d'une personne transgenre
  </p>
  <p>Madame, Monsieur,</p>
  <p>
    Je suis {{ renderValue('prénom') }} {{ renderValue('nom').toUpperCase() }} et je souhaite
    effectuer les démarches de changement

    <template v-if="data['changementDemandé'] === 'prénom'"> de prénom </template>
    <template v-if="data['changementDemandé'] === 'civilité'"> de civilité </template>
    <template v-if="data['changementDemandé'] === 'prénomEtCivilité'">
      de prénom et de civilité
    </template>
    dans vos registres.
    <template v-if="data.refOrganismeType && data.refOrganismeType != 'Aucune'">
      Mon {{ renderValue('refOrganismeType').toLowerCase() }} est le
      {{ renderValue('refOrganisme', `<${data.refOrganismeType}>`) }}.
    </template>
  </p>
  <p v-if="data['changementDemandé'] != 'civilité'">
    Je suis {{ renderWithGender('connu', 'civilité') }} de vos services sous le nom de
    {{ renderValue('deadname') }}
    {{ renderValue('nom').toUpperCase() }}.
  </p>
  <p v-if="data['changementDemandé'] != 'civilité'">
    Vous trouverez en pièce jointe la décision de changement de prénom délivrée par l'état civil.
  </p>
  <p v-if="data.ajouterCSEC && data['changementDemandé'] != 'prénom'">
    J'ai déjà obtenu un changement de mention de sexe à l'état-civil. Vous trouverez en pièce jointe
    une copie de la décision du tribunal.
  </p>
  <template v-if="data['changementDemandé'] != 'prénom'">
    <p>
      Je vous demande
      <template v-if="data['changementDemandé'] === 'prénomEtCivilité'">par ailleurs</template> de
      bien vouloir changer ma civilité de « {{ genderSwitch('Madame', 'Monsieur', 'civilité') }} » à
      « {{ genderSwitch('Monsieur', 'Madame', 'civilité') }} » dans vos registres, et ce
      préalablement à toute décision de changement de mention de sexe à l’État-Civil, puisque je
      suis une personne transgenre.
    </p>
    <p>
      En effet, comme l’a rappelé de nombreuses fois le Défenseur des Droits dans des rapports,
      synthèses, recommandations et décisions, la civilité est une affaire d’usage et n’est
      aucunement liée à la mention de sexe à l’État-Civil. Je vous engage à vous renseigner sur le
      site du Défenseur des Droits si le moindre doute persiste.
    </p>
    <p>
      De surcroit, il a noté qu’une persistance d’une civilité erronée, c’est-à-dire non conforme à
      l’identité de genre réelle d’une personne transgenre, relevait du harcèlement discriminatoire
      basé sur l’identité de genre.
    </p>
  </template>
  <p>
    Par conséquent, je vous demande de mettre à jour, dans les plus brefs délais,
    <template v-if="data['changementDemandé'] === 'prénom'"> mon prénom </template>
    <template v-if="data['changementDemandé'] === 'civilité'"> ma civilité </template>
    <template v-if="data['changementDemandé'] === 'prénomEtCivilité'">
      mon prénom et ma civilité
    </template>
    dans vos registres, et de me tenir {{ renderWithGender('informé', 'civilité') }}
    de la bonne prise en compte de ces informations.
  </p>
  <p v-if="data.mentionDDDEtCnil">
    Faute d’une rapide modification de ces informations et d’un prompt retour de votre part, je me
    verrais {{ renderWithGender('contraint', 'civilité') }} de saisir le Défenseur des Droits et la
    CNIL.
  </p>
  <p>
    Je vous remercie de l'aide que vous m'apporterez dans ma démarche et vous prie de bien vouloir
    croire, Madame, Monsieur, en l'assurance de ma considération,
  </p>
  <p class="signature">{{ renderValue('prénom') }} {{ renderValue('nom') }}</p>
  <hr class="hidden" />
  <hr class="hidden" />
  <hr class="hidden" />
  <hr class="hidden" />
  <hr class="hidden" />
  <p>Pièces jointes :</p>
  <ul class="attachments">
    <li>Copie de la pièce d'identité de {{ renderValue('prénom') }} {{ renderValue('nom') }}</li>
    <li v-if="data['changementDemandé'] != 'civilité'">
      Décision de changement de prénom de {{ renderValue('prénom') }} {{ renderValue('nom') }}
    </li>
    <li v-if="data.ajouterCSEC && data['changementDemandé'] != 'prénom'">
      Décision du tribunal du changement de sexe à l'état civil de {{ renderValue('prénom') }}
      {{ renderValue('nom') }}
    </li>
  </ul>
</template>
