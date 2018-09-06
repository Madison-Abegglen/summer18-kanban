<template>
  <div id='app'>
    <router-view/>
    <mdc-snackbar v-model='$store.state.snack' />
  </div>
</template>

<style>
:root {
  /* --mdc-theme-primary: #5da0a2 !important;
  --mdc-theme-secondary: #f4f7f7 !important;
  --mdc-theme-background: #aacfd0 !important; */
  --mdc-theme-primary: #f8b500 !important;
  --mdc-theme-secondary: #393e46 !important;
  --mdc-theme-tertiary: #5c636e !important;
  --mdc-theme-background: #f7f7f7 !important;
}
body {
  height: 100vh;
  margin: 0;
  background-color: var(--mdc-theme-background);
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
