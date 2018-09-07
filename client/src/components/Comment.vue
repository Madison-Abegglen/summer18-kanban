<template>
  <mdc-list-item class="comment-content">
    {{$props.commentData.content}}
  </mdc-list-item>
</template>

<script>
export default {
  name: "comment",
  props: ["commentData"]
};
</script>

<style scoped>
.comment-content {
  height: unset !important;
  padding: 0.1rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  border-left: solid var(--mdc-theme-primary);
}
</style>
