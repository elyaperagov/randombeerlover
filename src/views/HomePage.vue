<template>
  <div class="wrapper">
    <Header />
    <main class="main">
      <Blank />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Blank from '@/components/home/Blank'

export default {
  name: 'HomePage',
  components: {
    Header,
    Blank,
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
