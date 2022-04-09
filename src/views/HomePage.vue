<template>
  <div class="wrapper">
    <Header />
    <main class="main">
      <Info />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Info from '@/components/home/Info'

export default {
  name: 'HomePage',
  components: {
    Header,
    Info,
    Footer
  },
  props: {},
  data() {
    return {}
  },
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
