<template lang="pug">
.hello
  h1 Test
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
  div token {{token}}
  div(v-for="collection of collections")
    h3 {{collection.name}}
    collection(:collection="collection")
</template>

<script lang="ts">
import {
  useJWT,
  useLogin,
  useLogout,
  useRegister,
  useStatus
} from '@platyplus/vue-hasura-backend-plus'
import { defineComponent, ref } from 'vue'

import { useCollections } from '../plugins/rxdb-hasura'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const email = ref('')
    const password = ref('')
    const status = useStatus()
    const { login, error } = useLogin(email, password)
    const data = ref()
    const logout = useLogout()
    const { register } = useRegister(email, password)
    const token = useJWT()
    const collections = useCollections()
    return {
      email,
      password,
      register,
      login,
      logout,
      status,
      error,
      data,
      token,
      collections
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
