<template>
  <mdc-card>
    <mdc-card-header :title="list.title">
    </mdc-card-header>
  </mdc-card>
</template>

<script>
export default {
  name: "list",
  props: ["listData"]
};
</script>

<style scoped>
</style>
