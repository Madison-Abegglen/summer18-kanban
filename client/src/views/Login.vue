<template>
  <main class='login'>
    <form @submit.prevent='submitForm' class='login-form'>
      <div class='title-wrapper'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path xmlns="http://www.w3.org/2000/svg" fill="#f8b500" d="M 16.71875 2.21875 L 16.53125 2.84375 L 15.78125 5.0625 C 15.193704 5.0872899 14.647794 5.2584559 14.3125 5.59375 C 13.875243 5.9872811 13.6319 6.5509602 13.59375 7.125 C 13.297454 7.0546296 12.9875 7 12.6875 7 C 12.392256 7 12.13813 7.0424375 11.875 7.125 C 10.992565 5.7636948 7.9018919 4 5 4 C 3.2 4 2.19375 4.7125 2.09375 5.3125 C 1.69375 6.6125 3 9.8 7 10 C 7.8771721 10 9.0721541 9.8277472 10.09375 9.46875 C 10.060032 9.7875942 10.075926 10.118076 10.15625 10.46875 C 8.9548797 10.377944 7.755 10.79625 6.8125 11.59375 L 14.1875 16 C 14.345192 15.306154 14.329281 14.618677 14.1875 13.96875 C 14.26055 13.973757 14.334324 14 14.40625 14 C 15.30625 14 16 13.6 16.5 13 C 17.09076 12.11386 17.121077 10.982358 16.71875 9.9375 C 17.774029 10.035674 18.773921 9.9434803 19 10 C 19 10 19.1 7.5 18 6 C 17.691781 5.5890411 17.255111 5.3330463 16.78125 5.1875 L 17.25 3.78125 L 19.71875 5.40625 L 20.28125 4.59375 L 17.28125 2.59375 L 16.71875 2.21875 z M 4 6 L 5 6 C 5.7 6 6.1 6.10625 7 6.40625 C 8.4 6.80625 9.3125 7.2 9.8125 7.5 C 9.2125 7.8 8.1 8 7 8 C 4.6 8 4.1 6.4 4 6 z M 12.6875 9 C 13.1875 9 13.7875 9.19375 14.1875 9.59375 C 14.9875 10.29375 15.20625 11.3125 14.90625 11.8125 C 14.80625 12.0125 14.5125 12 14.3125 12 C 13.8125 12 13.1875 11.80625 12.6875 11.40625 C 12.2875 11.10625 12.00625 10.5875 11.90625 10.1875 C 11.90625 9.9875 11.8 9.6125 12 9.3125 C 12.2 9.0125 12.4875 9 12.6875 9 z M 5.59375 13.1875 C 5.59375 13.2875 5.50625 13.4 5.40625 13.5 C 5.20625 14 5.1 14.5875 5 15.1875 L 12.3125 19.5 C 12.7125 19 13.10625 18.4125 13.40625 17.8125 L 5.59375 13.1875 z M 5.1875 17.5 C 5.3875 19.5 6.29375 21.3125 7.59375 21.8125 C 8.69375 22.2125 9.9 21.80625 11 20.90625 L 5.1875 17.5 z"/>
        </svg>
        <mdc-text typo='headline4' class='title'>BUMBLE<br>kanban</mdc-text>
      </div>
      <transition mode='out-in'>
        <mdc-textfield leading-icon='person' type='text' v-if='!isLogin' v-model='name' label='Name' box required />
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
  data () {
    return {
      name: '',
      email: '',
      password: '',
      isLogin: true
    }
  },
  methods: {
    submitForm () {
      if (!this.isLogin) {
        return this.register()
      }
      this.login()
    },
    register () {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
      this.name = ''
      this.email = ''
      this.password = ''
      this.login = true
    },
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      this.email = ''
      this.password = ''
    }
  }
}
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
    svg {
      height: 6rem;
      transform: translateY(-1.5rem);
    }

    .title-wrapper {
      position: relative;
      width: 10rem;
      margin: auto;
      svg {
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
      .title {
        margin: 0 0 1rem;
        text-align: center;
      }
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

.v-enter-active, .v-leave-active {
  transition: max-height 0.25s;
}
.v-enter, .v-leave-to {
  max-height: 0;
}
.v-enter-to, .v-leave {
  max-height: 5rem;
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
