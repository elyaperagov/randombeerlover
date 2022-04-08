<template>
  <div id="__app">
    <sprite />
    <notifications group="app-notifications" />
    <router-view />
  </div>
</template>

<script>
import Sprite from '@/components/common/Sprite'

export default {
  name: 'App',
  components: {
    Sprite
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
