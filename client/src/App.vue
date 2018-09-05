<template>
  <div id='app'>
    <router-view/>
    <mdc-snackbar v-model='$store.state.snack' />
  </div>
</template>

<style>
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
