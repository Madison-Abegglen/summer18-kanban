<template>
  <div id='app'>
    <router-view/>
    <mdc-snackbar v-model='$store.state.snack' />
  </div>
</template>

<style>
:root {
  --mdc-theme-primary: unset !important;
  --mdc-theme-secondary: unset !important;
}
body {
  height: 100vh;
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
