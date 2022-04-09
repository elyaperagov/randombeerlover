/* eslint-disable prettier-vue/prettier */
import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import router from '@/router'
import VueMeta from 'vue-meta'
import SlideUpDown from 'vue-slide-up-down'
import Bowser from 'bowser'
import loader from "vue-ui-preloader";
import VueLazyload from 'vue-lazyload'


import './assets/sass/app.scss'

import Helpers from './utils/helpers.js'

Vue.component('slide-up-down', SlideUpDown)
Vue.use(loader);
Vue.use(Helpers)
Vue.use(Notifications)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/img/user.png'),
  attempt: 1
})
Vue.config.productionTip = false

window.appVue = new Vue({
  data() {
    return {
      windowTop: 0,
      width: null,
      height: null,
      desctopMinBreakpoint: 1500,
      tabletBreakpoint: 1200,
      tabletSmallBreakpoint: 1024,
      mobileBreakpoint: 768,
      bowser: null,


    }
  },
  computed: {
    isDesctopMin() {
      return this.width <= this.desctopMinBreakpoint
    },
    isTablet() {
      return this.width <= this.tabletBreakpoint
    },
    isSmallTablet() {
      return this.width <= this.tabletSmallBreakpoint
    },
    isMobile() {
      return this.width <= this.mobileBreakpoint
    },
    headers() {
      return {
        headers: {
          Authorization: `Bearer ${this.authToken}`
        }
      }
    },

  },
  watch: {

  },
  async created() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.bowser = Bowser.parse(window.navigator.userAgent)




  },
  mounted() {
    this.addListeners()
  },
  methods: {


    addListeners() {
      window.addEventListener('scroll', this.onScroll)
      window.addEventListener('resize', this.onResize)

    },
    onScroll(e) {
      this.windowTop = window.pageYOffset
    },
    onResize(state) {
      this.width = window.innerWidth
      this.height = window.innerHeight
      document.body.classList.remove('scroll-off')
    },
    async goTo(link) {
      if (!this.$scrollTo(link)) {
        try {
          await this.$router.push({
            path: '/'
          })
        } catch (error) {}
        setTimeout(() => {
          this.$scrollTo(link)
        }, 500)
      }
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
