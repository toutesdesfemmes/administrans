<script setup>
import useDocumentTemplate from '@/templates'
import { textToArrays } from '@/utils'

const p = defineProps({
  data: { type: Object, default: () => ({}) },
  structure: { type: Array, default: () => [] }
})
const { renderValue, renderDate } = useDocumentTemplate(p)
</script>

<template>
  <div class="cerfa">
    <div class="text--center">
      <h1>Demande de changement de prénom</h1>
      <p>
        Cerfa N° 16233*04 <br />
        (Article 60 du code civil)
      </p>
    </div>
    <div>
      <p>
        Vous souhaitez changer votre ou vos prénom(s), ajouter, supprimer et/ou modifier leur ordre.
      </p>
      <p>
        Vous voudrez bien cocher les cases correspondantes à votre situation, reseigner les
        rubriques qui s'y rapportent, joindre les pièces justificatives nécessaires, puis dater et
        signer ce formulaire.
      </p>
      <p>
        Votre demande doit être remise soit à la maire de votre lieu de résidence, soit à celle de
        votre lieu de naissance.
      </p>
    </div>
    <div>
      <h2>Votre identité</h2>
      <div class="fieldset">
        <div class="checkbox">
          <input id="genre-f" type="checkbox" :checked="data['genreÉtatCivil'] === 'féminin'" />
          <label for="genre-m">Madame</label>
        </div>
        <div class="checkbox">
          <input id="genre-m" type="checkbox" :checked="data['genreÉtatCivil'] === 'masculin'" />
          <label for="genre-m">Monsieur</label>
        </div>
        <p class="field">
          Votre nom de famille (nom de naissance) :
          <span class="value">{{ renderValue('nom').toUpperCase() }}</span>
        </p>
        <p class="field">
          Votre nom d'usage (exemple: nom d'époux / d'épouse) :
          <span class="value">{{ renderValue('nomUsage', false).toUpperCase() }}</span>
        </p>
        <p class="field">
          Votre (ou vos) prénoms : <span class="value">{{ renderValue('prénoms') }}</span>
        </p>
        <p class="field">
          Votre date et lieu de naissance :
          <span class="value">{{ renderDate('dateNaissance') }}</span>
        </p>
        <p class="field">
          à : <span class="value">{{ renderValue('lieuNaissance') }}</span>
        </p>
        <p class="field">
          Votre (ou vos) nationalités : <span class="value">{{ renderValue('nationalités') }}</span>
        </p>
        <p class="field">
          Votre adresse : <span class="value">{{ renderValue('adresseVoie') }}</span>
        </p>
        <p class="field">
          Complément d'adresse :
          <span class="value">{{ renderValue('adresseComplément', false) }}</span>
        </p>
        <p class="field">
          Code postal :
          <span class="value"
            >{{ renderValue('adresseCodePostal') }} Commune:
            {{ renderValue('adresseCommune') }}</span
          >
        </p>
        <p class="field">
          Pays : <span class="value">{{ renderValue('adressePays') }}</span>
        </p>
        <p class="field">
          Adresse électronique : <span class="value">{{ renderValue('email') }}</span>
        </p>
        <p class="field">
          Numéro de téléphone : <span class="value">{{ renderValue('téléphone') }}</span>
        </p>
      </div>
    </div>
    <div>
      <h2>Votre demande</h2>
      <div class="fieldset">
        <div class="checkbox">
          <input id="prénoms" type="checkbox" :checked="true" />
          <label for="prénoms"
            >Je demande à ce que désormais, les prénoms apparaissent dans l'ordre déterminé
            ci-dessous</label
          >
        </div>
        <p
          v-for="(prenom, idx) in renderValue('nouveauxPrénoms', '<Nouveaux prénoms>').split(',')"
          :key="prenom"
          class="field"
        >
          {{ idx + 1 }}<template v-if="idx === 0"> er </template
          ><template v-else> ème </template> Prénom : <span class="value">{{ prenom.trim() }}</span>
        </p>
        <p>
          Pour les motifs suivants : (joignez tous les documents utiles à la présente demande afin
          d'attester de l'intérêt légitime)
        </p>
        <p class="value">
          {{ renderValue('motif') }}
        </p>
        <p>
          J'atteste sur l'honneur qu'aucune procédure de changement de prénom(s) n'est actuellement
          en cours devant les juridictions fraçaises, ni qu'aucune demande de changement de
          prénom(s) n'est actuellement examinée devant un autre officier de l'état civil.
        </p>
        <p>Par ailleurs :</p>
        <div class="checkbox">
          <input id="premièreDemande" type="checkbox" :checked="data.typeDemande === 'première'" />
          <label for="premièreDemande"
            >Aucune demande de changement de prénom(s) n’a été formulée à ce jour.</label
          >
        </div>
        <div class="checkbox">
          <input
            id="plusieursDemandes"
            type="checkbox"
            :checked="data.typeDemande === 'plusieurs'"
          />
          <label for="plusieursDemandes"
            >La ou les demande changement de prénoms mentionnées ci-dessous ont déjà été formulées
            :</label
          >
        </div>
        <table class="my-2">
          <thead>
            <tr>
              <th>Date et lieu de la demande</th>
              <th>Autorité saisie</th>
              <th>Décision</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in textToArrays(data.demandes, ',', 3)" :key="idx">
              <td>{{ row[0] }}</td>
              <td>{{ row[1] }}</td>
              <td>{{ row[2] }}</td>
            </tr>
          </tbody>
        </table>
        <p>
          Je demande également la mise à jour des actes de l'état civil listés ci-dessous, dès lors
          que le changement de prénom(s) aura une incidence sur ces actes :
        </p>
        <p class="field">
          <strong>Acte de naissance :</strong>
          <span v-if="data.majActeNaissance" class="value">
            {{ renderDate('dateNaissance') }} à {{ renderValue('lieuNaissance') }}
          </span>
          <span v-else class="value" />
        </p>
        <p class="field">
          <strong>Acte de mariage (le cas échéant) :</strong>
          <span v-if="data.majActeMariage" class="value">
            {{ renderDate('dateMariage') }} à {{ renderValue('lieuMariage') }}
          </span>
          <span v-else class="value" />
        </p>
        <p>
          <strong>Acte de naissance du conjoint ou partenaire de PACS (le cas échéant) :</strong>
        </p>
        <p class="field">
          Nom du conjoint/partenaire :
          <span v-if="data.majActeNaissanceConjoint" class="value">
            {{ renderValue('nomConjoint') }}
          </span>
          <span v-else class="value" />
        </p>
        <p class="field">
          Prénom(s) :
          <span v-if="data.majActeNaissanceConjoint" class="value">
            {{ renderValue('prénomsConjoint') }}
          </span>
          <span v-else class="value" />
        </p>
        <p class="field">
          Date et lieu de naissance :
          <span v-if="data.majActeNaissanceConjoint" class="value">
            {{ renderDate('dateNaissanceConjoint') }} à {{ renderValue('lieuNaissanceConjoint') }}
          </span>
          <span v-else class="value" />
        </p>
        <p>
          <strong>Acte de naissance du/des enfant(s) (le cas échéant)</strong>
        </p>
        <template v-for="(row, idx) in textToArrays(data.enfants, ',', 3)" :key="idx">
          <p class="field">
            Nom du {{ idx + 1 }}<template v-if="idx === 0"> er </template
            ><template v-else> ème </template> enfant :
            <span v-if="row.length > 0 && data.majActeNaissanceEnfants" class="value">
              {{ row[0] }}
            </span>
            <span v-else class="value" />
          </p>
          <p class="field">
            Prénom(s) :
            <span v-if="row.length > 0 && data.majActeNaissanceEnfants" class="value">
              {{ row[1] }}
            </span>
            <span v-else class="value" />
          </p>
          <p class="field">
            Date et lieu de naissance :
            <span v-if="row.length > 0 && data.majActeNaissanceEnfants" class="value">
              {{ row[2] }} à {{ row[3] }}
            </span>
            <span v-else class="value" />
          </p>
          <hr class="hidden" />
        </template>
      </div>
    </div>
    <h2>Attestation sur l'honneur</h2>
    <p>
      Je soussigné(e)<span class="value"
        >{{ renderValue('prénoms') }}
        <span class="text--uppercase">{{ renderValue('nom') }}</span>
      </span>
      (prénom(s), nom(s)) certifie sur l'honneur que les renseignements portés sur ce formulaire
      sont exacts.
    </p>
    <p>
      Fait à<span class="value">{{ renderValue('villeDocument') }}</span
      >, le<span class="value">{{ renderDate('dateDocument') }}</span>
    </p>
    <p style="margin-bottom: 100px">
      <strong>Signature :</strong>
    </p>
    <p class="footer">
      La loi n°78-17 du 6 janvier 1978 relative aux fichiers nominatifs garantit un droit d'accès et
      de rectification des données après des organismes destinataires de ce formulaire
    </p>
    <div>
      <h3>Conséquences sur vos titres d’identité (carte nationale d’identité, passeport...)</h3>
      <p>
        Le changement de prénom vous interdit d’utiliser les titres d’identité qui vous ont été
        délivrés avant votre changement de prénom dans la mesure où ceux-ci ne correspondent plus à
        votre état civil. Ces titres seront invalidés à l'expiration d'un délai de trois mois à
        compter de l'actualisation de votre acte de naissance. Cela signifie qu’en cas de contrôle,
        ils apparaitront comme non valides et leur présentation ne permettra pas de justifier de
        votre identité.
      </p>
      <p>
        À la réception de la notification de votre changement de prénom, vous devez attendre que la
        mise à jour des actes de l’état civil concernés par votre changement de prénom a été
        effectuée. Lorsque cette mise à jour aura été effectuée, vous devrez vous rapprocher de la
        mairie de votre choix pour déposer une demande de renouvellement de votre carte nationale
        d’identité et/ou de votre passeport, même si leur durée de validité n’est pas expirée, en
        justifiant notamment de l’acte de naissance modifié.
      </p>
      <p>
        Ce renouvellement est gratuit sous réserve de produire la carte nationale d’identité et/ou
        le passeport dont vous demandez le renouvellement.
      </p>
      <p>
        Après le renouvellement de votre carte d’identité et/ou de votre passeport, vous devrez
        également renouveler votre permis de conduire ainsi que votre carte vitale.
      </p>
      <p>
        L’usage d’un titre d’identité qui ne correspond pas à votre état civil est passible des
        sanctions prévues à l’article 441-2 du code pénal.
      </p>
    </div>
  </div>
</template>
