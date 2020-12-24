<template lang="pug">
div.container
  div
    Logo
    div.title @platyplus/easy-web
    div.links
      a(href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green") Documentation
      a(href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey") GitHub
    div authenticated: {{status}}
    div(v-if="!status")
      form
        input(v-model="email")
        input(type="password" v-model="password" current-password)
      button(@click="register") Register
      button(@click="login") Login
      div {{error}}
    div(v-else)
      button(@click="logout") Logout
      div data {{data}}
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  watch
} from '@nuxtjs/composition-api'
import {
  useHasuraClaims,
  useLogin,
  useLogout,
  useRegister,
  useStatus
} from '@platyplus/nuxt-hasura-backend-plus'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { inject } from '@nuxtjs/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineComponent({
  setup: _ => {
    const email = ref('')
    const password = ref('')
    const status = useStatus()
    const { login, error } = useLogin(email, password)
    const data = useHasuraClaims()
    const logout = useLogout()
    const { register } = useRegister(email, password)
    let ok = false
    watch(
      () => status.value,
      val => {
        ok = val
      }
    )
    const { result } = useQuery(
      gql`
        query getUsers {
          visite {
            id
          }
        }
      `,
      {},
      () => ({ enabled: ok })
    )
    return {
      email,
      password,
      register,
      login,
      logout,
      status,
      error,
      data
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
