<template lang="pug">
.auth
  h2 Register
  form
    p Already have an account? 
      router-link(:to="{name: 'login'}") Login
    p-input-text(v-model="email" id="email" type="text" placeholder="Email" autocomplete="username")
    p-input-text(v-model="password" id="password" type="password" placeholder="Password" autocomplete="current-password")                    
    p-button.p-button-rounded(@click="registerUser") Register
  p {{error}}
</template>

<script lang="ts">
import { useRegister } from '@platyplus/vue-hasura-backend-plus'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const { register, error } = useRegister(email, password)
    const registerUser = async () => {
      await register()
      if (!error.value) {
        router.push('/')
      }
    }
    return {
      email,
      password,
      registerUser,
      status,
      error
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/auth.scss';
</style>
