<template lang="pug">
  div.fullscreen.bg-blue.text-white.text-center.q-pa-md.flex.flex-center
    div
      div(style="font-size: 30vh") 404
      div.text-h2(style="opacity:.4") Oops. Nothing here...
      q-btn.q-mt-xl(color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps)
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Error404'
});
</script>
