<template>
  <mdc-list-item>
    <div class="task-content">
      <span>{{$props.taskData.content}}</span>
      <mdc-body class="counter" title="comment count">{{ comments.length }}</mdc-body>

      <mdc-button dense title="view comments" @click="comments.length && (open = !open)">
        <mdc-icon icon="keyboard_arrow_down"></mdc-icon>
      </mdc-button>

      <mdc-button dense title="create comment" class="add-comment-button" @click="newCommentOpen = true">
        <mdc-icon icon="add"></mdc-icon>
      </mdc-button>

      <mdc-button dense title="remove task" @click='deleteTask()'>
        <i class='material-icons mdc-button__icon'>delete_outline</i>
      </mdc-button>
    </div>
    <mdc-dialog v-model='newCommentOpen' title='New Comment' accept=''>
      <form @submit.prevent='addComment' class="form">
        <mdc-textfield required label='Comment Content' v-model='commentContent' multiline rows="5" cols="70" class="comment-content" />
        <mdc-button type='submit' @click='newCommentOpen = false' outlined>Create Task</mdc-button>
      </form>
    </mdc-dialog>
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
      newCommentOpen: false,
      commentContent: ""
    };
  },
  methods: {
    addComment() {
      this.$store.dispatch("createComment", {
        taskId: this.$props.taskData._id,
        content: this.commentContent,
        listId: this.$props.taskData.listId
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.task-content {
  display: flex;
  width: 100%;
  align-items: center;
  .counter {
    align-self: flex-end;
    color: white;
    background-color: #5c636eaa;
  }
  *:not(span) {
    color: #5c636eaa;
    transform: scale(0.85);
  }
}
</style>
