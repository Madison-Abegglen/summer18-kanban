<template>
  <mdc-card class="list-card">
    <div class="list-header">
      <mdc-card-header :title="$props.listData.title">
      </mdc-card-header>
      <mdc-button @click="newTaskOpen = true">
        <mdc-icon icon="add"></mdc-icon>
      </mdc-button>
    </div>
    <mdc-dialog v-model='newTaskOpen' title='New Task' accept=''>
      <form @submit.prevent='addTask' class="form">
        <mdc-textfield label='Task Content' v-model='taskContent' multiline rows="5" cols="70" class="task-content" />
        <mdc-button type='submit' @click='newTaskOpen = false' outlined>Create Task</mdc-button>
      </form>
    </mdc-dialog>
  </mdc-card>
</template>

<script>
export default {
  name: "list",
  props: ["listData"],
  computed: {
    tasks() {
      return this.$store.state.activeTasks[this.$props.listData._id];
    }
  },
  data() {
    return {
      newTaskOpen: false,
      taskContent: ""
    };
  },
  methods: {
    addTask() {
      this.$store.dispatch("createTask", {
        listId: this.$props.listData._id,
        content: this.taskContent
      });
    }
  }
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

