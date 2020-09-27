<template lang="pug">
q-card(style='width: 300px')
  validation-observer(v-slot='{ handleSubmit, reset }')
    form(
      @submit.prevent='handleSubmit(save)',
      @reset.prevent='reset(); resetForm()'
    )
      q-card-section
        .text-h6 New tile set
      q-card-section
        validation-provider(
          rules='required',
          name='tileProviderId',
          v-slot='{ errors, touched, invalid }'
        )
          q-select(
            v-model='tileProvider',
            option-label='name',
            :options='providers',
            label='Provider',
            :error='touched && invalid',
            :error-message='errors[0]'
          )
        validation-provider(
          rules='required',
          name='format',
          v-slot='{ errors, touched, invalid }'
        )
          q-select(
            v-model='format',
            :options='["png", "jpg"]',
            label='Format',
            :error='touched && invalid',
            :error-message='errors[0]'
          )
        q-field(label='Quality', stack-label)
          template(v-slot:control)
            q-slider(v-model='quality', label, :min='0', :max='100')
      q-card-actions(align='around')
        q-btn(type='submit') Add
        q-btn(type='reset') Reset
        q-btn(@click='$emit("done")') Cancel
</template>

<script lang="ts">
import {
  ListAllTileProvidersDocument,
  TileSet
} from '@platyplus/tilehuria-schema'
import { useQuery, useResult } from '@vue/apollo-composable'
import { defineComponent, ref } from '@vue/composition-api'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
extend('required', {
  ...required,
  message: '{_field_} is required'
})
// TODO validate format in list png or jpg
// TODO validate quality between 0 and 100
extend('url', {
  validate(value: string | null | undefined): boolean {
    if (value) {
      return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
        value
      )
    }
    return false
  },
  message: '{_field_} must be a valid URL'
})

export default defineComponent({
  name: 'NewTileSet',
  setup(_, ctx) {
    const tileProvider = ref<TileSet | null>(null)
    const quality = ref(100)
    const format = ref('png')

    const resetForm = () => {
      tileProvider.value = null
      quality.value = 100
      format.value = 'png'
    }

    const { result } = useQuery(ListAllTileProvidersDocument)
    const providers = useResult(result, [])

    const done = () => {
      ctx.emit('done')
    }
    const save = () => {
      ctx.emit('done', {
        tileProvider: tileProvider.value,
        tileProviderId: tileProvider.value?.id,
        quality: quality.value,
        format: format.value
      })
    }
    return { tileProvider, quality, format, providers, resetForm, save, done }
  }
})
</script>
