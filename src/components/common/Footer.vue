<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <router-link to="/" class="footer__logo">
          <svg width="50" height="50">
            <use xlink:href="#beer"></use>
          </svg>
        </router-link>
        <h1 class="footer__title" v-html="title"></h1>
      </div>
      <span class="footer__copyright" v-html="copyright"></span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {},
  props: {},
  data() {
    return {
      title: 'Random Beer Lover',
      copyright: 'All rights reserved'
    }
  },
  computed: {}
}
</script>
