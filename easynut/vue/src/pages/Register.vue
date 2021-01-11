<template lang="pug">
.auth
  h2 Register
  form
    p Already have an account? 
      router-link(to="/login") Login
    InputText(v-model="email" id="email" type="text" placeholder="Email" autocomplete="username")
    InputText(v-model="password" id="password" type="password" placeholder="Password" autocomplete="current-password")                    
    Button.p-button-rounded(@click="register") Register
  p {{error}}
  p -{{status}}-
</template>

<script lang="ts">
import { useRegister } from '@platyplus/vue-hasura-backend-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const { register, error } = useRegister(email, password)
    return {
      email,
      password,
      register,
      status,
      error
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/auth.scss';
</style>
