<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <router-link to="/" class="header__logo">
          <svg width="50" height="50">
            <use xlink:href="#beer"></use>
          </svg>
        </router-link>
        <h1 class="header__title" v-html="title"></h1>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  props: {},
  data() {
    return {
      title: 'Random Beer Lover'
    }
  },
  computed: {},
  mounted() {},
  beforeDestroy() {},
  created() {},
  methods: {}
}
</script>
