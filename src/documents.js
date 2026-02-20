export const fields = [
  {
    id: 'prénom',
    name: 'Prénom',
    type: 'text'
  },
  {
    id: 'nom',
    name: 'Nom',
    type: 'text'
  },
  {
    id: 'genre',
    name: 'Genre',
    type: 'select',
    default: () => {
      return null
    },
    choices: [
      { label: 'Masculin', value: 'masculin' },
      { label: 'Féminin', value: 'féminin' }
    ]
  },
  {
    id: 'civilité',
    name: 'Civilité',
    type: 'select',
    default: () => {
      return null
    },
    choices: [
      { label: 'Monsieur', value: 'masculin' },
      { label: 'Madame', value: 'féminin' }
    ]
  },
  {
    id: 'deadname',
    name: 'Deadname',
    type: 'text'
  },
  {
    id: 'dateNaissance',
    name: 'Date de naissance',
    type: 'date'
  },
  {
    id: 'lieuNaissance',
    name: 'Commune et département de naissance',
    type: 'text',
    placeholder: 'Marseille (13)'
  },
  {
    id: 'adresse',
    name: 'Adresse',
    type: 'textarea'
  },
  {
    id: 'téléphone',
    name: 'N° de téléphone',
    type: 'text'
  },
  {
    id: 'email',
    name: 'Adresse email',
    type: 'email'
  },
  // {
  //   id: 'adresseDestinataire',
  //   name: 'Adresse du destinataire',
  //   type: 'textarea',
  //   persist: false,
  // },

  {
    id: 'société',
    name: 'Nom de la société',
    type: 'text',
    persist: false
  },
  {
    id: 'villeDocument',
    name: 'Lieu de rédaction',
    type: 'text'
  },
  {
    id: 'dateDocument',
    name: 'Date de rédaction',
    type: 'date',
    default: () => {
      return new Date().toISOString().slice(0, 10)
    },
    persist: false
  },
  {
    id: 'listerPJ',
    name: 'Inclure la liste des pièces jointes',
    type: 'checkbox',
    default: () => {
      return true
    }
  }
]
export const fieldsById = {}

fields.forEach((f) => {
  fieldsById[f.id] = f
})

function category(name) {
  return {
    name,
    isCategory: true,
    showCondition: () => true
  }
}
function field(id, params = {}) {
  let config = { id }
  if (fieldsById[id]) {
    config = { ...fieldsById[id] }
  }
  return {
    showCondition: () => true,
    ...config,
    ...params,
    isInput: true
  }
}

