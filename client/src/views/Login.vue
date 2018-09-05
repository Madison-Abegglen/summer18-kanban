<template>
  <main class='login'>
    <form>
      <mdc-textfield v-model='name' label='Name' required />
    </form>
  </main>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: true,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    },
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
};
</script>

<style lang='scss'>
label.mdc-floating-label {
  margin-bottom: 0;
}
input.mdc-text-field__input {
  padding-top: 0;
}
</style>
