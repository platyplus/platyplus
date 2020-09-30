<template lang="pug">
q-card(style='width: 300px')
  validation-observer(v-slot='{ handleSubmit, reset }')
    form(
      @submit.prevent='handleSubmit(save)',
      @reset.prevent='reset(); resetForm()'
    )
      q-card-section
        .text-h6 New tile provider
      q-card-section
        validation-provider(
          rules='required|min:4',
          name='name',
          v-slot='{ errors, touched, invalid }'
        )
          q-input(
            v-model='values.name',
            label='Name',
            autofocus,
            :error='touched && invalid',
            :error-message='errors[0]'
          )
        validation-provider(
          rules='required|min:3',
          name='slug',
          v-slot='{ errors, touched, invalid }'
        )
          q-input(
            v-model='values.slug',
            label='Slug',
            :error='touched && invalid',
            :error-message='errors[0]'
          )
        validation-provider(
          rules='required',
          name='source',
          v-slot='{ errors, touched, invalid }'
        )
          q-input(
            v-model='values.url',
            label='Url',
            :error='touched && invalid',
            :error-message='errors[0]'
          )
        .text-negative(v-if='error') {{ error }}

      q-card-actions(align='around')
        q-btn(type='submit') Create
        q-btn(type='reset') Reset
        q-btn(@click='$emit("done")') Cancel
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useSingleItem } from 'src/composables'
import { GRAPHQL_CONFIG } from 'src/config'
import { extend } from 'vee-validate'
import { min, required } from 'vee-validate/dist/rules'
extend('min', {
  ...min,
  message: '{_field_} must have at least {length} characters'
})
extend('required', {
  ...required,
  message: '{_field_} is required'
})
extend('url', {
  validate(value: string | null | undefined): boolean {
    if (value) {
      // TODO test "tile provider" urls
      return true
      // return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
      //   value
      // )
    }
    return false
  },
  message: '{_field_} must be a valid URL'
})

export default defineComponent({
  name: 'NewProvider',
  setup(_, ctx) {
    const { values, save, reset: resetForm, onSaved, onError } = useSingleItem(
      GRAPHQL_CONFIG.tile_provider
    )

    const error = ref('')

    onSaved((res) => {
      if (res?.data?.insertTileProvider?.id) ctx.emit('done')
      else error.value = 'Error in retreiving the object id'
    })

    onError((err) => {
      // console.warn(err)
      error.value = err?.name || ''
    })
    return { values, error, resetForm, save }
  }
})
</script>
