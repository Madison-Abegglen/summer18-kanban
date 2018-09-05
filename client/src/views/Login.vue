<template>
  <main class='login'>
    <form @submit.prevent='submitForm' class='login-form'>
      <mdc-display typo='headline2' class='title'>Kanban</mdc-display>
      <transition mode='out-in'>
        <mdc-textfield type='text' v-if='!isLogin' v-model='name' label='Name' box required />
      </transition>
      <mdc-textfield type='email' v-model='email' label='Email' leading-icon='alternate_email' box required />
      <mdc-textfield type='password' v-model='password' label='Password' minlength='8' helptext-persistent helptext-validation helptext='Password must be at least 8 characters' leading-icon='lock' box required />
      <div class='buttons'>
        <mdc-button raised type='submit'>{{ isLogin ? 'Login' : 'Signup' }}</mdc-button>
        <mdc-button type='button' class='underline-text' @click='isLogin = !isLogin'>Switch to {{ isLogin ? 'Signup' : 'Login' }}</mdc-button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isLogin: true
    };
  },
  methods: {
    submitForm() {
      if (!this.isLogin) {
        return this.register();
      }
      this.login();
    },
    register() {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      });
      this.name = '';
      this.email = '';
      this.password = '';
      this.login = true;
    },
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      });
      this.email = '';
      this.password = '';
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .login-form {
    display: flex;
    flex-direction: column;
    width: 25rem;

    .title {
      margin: 0 0 1rem;
      text-align: center;
    }

    .buttons {
      margin-top: 1rem;
      button:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
}

.underline-text {
  text-decoration: underline;
  background-color: none !important;
}
</style>
<style lang='scss'>
// label.mdc-floating-label {
//   margin-bottom: 0;
// }
// input.mdc-text-field__input {
//   padding-top: 0;
// }
</style>
