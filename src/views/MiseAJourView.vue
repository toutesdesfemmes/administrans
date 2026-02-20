<script setup>
import StepItem from '@/components/StepItem.vue'
import { useSeoMeta } from '@vueuse/head'

useSeoMeta({
  title: `Mettre à jour votre civilité et vos prénoms`,
  description: `Un guide pas à pas, pour mettre à jour votre civilité et/ou vos prénoms auprès des différents organismes, entreprises et administrations`
})
const steps = [
  {
    id: 'impôts',
    label: 'Impôts',
    linkTo: { name: 'documents', params: { id: 'demande-maj' }, query: { organisme: 'impôts' } }
  },
  {
    id: 'cpam',
    label: 'CPAM',
    linkTo: { name: 'documents', params: { id: 'demande-maj' }, query: { organisme: 'cpam' } }
  },
  {
    id: 'poleEmploi',
    label: 'France Travail',
    linkTo: { name: 'documents', params: { id: 'demande-maj' }, query: { organisme: 'poleEmploi' } }
  },
  {
    id: 'enseignement',
    label: 'École / université',
    linkTo: {
      name: 'documents',
      params: { id: 'demande-maj' },
      query: { organisme: 'enseignement' }
    }
  },
  {
    id: 'banque',
    label: 'Banque',
    linkTo: { name: 'documents', params: { id: 'demande-maj' }, query: { organisme: 'autre' } }
  },
  {
    id: 'opérateurMobile',
    label: 'Opérateur mobile',
    linkTo: { name: 'documents', params: { id: 'demande-maj' }, query: { organisme: 'autre' } }
  },
  {
    id: 'fournisseurInternet',
    label: "Fournisseur d'accès à internet",
    linkTo: { name: 'documents', params: { id: 'demande-maj' }, query: { organisme: 'autre' } }
  },
  {
    id: 'fournisseurElectricité',
    label: "Fournisseur d'électricité",
    linkTo: { name: 'documents', params: { id: 'demande-maj' }, query: { organisme: 'autre' } }
  }
]
</script>

<template>
  <div class="grid--row">
    <div class="grid--column two-third">
      <section class="width--xnarrow my-2">
        <h1>
          Mettre à jour votre état civil auprès des différentes entreprises et administrations
        </h1>
        <p>Page encore en cours de construction.</p>
        <h2>Checklist</h2>
        <p>
          Nous vous proposons ci-dessous une liste des organismes que vous êtes susceptibles de
          vouloir contacter pour mettre à jour vos informations.
        </p>
        <p>
          Pour demander une mise à jour de vos prénoms, il vous faudra avoir effectué cette démarche
          à l'état civil au préalable et fournir le justificatif correspondant.
        </p>
        <p>
          Cependant, il est possible de demander une mise à jour de votre civilité sans avoir
          effecuté de changement de mention de sexe à l'état civil.
        </p>
      </section>
    </div>
    <div class="grid--column one-third">
      <aside id="checklist" class="position--sticky my-4">
        <h2>Checklist</h2>
        <StepItem v-for="step in steps" :key="step.id" :step-id="`maj${step.id}`" :link="false">
          <router-link :to="step.linkTo">
            {{ step.label }}
          </router-link>
        </StepItem>
      </aside>
    </div>
  </div>
</template>
