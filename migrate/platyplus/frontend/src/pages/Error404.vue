<template lang="pug">
div.fullscreen.bg-blue.text-white.text-center.q-pa-md.flex.flex-center
  div
    div(style="font-size: 30vh") 404
    div.text-h2(style="opacity: 0.4") Oops. Nothing here...
    q-btn.q-mt-xl(color="white"
      text-color="blue"
      unelevated
      to="/"
      label="Go Home"
      no-caps)
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>