export const templates = [
  {
    id: 'demande-maj',
    name: 'Demande de mise à jour de prénom et/ou civilité',
    template: `DemandeMaj`,
    description:
      'Pour demander à une entité, entreprise ou administration de mettre à jour vos informations.',
    help: `

<br>
Ce document est à envoyer pour demander la mise à jour de votre prénom et/ou civilité.

**Il n'est pas nécessaire d'avoir obtenu un changement de mention de sexe à l'état civil
au préalable pour que la demande de changement de civilité aboutisse.**
    `,
    structure: [
      category('Organisme contacté'),
      field('organisme', {
        name: `Organisme contacté`,
        type: 'select',
        class: 'field--fullwidth',
        default: () => {
          return null
        },
        choices: [
          { value: `cpam`, label: 'CPAM' },
          { value: `enseignement`, label: 'École ou université' },
          { value: `impôts`, label: 'Impôts' },
          { value: `poleEmploi`, label: 'France Travail' },
          {
            value: `autre`,
            label: 'Autre organisme : banque, EDF, Opérateur mobile ou internet, etc.'
          }
        ],
        action: (data) => {
          if (data.organisme === 'cpam') {
            data.refOrganismeType = 'Numéro de sécurité sociale'
            data.ligneDestinataire = `À l'attention de la CPAM du <Département>`
          } else if (data.organisme === 'enseignement') {
            data.refOrganismeType = 'Numéro étudiant'
            data.ligneDestinataire = `À l'attention du service scolarité de <École>`
          } else if (data.organisme === 'poleEmploi') {
            data.refOrganismeType = 'Numéro'
            data.ligneDestinataire = `À l'attention de France Travail (<Ville>)`
          } else if (data.organisme === 'impôts') {
            data.refOrganismeType = 'Numéro fiscal'
            data.ligneDestinataire = `À l'attention du Service des Impôts des Particuliers de <Ville>`
          } else {
            data.refOrganismeType = 'Numéro'
            data.ligneDestinataire = `À l'attention du service clients de <Entreprise>`
          }
        }
      }),
      field('ligneDestinataire', {
        name: `Service recevant la demande`,
        type: 'textarea',
        attributes: { rows: 3 },
        class: 'field--fullwidth',
        placeholder: `À l'attention de <service>`,
        default: () => {
          return null
        }
      }),
      field('refOrganismeType', {
        name: `Type de référence`,
        help: `Le type de référence permettant à l'organisme de vous retrouver plus facilement. 
        
Sélectionnez "Aucune" si vous n'êtes pas sûr·e ou ne disposez pas d'une telle référence.`,
        type: 'select',
        default: () => {
          return null
        },
        choices: [
          { label: `Aucune`, value: null },
          { label: `Identifiant client`, value: 'Identifiant client' },
          { label: `Numéro`, value: 'Numéro' },
          { label: `Numéro de compte`, value: 'Numéro de compte' },
          { label: `Numéro de contrat`, value: 'Numéro de contrat' },
          { label: `Numéro de sécurité sociale`, value: 'Numéro de sécurité sociale' },
          { label: `Numéro étudiant`, value: 'Numéro étudiant' },
          { label: `Numéro fiscal`, value: 'Numéro fiscal' }
        ]
      }),
      field('refOrganisme', {
        name: `Référence auprès de l'oganisme`,
        help: `Par exemple votre numéro de contrat, numéro de compte, identifiant client, numéro de sécurité sociale, etc.`,
        type: 'text',
        persist: false
      }),
      category('Votre demande'),
      field('changementDemandé', {
        name: `Type de demande`,
        type: 'select',
        class: 'field--fullwidth',
        default: () => {
          return 'prénomEtCivilité'
        },
        choices: [
          { label: `Mise à jour du prénom`, value: 'prénom' },
          { label: `Mise à jour de la civilité`, value: 'civilité' },
          { label: `Mise à jour du prénom et de la civilité`, value: 'prénomEtCivilité' }
        ]
      }),
      category('Vos informations'),
      field('prénom', { help: `Il s'agit de vos prénoms revendiqués, séparés par une virgule` }),
      field('nom'),
      field('civilité', {
        help: "Il s'agit de votre civilité revendiquée"
      }),
      field('deadname', {
        showCondition: (data) => {
          return data.changementDemandé != 'civilité'
        }
      }),
      field('adresse'),
      field('email'),
      field('téléphone'),
      category('Options du document'),
      field('ajouterCSEC', {
        type: 'checkbox',
        default: () => {
          return false
        },
        name: `Appuyer la demande de changement de civilité avec la décision de changement de sexe à l'état civil.`,
        showCondition: (data) => {
          return data.changementDemandé != 'prénom'
        }
      }),
      field('mentionDDDEtCnil', {
        type: 'checkbox',
        default: () => {
          return false
        },
        name: `Ajouter une mention sur la saisie potentielle du Défenseur des Droits et de la CNIL`
      }),
      field('villeDocument'),
      field('dateDocument')
    ]
  },
  {
    id: 'requete-changement-etat-civil-tribunal',
    name: 'Requête pour changement de prénom(s) et/ou de mention de sexe au tribunal',
    template: `RequeteCecTribunal`,
    description: `Modèle de requête simplifiée à soumettre au tribunal pour un changement d'état civil.`,
    help: `Basé sur les modèles suivants :

- [CEC Le guide complet](https://drive.google.com/drive/folders/1TZIb0BxKpiZVBxmDi_BZ0VLMVE4kUeqA)
- [Modèle référencé sur Wikitrans](https://wikitrans.co/2019/11/26/changement-de-sexe-a-letat-civil-tgi/)
    `,
    structure: [
      category('Tribunal et type de requête'),
      field('tribunal', {
        name: 'Nom du tribunal',
        placeholder: 'Tribunal Judiciaire de Toulouse'
      }),
      field('adresseTribunal', {
        name: 'Adresse du tribunal',
        type: 'textarea'
      }),
      field('villeTribunal', {
        name: 'Ville du tribunal',
        type: 'text',
        placeholder: 'Toulouse'
      }),
      field('typeChangement', {
        name: `Type de demande`,
        type: 'select',
        default: () => {
          return 'genre'
        },
        choices: [
          { label: `Changement mention de sexe`, value: 'genre' },
          { label: `Changement de prénom et de mention de sexe`, value: 'prénomEtGenre' }
        ]
      }),
      category('Vos informations'),

      field('genre', { help: `Il s'agit genre désiré/revendiqué` }),
      field('prénom', {
        id: 'nouveauxPrénoms',
        name: `Prénom(s) demandés`,
        help: `Il s'agit de vos nouveaux prénoms, séparés par une virgule`,
        showCondition: (data) => {
          return data.typeChangement === 'prénomEtGenre'
        }
      }),
      field('prénom', {
        id: 'prénomsActuels',
        name: `Prénom(s) actuels`,
        help: `Il s'agit de vos prénoms actuels à l'état civil, séparés par une virgule`
      }),
      field('nom'),
      field('dateNaissance'),
      field('lieuNaissance'),
      field('nationalité', { type: 'text', name: 'Nationalité', default: () => 'française' }),
      field('adresse'),
      field('email'),
      field('téléphone'),
      field('situationProfessionnelle', {
        name: 'Situation professionnelle',
        type: 'text',
        help: `Poste occupé, étudiant, en recherche d'emploi, etc.`
      }),
      field('situationFamiliale', {
        name: 'Situation familiale',
        type: 'text',
        help: 'Mariée, Pacsée, mère de deux enfants, célibataire, en concubinage, etc.'
      }),
      category('Informations de la requête'),
      field('contexte', {
        name: 'Contexte de la requête',
        type: 'textarea',
        attributes: { rows: 10 },
        help: `Utilisez cet endroit pour personnaliser le corps de la requête et justifier votre demande.
Il n'est pas nécessaire de donner des justifications d'ordre médical, psychiatrique,
chirurgicales sauf si vous le souhaitez.

Il est préférable d'éviter de rentrer trop dans l'intime pour éviter de normaliser cela auprès des 
personnes examinant les dossiers. Néanmoins, cela peut s'avérer nécessaire si le tribunal
auprès duquel vous déposez votre requête à tendance à demander ce genre de détails.`
      }),
      field('contexteExemple', {
        name: 'Insérer un exemple de contexte',
        persist: false,
        help: `Ces exemples peuvent vous aider à personnaliser votre requête. `,
        type: 'select',
        injectInto: 'contexte',
        default: () => {
          return ''
        },
        choices: [
          { label: '', value: '' },
          {
            label: 'Basique - changement de prénom déjà effectué',
            value: `
Je suis une personne transgenre, c'est-à-dire que mon genre de naissance n'est pas en adéquation avec mon genre réel.

Depuis de nombreuses années, je me présente et vis quotidiennement en tant que {{ sexe }}, tant dans mes relations familiales qu'amicales ou professionnelles.
Les personnes qui me cotoient au quotidien utilisent cette identité de genre et l'acceptent parfaitement.

Cette transition sociale s'accompagne également d'autres changements liés à mon apparence, notamment vestimentaires pour me rapprocher de mon genre réel.

Je suis satisfaite de ma transition et je me sens plus équilibrée et en accord avec moi-même depuis que j'ai entrepris ces changements.
            `
          }
        ]
      }),
      field('actesÀMettreÀJour', {
        name: 'Actes supplémentaires à mettre à jour',
        type: 'textarea',
        attributes: { rows: 10 },
        help: `
Le tribunal ordonnera la mise à jour de votre acte de naissance. Selon votre situation, listez ici les autres actes d'état civil pour lesquels le tribunal devra ordonner une mise à jour.
Un acte par ligne.
Ces documents doivent être joints à votre requête et listés dans le champ suivant.
`,
        default: () => `
<Selon votre situation> l'acte de mariage
<Selon votre situation> la convention de PACS
      `
      }),
      field('justificatifsRequête', {
        name: 'Justificatifs et documents joints',
        type: 'textarea',
        attributes: { rows: 10 },
        help: `
Listez ici les justificatifs et documents que vous joindrez à votre requête.
N'incluez aucun certificat médical. Un justificatif par ligne.
Enlevez ou éditez les mentions entre <>.
Inscrivez le numéro de pièce affiché dans la requête sur les documents joints.

**Le consentement libre et éclairé est un document manuscrit dans lequel vous exprimez votre consentement** libre et éclairé sur les tenants et aboutissants de votre demande, par exemple :

> Je soussigné Tylor RONAN, fais état de mon consentement libre et éclairé à la modification de la mention du sexe et de mes prénoms dans les
actes d'état civil, comme mon acte de naissance.
> 
> Pour faire valoir ce que de droit,
>
> Fait à Poitiers, le 08/10/2022
>
> Tylor RONAN
>
> Signature

**Ce document ne peut être généré ici, vous devrez le rédiger vous même manuscritement.** Afin de faciliter cette étape, nous vous proposons d'utiliser [ce template](/annexe_consentement_eclaire.pdf).

`,
        default: () => `<Obligatoire> Copie intégrale de mon acte de naissance
<Obligatoire> Photocopie de ma carte nationale d'identité
<Obligatoire> Justificatif de domicile
<Obligatoire> Consentement libre et éclairé concernant la modification de l'état civil
<Si changement prénom déjà effectué> Décision de la mairie de <Ville> de <Date>, sur base de la circulaire du 17/02/2017 pour les changements de prénoms
Témoignage et carte d'identité recto verso de <A>, <amie>
Témoignage et carte d'identité recto verso de <B>, <parent>
Témoignage et carte d'identité recto verso de <C>, <collègue>
Témoignage et carte d'identité recto verso de <D>, <conjoint·e>
Preuves de demande de changement auprès d'organismes tiers
Preuves de refus de changement de la part d'organismes tiers`
      }),
      category('Finalisation du document'),
      field('villeDocument'),
      field('dateDocument')
    ]
  },
  {
    id: 'changement-prenom-mairie',
    name: 'Cerfa pour changement de prénom(s) en mairie ou consulat',
    template: `RequetePrenomMairie`,
    description: 'Cerfa N° 16233*04 pour demande de changement de prénom.',
    help: `L'original peut-être téléchargé et rempli à la main sur [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/R63177)`,
    structure: [
      category('Vos informations'),
      field('nom'),
      field('nom', { id: 'nomUsage', name: `Nom d'usage ou nom d'époux/épouse` }),
      field('genre', {
        id: 'genreÉtatCivil',
        help: `Il s'agit de votre genre actuel à l'état civil`
      }),
      field('prénom', {
        id: 'prénoms',
        name: `Prénom(s), séparés par une virgule`,
        help: `Il s'agit de vos prénoms actuels à l'état civil, séparés par une virgule`
      }),
      field('dateNaissance'),
      field('lieuNaissance'),
      field('nationalités', {
        type: 'text',
        name: 'Nationalité(s)',
        help: 'Séparées par des virgules'
      }),
      field('adresseVoie', { type: 'text', name: 'Rue et numéro de rue' }),
      field('adresseComplément', { type: 'text', name: `Complément d'adresse` }),
      field('adresseCodePostal', { type: 'text', name: `Code postal` }),
      field('adresseCommune', { type: 'text', name: `Commune` }),
      field('adressePays', {
        type: 'text',
        name: `Pays`,
        default: () => {
          return 'France'
        }
      }),
      field('email'),
      field('téléphone'),
      category('Votre demande'),
      field('prénom', {
        id: 'nouveauxPrénoms',
        name: `Prénom(s), séparés par une virgule`,
        help: `Il s'agit des nouveaux prénoms que vous souhaitez, séparés par une virgule`
      }),
      field('motif', {
        type: 'textarea',
        name: `Motif`,
        default: () =>
          `Madame, monsieur, je vous demande aujourd'hui le changement de mes prénoms, car je suis une personne transgenre, et après de nombreuses années de réflexion j'ai entamé ma transition autant physiquement que socialement. Mes prénoms de naissance sont un obstacle dans mes démarches administratives, mais aussi pour l'accès à l'emploi ainsi que pour récupérer du courrier. D'avance merci.`
      }),
      field('typeDemande', {
        name: `Type de demande`,
        type: 'select',
        default: () => {
          return 'première'
        },
        choices: [
          { label: `C'est votre première demande`, value: 'première' },
          { label: `Vous avez déjà demandé un changement de prénom(s)`, value: 'plusieurs' }
        ]
      }),
      field('demandes', {
        name: `Demandes précédentes`,
        showCondition: (data) => {
          return data.typeDemande === 'plusieurs'
        },
        type: 'textarea',
        placeholder: '05/09/2021 à Lille, Mairie, 12/11/2021',
        help: `Une demande par ligne, séparer la date et lieu, l'autorité saisie et la date de décision par une virgule.`
      }),
      category('Mise à jour de vos documents et ceux de votre famille'),
      field('majActeNaissance', {
        type: 'checkbox',
        default: () => {
          return true
        },
        name: `Demander une mise à jour de votre acte de naissance`
      }),
      field('majActeMariage', {
        type: 'checkbox',
        name: `Demander une mise à jour de votre acte de mariage`
      }),
      field('dateMariage', {
        type: 'date',
        showCondition: (data) => {
          return data.majActeMariage
        },
        name: `Date de votre mariage`
      }),
      field('lieuMariage', {
        type: 'text',
        showCondition: (data) => {
          return data.majActeMariage
        },
        name: `Lieu de votre mariage`
      }),
      field('majActeNaissanceConjoint', {
        type: 'checkbox',
        name: `Demander une mise à jour de l'acte de naissance de votre conjoint ou partenaire de PACS`
      }),
      field('nom', {
        id: 'nomConjoint'
      }),
      field('prénom', {
        id: 'prénomsConjoint',
        name: `Prénom(s), séparés par une virgule`
      }),
      field('dateNaissance', {
        id: 'dateNaissanceConjoint'
      }),
      field('lieuNaissance', {
        id: 'lieuNaissanceConjoint'
      }),
      field('majActeNaissanceEnfants', {
        type: 'checkbox',
        name: `Demander une mise à jour de l'acte de naissance de vos enfants`
      }),
      field('enfants', {
        name: `Informations sur vos enfants`,
        showCondition: (data) => {
          return !!data.majActeNaissanceEnfants
        },
        type: 'textarea',
        placeholder: 'Lund, Élise, 05/09/2021, Marseille (13)',
        help: `Un·e enfant par ligne, séparer le nom, prénom, date de naissance et lieu de naissance par une virgule`
      }),
      category('Finalisation du document'),
      field('villeDocument'),
      field('dateDocument')
    ]
  },
  {
    id: 'attestation-temoignage',
    name: "Attestation pour témoigner de l'utilisation d'un prénom et/ou genre en vue d'une demande de modification d'état civil",
    template: `AttestationTemoignage`,
    description: `
Cette attestation est destinée à être remplie et signée par vos proches
et incluse dans votre demande de changements de prénom/mention de sexe.
    `,
    help: `
L'attestation doit être renseignée par une personne vous connaissant et atteste
que vous utilisez le genre et/ou le prénom revendiqué dans votre demande de changement
d'état civil.

Il est impératif de joindre à chaque attestation un justificatif d'identité
de la personne qui l'a signée, par exemple une copie recto-verso de la carte d'identité.

**Pour simplifier la démarche avec des personnes à distance, vous pouvez préremplir l'attestation d'un tiers
et utiliser la fonction « Partager le document »**. Cela lui permettra de l'imprimer directement.
    `,
    structure: [
      category(`Information de la personne concernée par l'attestation`),
      field('prénom'),
      field('nom'),
      field('genre', { help: `Il s'agit genre désiré/revendiqué` }),
      field('deadname', { name: 'Deadname (facultatif)' }),
      field('dateNaissance'),
      field('lieuNaissance'),

      category("Information de la personne réalisant l'attestation"),
      field('prénom', { id: 'prénomTiers' }),
      field('nom', {
        id: 'nomTiers'
      }),
      field('genre', {
        id: 'genreTiers'
      }),
      field('dateNaissance', {
        id: 'dateNaissanceTiers'
      }),
      field('lieuNaissance', {
        id: 'lieuNaissanceTiers'
      }),
      field('adresse', { id: 'adresseTiers' }),
      field('email', { id: 'emailTiers' }),
      field('téléphone', { id: 'téléphoneTiers' }),

      category(`Contenu de l'attestation`),
      field('typeAttestation', {
        name: `Objet`,
        type: 'select',
        default: () => {
          return 'prénom'
        },
        choices: [
          { label: 'Changement de prénom', value: 'prénom' },
          { label: 'Changement de mention de sexe', value: 'genre' },
          { label: 'Changement de prénom et de mention de sexe', value: 'prénomEtGenre' }
        ]
      }),
      field('contenuExample', {
        name: 'Insérer un exemple',
        persist: false,
        help: `Ces exemples peuvent vous aider à personnaliser l'attestation.`,
        type: 'select',
        injectInto: 'contenuAttestation',
        default: () => {
          return ''
        },
        choices: [
          { label: '', value: '' },
          {
            label: 'Ami·e',
            value: `
              Je connais {{ prénom }} depuis <Année> et j'utilise son prénom et genre {{ genre }} quotidiennement dans le cadre de notre relation amicale. Je constate que ses proches font de même.
            `
          },
          {
            label: 'Famille',
            value: `
              Je suis <Mère/Père/Oncle…> de {{ prénom }} et j'utilise son prénom et genre {{ genre }}. Je constate que ses amis et sa famille font de même.
            `
          },
          {
            label: 'Collègue / Responsable hiérarchique',
            value: `
              Je travaille avec {{ prénom }} depuis <Année> et j'utilise son prénom et genre {{ genre }} quotidiennement dans nos échanges professionnels. Je constate que mes collègues font de même.
            `
          }
        ]
      }),
      field('contenuAttestation', {
        name: 'Contenu personnalisé (facultatif)',
        type: 'textarea'
      }),

      field('villeDocument'),
      field('dateDocument')
    ]
  }
]
export default templates
