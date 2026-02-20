<script setup>
import useDocumentTemplate from '@/templates'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'

const p = defineProps({
  data: { type: Object, default: () => ({}) },
  structure: { type: Array, default: () => [] }
})
const { renderValue, genderSwitch, renderWithGender, renderDate } = useDocumentTemplate(p)
</script>

<template>
  <div class="requete">
    <p class="text--right">
      À Mesdames et Messieurs les Président et Juges
      <br />
      de la Chambre du Conseil du
      {{ renderValue('tribunal') }}
    </p>
    <p class="text--right">
      {{ renderValue('adresseTribunal') }}
    </p>
    <h1 v-if="data.typeChangement === 'genre'">
      Requête en changement de la mention du sexe à l'état civil
    </h1>
    <h1 v-else>Requête en changement de la mention du sexe et des prénoms à l'état civil</h1>
    <p>
      Devant la Chambre du Conseil <br />
      (article 1055-8 du Code de procédure civile)<br />
      (article 1055-7 CpC : « Le ministère d’avocat n’est pas obligatoire »)<br />
    </p>
    <hr />
    <p>
      <strong> À la demande de : </strong>
      <br />
      {{ genderSwitch('Madame', 'Monsieur', 'genre') }}
      {{ renderValue('nom').toUpperCase() }} {{ renderValue('prénomsActuels') }}
      {{ renderWithGender('dit') }}
      {{ genderSwitch('Monsieur', 'Madame', 'genre') }}
      {{ renderValue('nom').toUpperCase() }}
      {{ renderValue('nouveauxPrénoms', data.prénomsActuels) }}
      <br />
      {{ renderWithGender('Né') }} le {{ renderDate('dateNaissance') }} à
      {{ renderValue('lieuNaissance') }}, de nationalité {{ renderValue('nationalité') }}
      <br />
      {{ renderValue('situationProfessionnelle') }}
      <br />
      {{ renderValue('situationFamiliale') }}
      <br />
      Résidant au {{ renderValue('adresse') }}
      <br />
      {{ renderValue('téléphone') }}, {{ renderValue('email') }}
      <br />
      Sans avocat, présentant sa requête en personne.
    </p>
    <p>
      <strong> En présence de : </strong>
      <br />
      Madame la Procureure ou Monsieur le Procureur de la République Près le Tribunal Judiciaire de
      {{ renderValue('villeTribunal') }}.
    </p>
    <p>
      <strong>
        Moi même {{ genderSwitch('le requérant', 'la requérante') }}, a l'honneur d'exposer ce qui
        suit :
      </strong>
    </p>
    <h2>Les faits</h2>
    <MarkdownRenderer :source="renderValue('contexte')" />
    <h2>
      Discussion sur la demande de rectification de la mention de sexe
      <template v-if="data.typeChangement === 'prénomEtGenre'"> et de prénom(s) </template>
      à l'état civil
    </h2>
    <p>
      L’article 8 de la Convention Européenne des Droits de l’Homme reconnaît à la personne déclarée
      de sexe {{ genderSwitch('féminin', 'masculin') }} à l’officier d’état civil le droit de
      rectification de son état civil, dès lors que, après traitement hormonal et intervention
      chirurgicale, cette personne ne présente pas les caractéristiques de son sexe d’origine et a
      pris l’apparence physique qui la rapproche de l’autre sexe.
    </p>
    <p>
      La jurisprudence de principe de la Cour de Cassation admet également la recevabilité et le
      bien-fondé de cette action lorsqu’à la suite d’un traitement médico-chirurgical suivi dans un
      but thérapeutique, une personne présentant le syndrome du transsexualisme ne possède plus tous
      les caractères de son sexe d’origine et a pris l’apparence physique la rapprochant de l’autre
      sexe, auquel correspond son comportement social : Le principe du respect de la vie privé
      justifie alors que son état civil indique désormais le sexe dont elle a pris l’apparence.
    </p>
    <p>(Deux arrêts de principe rendus en assemblée plénière le 11 Décembre 1992)</p>
    <p>
      La Cour de Cassation a confirmé sa position le 18 octobre 1994 en précisant la référence au
      principe du respect dû à la vie privée posé, non seulement sur l’article 8 de la Convention
      Européenne des Droits de l’Homme, mais également par l’article 9 du Code Civil (Cass. 1ère
      civ., 18octobre 1994 : Defrénois 1995, p.721, obs Massip ; RTD civ 1995, obs. Hauser.)
    </p>
    <p>
      L’article 56 de la loi n° 2016-1547 du 18 novembre 2016 de modernisation de la Justice du
      XXIème siècle – validé par le Conseil Constitutionnel dans sa décision n° 2016-739 DC du 17
      novembre 2016 – vient introduire quatre nouveaux articles dans le Code Civil.
    </p>
    <p>L’article 61-5 du Code Civil pose le principe que :</p>
    <blockquote>
      <p>
        « Toute personne majeure ou mineur émancipée qui démontre par une réunion suffisante de
        faits que la mention relative à son sexe dans les actes de l’état civil ne correspondant pas
        à celui <strong>dans lequel elle se présente et dans lequel elle est connue</strong> peut en
        obtenir la modification.
      </p>
      <p>
        Les principaux de ces faits, dont la preuve peut être rapportée par tous moyens, peuvent
        être :
      </p>
      <ol>
        <li>
          Qu’elle se <strong>présente publiquement</strong> comme appartenant au sexe revendiqué ;
        </li>
        <li>
          Qu’elle est <strong>connue sous le sexe revendiqué</strong> de son entourage familial,
          amical ou professionnel ;
        </li>
        <li>
          Qu’elle a <strong>obtenu le changement de son prénom</strong> afin qu’il corresponde au
          sexe revendiqué ; »
        </li>
      </ol>
    </blockquote>
    <p>L’article 61-6 dudit code ajoute :</p>
    <blockquote>
      <p>« La demande est présentée devant <strong>le tribunal de grande instance</strong>.</p>
      <p>
        Le demandeur fait état de son consentement libre et éclairé à la modification de la mention
        relative à son sexe dans les actes de l'état civil et produit tous éléments de preuve au
        soutien de sa demande.
      </p>
      <p>
        <strong
          >Le fait de ne pas avoir subi des traitements médicaux, une opération chirurgicale ou une
          stérilisation ne peut motiver le refus de faire droit à la demande.</strong
        >
      </p>
      <p>
        Le tribunal constate que le demandeur satisfait aux conditions fixées à l'article 61-5 et
        ordonne la modification de la mention relative au sexe
        <strong>ainsi que, le cas échéant, des prénoms, dans les actes de l'état civil.</strong> »
      </p>
    </blockquote>
    <p>Une fois le changement d’état civil accordé, l’article 61-7 du code précité précise que :</p>
    <blockquote>
      <p>
        « Mention de la décision de modification du sexe et, le cas échéant, des prénoms est portée
        en marge de l'acte de naissance de l'intéressé,
        <strong
          >à la requête du procureur de la République, dans les quinze jours suivant la date à
          laquelle cette décision est passée en force de chose jugée.</strong
        >
      </p>
      <p>
        Par dérogation à l'article 61-4, les modifications de prénoms corrélatives à une décision de
        modification de sexe ne sont portées en marge des actes de l'état civil des conjoints et
        enfants qu'avec le consentement des intéressés ou de leurs représentants légaux.
      </p>
      <p>Les articles 100 et 101 sont applicables aux modifications de sexe. »</p>
    </blockquote>
    <p>Enfin, l’article 61-8 du Code civil dispose que :</p>
    <blockquote>
      <p>
        « La modification de la mention du sexe dans les actes de l'état civil est sans effet sur
        les obligations contractées à l'égard de tiers ni sur les filiations établies avant cette
        modification. »
      </p>
    </blockquote>

    <p>
      <strong
        >Ce faisant le changement de sexe à l’état civil est totalement démédicalisé et se fonde
        désormais uniquement sur la détermination sociale de son sexe par la personne et sa
        reconnaissance par son entourage.</strong
      >
    </p>
    <p>
      <strong
        >Le législateur a en outre pris la peine d’indiquer directement dans la loi que :</strong
      >
    </p>
    <blockquote>
      <p>
        <strong
          >« Le fait de ne pas avoir subi des traitements médicaux, une opération chirurgicale ou
          une stérilisation ne peut motiver le refus de faire droit à la demande. »</strong
        >
      </p>
    </blockquote>
    <p>
      Cela a été confirmé par
      <strong>la cour d’appel de Montpellier dans l’arrêt du 15 mars 2017 :</strong>
    </p>
    <blockquote>
      <p>
        « La personne <strong>ne</strong> doit <strong>plus établir</strong> […] la réalité du
        syndrome transsexuel […] ainsi que le caractère irréversible de la transformation de
        l’apparence.
      </p>
      <p>
        <strong>La reconnaissance sociale</strong>, posée par la loi nouvelle du 18 novembre 2016
        <strong>comme seule condition</strong> à la modification de la mention du sexe à l’état
        civil. »
      </p>
    </blockquote>
    <p>
      La France a aussi été condamnée par
      <strong>la cour européenne des droits de l’Homme le 6 avril 2017 :</strong>
    </p>
    <blockquote>
      <p>
        « Le rejet de la demande […] tendant à la modification de leur état civil au motif qu’ils
        n’avaient pas
        <strong>établi le caractère irréversible de la transformation de leur apparence</strong>,
        c'est-à-dire démontré avoir subi une opération stérilisante ou un traitement médical
        entraînant une très forte probabilité de stérilité,
        <strong
          >s’analyse en un manquement par l’Etat défendeur à son obligation positive de garantir le
          droit de ces derniers au respect de leur vie privée. Il y a donc, de ce chef, violation de
          l’article 8 de la Convention à leur égard.</strong
        >
        »
      </p>
    </blockquote>
    <p>
      De plus, il est inutile d’apporter des preuves pour tous les principaux faits mentionnés à
      l’article 61-5 du Code Civil comme le stipule l’arrêt de la cour d’appel de Montpellier du 15
      mars 2017 :
    </p>
    <blockquote>
      <p>
        « L’emploi, par le législateur, des termes « principaux de ces faits … peuvent être »,
        permet de considérer que l’énumération de ces faits et circonstances n’est
        <strong>ni exhaustives, ni cumulatives</strong>. »
      </p>
    </blockquote>
    <p>
      Cela était, d’ailleurs, la volonté du législateur. J.J. URVOAS, alors ministre de la justice,
      a clairement précisé lors de la séance plénière du jeudi 19 mai 2016 en première lecture à
      l’Assemblée Nationale consacré au projet de loi de modernisation de la justice du XXIème
      siècle que :
    </p>
    <blockquote>
      « La réunion d’<strong>une série de faits énumérés à titre indicatif</strong> permet selon la
      méthode du faisceau d’indices »
    </blockquote>
    <p>
      Lors de la commission des lois du mercredi 29 juin 2016 consacrée au même projet de loi,
      Pascale CROZON, alors députée, rappelle « par ailleurs que
      <strong>ces faits ne sont pas cumulatifs</strong> ». Enfin, lors de la 1ère séance plénière du
      12 juillet 2016 à l’Assemblée Nationale, le député Sergio CORONADO ajoute :
    </p>
    <blockquote>
      <p>
        « Les éléments de preuve pouvant être apportés par tous moyens par la personne, et énumérés
        dans le même article,
        <strong>ne peuvent être cumulatifs</strong> ».
      </p>
    </blockquote>

    <template v-if="data.typeChangement === 'prénomEtGenre'">
      <p>
        Le changement de prénom seul relève désormais de la seule compétence des officiers de l’état
        civil.
      </p>
      <p>Toutefois, l’article 61-6 alinéa 4 du Code civil prévoit que :</p>
      <blockquote>
        <p>
          « Le tribunal constate que le demandeur satisfait aux conditions fixées à l'article 61-5
          et ordonne la modification de la mention relative au sexe
          <strong>ainsi que, le cas échéant, des prénoms, dans les actes de l'état civil.</strong>
        </p>
      </blockquote>
      <p>
        Ainsi, le Tribunal Judiciaire est compétent pour ordonner un changement de prénom lorsqu’il
        est saisi d’une telle demande accompagnée d’une demande de modification de la mention
        relative au sexe.
      </p>
    </template>
    <h2>Ma requête</h2>
    <p>
      C'est dans ces conditions que je souhaite bénéficier de la loi du 18 novembre 2016 de
      modernisation de la Justice du XXIème siècle afin de faire modifier :
    </p>
    <ul>
      <li v-if="data.typeChangement === 'prénomEtGenre'">
        Mes prénoms : rectification des prénoms {{ renderValue('prénomsActuels') }} pour
        {{ renderValue('nouveauxPrénoms') }}
      </li>
      <li>
        La mention du sexe sur mon état civil : rectification de la mention
        {{ genderSwitch('féminin', 'masculin') }} pour
        {{ genderSwitch('masculin', 'féminin') }}
      </li>
    </ul>
    <p>
      Ce changement me permettra d'avoir une identité administrative conforme à mon identité de
      genre, ce qui protégera ma vie privée des actes de la vie courante qui nécessitent de prouver
      son identité, et m'évitera ainsi de continuer à subir de la discrimination.
    </p>
    <p>
      Afin d'étayer ma requête, je fournis des témoignages et preuves de mon identité au quotidien.
      Toutes ces pièces vont dans le sens de l'affirmation de mon identité
      {{ renderValue('genre') }}e et de ma volonté d'être {{ renderWithGender('connu') }} et
      {{ renderWithGender('reconnu') }} en tant {{ genderSwitch("qu'homme", 'que femme') }}
      <template v-if="data.typeChangement === 'prénomEtGenre'">
        et sous le(s) prénom(s) de {{ renderValue('nouveauxPrénoms') }}.
      </template>
    </p>
    <h2>Par ces motifs, plaise au tribunal :</h2>
    <p>Vu les articles 9, 60, 61-5 et suivants du Code Civil.</p>
    <p>
      Vu l’article 8 de la Convention Européenne de Sauvegarde des Droits de l’Homme et des Libertés
      Fondamentales.
    </p>
    <p>
      {{ genderSwitch('Madame', 'Monsieur', 'genre') }}
      {{ renderValue('nom').toUpperCase() }} {{ renderValue('prénomsActuels') }}
      {{ renderWithGender('dit') }}
      {{ genderSwitch('Monsieur', 'Madame', 'genre') }}
      {{ renderValue('nom').toUpperCase() }}
      {{ renderValue('nouveauxPrénoms', data.prénomsActuels) }} demande au Président du Tribunal
      Judiciaire de {{ renderValue('villeTribunal') }} d'appliquer les requêtes suivantes :
    </p>
    <ul>
      <li v-if="data.typeChangement === 'prénomEtGenre'">
        <strong>ORDONNER</strong>
        que l’acte de naissance<template v-if="(data['actesÀMettreÀJour'] || '').trim().length > 0">
          ,
          {{
            (data['actesÀMettreÀJour'] || '')
              .trim()
              .split('\n')
              .map((e) => e.trim())
              .filter((e) => e.length > 0)
              .join(', ')
          }}
        </template>

        de {{ renderValue('prénomsActuels') }} {{ renderValue('nom').toUpperCase() }} soient
        rectifié(s) en ce sens que la mention « {{ renderValue('prénomsActuels') }} » soit remplacée
        par la mention « {{ renderValue('nouveauxPrénoms') }} ».
      </li>
      <li>
        <strong>ORDONNER</strong>
        que l’acte de naissance<template v-if="(data['actesÀMettreÀJour'] || '').trim().length > 0">
          ,
          {{
            (data['actesÀMettreÀJour'] || '')
              .trim()
              .split('\n')
              .map((e) => e.trim())
              .filter((e) => e.length > 0)
              .join(', ')
          }}
        </template>

        de {{ renderValue('prénomsActuels') }} {{ renderValue('nom').toUpperCase() }} soient
        rectifié(s) en ce sens que la mention « sexe {{ genderSwitch('féminin', 'masculin ') }} »
        soit remplacée par la mention « sexe {{ genderSwitch('masculin', 'féminin') }} ». et que la
        mention « {{ genderSwitch('née', 'né') }} » soit remplacée par la mention «
        {{ genderSwitch('né', 'née') }} ».
      </li>
      <li>
        <strong>RAPPELER</strong>
        qu’en vertu de l’article 61-7 du Code Civil, la mention de la décision de modification du
        sexe est portée en marge de l’acte de naissance de l’{{ renderWithGender('intéressé') }}, à
        la requête du procureur de la République, dans les quinze jours suivant la date à laquelle
        cette décision est passée en force de chose jugée.
      </li>
      <li>
        <strong>ORDONNER</strong> qu’aucune expédition des actes d’État civil sans la mention
        desdites rectifications ne soit délivrée.
      </li>
    </ul>
    <p>Fait à {{ renderValue('villeDocument') }}, le {{ renderDate('dateDocument') }}</p>
    <p class="signature">
      Signature de
      {{ renderValue('nom').toUpperCase() }} {{ renderValue('prénomsActuels') }}
      {{ renderWithGender('dit') }}
      {{ renderValue('nom').toUpperCase() }}
      {{ renderValue('nouveauxPrénoms', data.prénomsActuels) }}
    </p>
    <hr class="hidden" />
    <hr class="hidden" />
    <hr class="hidden" />
    <hr class="hidden" />
    <hr class="hidden" />
    <hr class="hidden" />
    <hr class="hidden" />
    <hr class="hidden" />
    <h2>Bordereau de pièces</h2>
    <ol class="list--piece">
      <template v-for="e in (data['justificatifsRequête'] || '').split('\n')">
        <li v-if="e.trim().length > 0" :key="JSON.stringify(e, null, 2)">
          {{ e.trim() }}
        </li>
      </template>
    </ol>
  </div>
</template>
