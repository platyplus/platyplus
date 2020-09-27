<template lang="pug">
validation-observer(v-slot='{ handleSubmit, reset }')
  form(
    @submit.prevent='handleSubmit(register)',
    @reset.prevent='reset(); resetForm()'
  )
    validation-provider(
      rules='required|email',
      name='email',
      v-slot='{ errors, touched, invalid }'
    )
      q-input(
        v-model='email',
        label='email',
        autocomplete='username',
        autofocus,
        :error='touched && invalid',
        :error-message='errors[0]'
      )
    validation-provider(
      rules='required|min:6',
      name='password',
      v-slot='{ errors, touched, invalid }'
    )
      q-input(
        v-model='password',
        label='password',
        type='password',
        autocomplete='new-password',
        :error='touched && invalid',
        :error-message='errors[0]'
      )
    .text-negative(v-if='error') {{ error }}
    q-btn(type='submit') Register
    q-btn(type='reset') Reset
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { extend } from 'vee-validate'
import { email, min, required } from 'vee-validate/dist/rules'

import { useAuth } from '../composables'
import { handleAxiosRequest } from '../utils'
extend('email', {
  ...email,
  message: '{_field_} must be an email'
})
extend('required', {
  ...required,
  message: '{_field_} is required'
})
extend('min', {
  ...min,
  message: '{_field_} must have at least {length} characters'
})
// TODO confirm email
export default defineComponent({
  name: 'Register',

  setup(_, { root: { $router } }) {
    const auth = useAuth()
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const register = async () => {
      await handleAxiosRequest(
        async () => await auth?.register(email.value, password.value),
        error
      )
      if (!error.value) {
        try {
          await auth?.login(email.value, password.value)
          await $router.push('/')
        } catch (err) {
          // console.log(err)
        }
      }
    }
    const resetForm = () => {
      email.value = ''
      password.value = ''
      error.value = ''
    }
    return { email, password, register, resetForm, error }
  }
})
</script>
