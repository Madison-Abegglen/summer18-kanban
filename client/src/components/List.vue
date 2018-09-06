<template>
  <mdc-card class="list-card">
    <div class="list-header">
      <mdc-card-header :title="$props.listData.title">
      </mdc-card-header>
      <mdc-icon icon="add"></mdc-icon>
    </div>

  </mdc-card>
</template>

<script>
export default {
  name: "list",
  props: ["listData"]
};
</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
<style lang="scss">
.list-card {
  width: 60rem;
  max-width: 100%;
  margin: 1rem auto;
  padding: 0 1.5rem;
}
</style>

