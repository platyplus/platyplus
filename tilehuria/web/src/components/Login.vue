<template lang="pug">
validation-observer(v-slot='{ handleSubmit }')
  form(@submit.prevent='handleSubmit(login)')
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
      rules='required',
      name='password',
      v-slot='{ errors, touched, invalid }'
    )
      q-input(
        v-model='password',
        label='password',
        type='password',
        autocomplete='current-password',
        :error='touched && invalid',
        :error-message='errors[0]'
      )
    .text-negative(v-if='error') {{ error }}
    q-btn(type='submit') Login
</template>

<script lang="ts">
import { useApolloClient } from '@vue/apollo-composable'
import { defineComponent, ref } from '@vue/composition-api'
import { extend } from 'vee-validate'
import { email,required } from 'vee-validate/dist/rules'

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

export default defineComponent({
  name: 'Login',

  setup(_, { root: { $router } }) {
    const auth = useAuth()
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const apolloClient = useApolloClient()
    const login = async () => {
      await handleAxiosRequest(
        async () => await auth?.login(email.value, password.value),
        error
      )
      if (!error.value) {
        apolloClient.client.stop()
        // apolloClient.client.

        await $router.push('/')
      }
    }
    return { email, password, login, error }
  }
})
</script>
