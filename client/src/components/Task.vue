<template>
  <mdc-list-item>
    <div>
      <span>{{$props.taskData.content}}</span>
      <mdc-body class="counter" title="comment count">{{ comments.length }}</mdc-body>

      <mdc-button title="view comments" @click="comments.length && (open = !open)">
        <mdc-icon icon="keyboard_arrow_down"></mdc-icon>
      </mdc-button>

      <mdc-button title="create comment" class="add-comment-button" @click="newCommentOpen = true">
        <mdc-icon icon="add"></mdc-icon>
      </mdc-button>

      <mdc-button title="remove task" @click='deleteTask()'>
        <i class='material-icons mdc-button__icon'>delete_outline</i>
      </mdc-button>
    </div>
  </mdc-list-item>
</template>

<script>
export default {
  name: "task",
  props: ["taskData"],
  computed: {
    comments() {
      return this.$props.taskData.comments;
    }
  },
  data() {
    return {
      open: false,
      newCommentOpen: false
    };
  },
  methods: {}
};
</script>

<style scoped>
</style>
