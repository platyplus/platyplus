<template lang="pug">
q-page
  h5 Home page when not authenticated
  p Use this page to start from scratch and place your custom content.
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PublicHomePage',
  setup() {
    return {}
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
