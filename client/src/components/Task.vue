<template>
  <mdc-list-item class="master-list-list" :style='$store.state.dragging ? "cursor: grab" : ""'>
    <drag @dragstart='$store.state.dragging += 1' @dragend='$store.state.dragging -= 1' :transfer-data='{ taskId: $props.taskData._id, oldListId: $props.taskData.listId }' style='width: 100%;'>
      <div class='task-content'>
        <span class='title' align='left'>{{$props.taskData.content}}</span>
        <mdc-body class="counter" title="comment count">{{ comments.length }}</mdc-body>

        <mdc-button dense title="view comments" @click="comments.length && (open = !open)">
          <mdc-icon icon="keyboard_arrow_down"></mdc-icon>
        </mdc-button>

        <mdc-button dense title="create comment" class="add-comment-button" @click="newCommentOpen = true">
          <mdc-icon icon="add"></mdc-icon>
        </mdc-button>

        <mdc-button dense title="remove task" @click='deleteTask'>
          <i class='material-icons mdc-button__icon'>delete_outline</i>
        </mdc-button>
      </div>
      <span slot='image' class='title html-image' align='left'>{{$props.taskData.content}}</span>
    </drag>

    <mdc-list v-if="open" class="comment-list">
      <comment v-for="comment in comments" :key="comment._id" :commentData="comment" />
    </mdc-list>

    <mdc-dialog v-model='newCommentOpen' title='New Comment' accept=''>
      <form @submit.prevent='addComment' class="form">
        <mdc-textfield required label='Comment content' v-model='commentContent' multiline rows="5" cols="70" class="comment-content" />
        <mdc-button type='submit' @click='newCommentOpen = false' outlined>Create Comment</mdc-button>
      </form>
    </mdc-dialog>

  </mdc-list-item>
</template>

<script>
import Comment from "@/components/Comment";
export default {
  name: "task",
  props: ["taskData"],
  computed: {
    comments() {
      return this.$props.taskData.comments;
    }
  },
  components: { Comment },
  data() {
    return {
      open: false,
      newCommentOpen: false,
      commentContent: "",
      nowCommentOpen: false
    };
  },
  methods: {
    addComment() {
      this.$store.dispatch("createComment", {
        taskId: this.$props.taskData._id,
        content: this.commentContent,
        listId: this.$props.taskData.listId
      });
      this.commentContent = "";
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", {
        taskId: this.$props.taskData._id,
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
    color: white !important;
    background-color: #5c636e66;
    transition: background-color 0.2s !important;
  }
  *:not(.title) {
    color: #5c636e66;
    transform: scale(0.85);
    transition: color 0.2s;
  }
  &:hover {
    .counter {
      background-color: #5c636eaa;
    }
    *:not(.title) {
      color: #5c636eaa;
    }
  }
  .title {
    font-size: 1.15rem;
    color: black;
  }
}
.comment-list {
  width: 100%;
}
.master-list-list {
  display: flex;
  flex-direction: column;
  height: unset !important;
}
.html-image {
  opacity: 1;
  background-color: white;
  padding: 0.5rem 1rem;
  border: solid 1px black;
  width: 5rem;
  overflow: hidden;
  white-space: nowrap;
}
</style>
