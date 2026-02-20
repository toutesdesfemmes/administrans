import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import CECView from './views/CECView.vue'
import MiseAJourView from './views/MiseAJourView.vue'
import DocumentListView from './views/DocumentListView.vue'
import DocumentView from './views/DocumentView.vue'

const routerConfig = {
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: function (to) {
    if (to.hash) {
      return { el: to.hash }
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/a-propos',
      name: 'about',
      component: AboutView
    },
    {
      path: '/cec',
      name: 'cec',
      component: CECView
    },
    {
      path: '/mise-a-jour',
      name: 'miseAJour',
      component: MiseAJourView
    },
    {
      path: '/documents',
      name: 'documentsList',
      component: DocumentListView
    },
    {
      path: '/documents/:id',
      name: 'documents',
      props: true,
      component: DocumentView
    }
  ]
}

export default routerConfig
