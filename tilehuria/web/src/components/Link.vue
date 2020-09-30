<template lang="pug">
  q-item(clickable :to="to")
    q-item-section(v-if="icon"
      avatar)
      q-icon(:name="icon")

    q-item-section
      q-item-label {{ title }}
      q-item-label(caption) {{ caption }}
</template>

<script>
export default {
  name: 'Link',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    to: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
