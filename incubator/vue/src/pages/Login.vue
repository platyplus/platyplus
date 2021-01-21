<template lang="pug">
.auth
  h2 Login
  form
    p No account yet? 
      router-link(:to="{name: 'register'}") Sign up
    InputText(v-model="email" id="email" type="text" placeholder="Email" autocomplete="username" @keyup.enter="login")
    InputText(v-model="password" id="password" type="password" placeholder="Password" autocomplete="current-password" @keyup.enter="login")                    
    p Lost password?
    Button.p-button-rounded(@click="login") Login
  p {{error}}
</template>

<script lang="ts">
import { useLogin } from '@platyplus/vue-hasura-backend-plus'
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const email = ref('')
    const password = ref('')
    const { login: hbpLogin, error } = useLogin(email, password)
    const login = async () => {
      await hbpLogin()
      if (!error.value) router.replace(route.redirectedFrom || '/home')
    }
    return {
      email,
      password,
      login,
      error
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/auth.scss';
</style>
