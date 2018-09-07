<template>
  <drop @drop='moveTask'>
    <mdc-card class="list-card" @click="open = true" :class="{open: open && tasks && tasks.length}">
      <div class="list-header">
        <mdc-card-header :title="$props.listData.title"></mdc-card-header>

        <mdc-body class="counter" title="task count">{{ tasks ? tasks.length : '' }}</mdc-body>

        <mdc-button title="view tasks" class="remove-height" @click="tasks && tasks.length && (open = !open)" :disabled="!tasks || !tasks.length">
          <mdc-icon icon="keyboard_arrow_down"></mdc-icon>
        </mdc-button>

        <mdc-button title="create task" class="remove-height" @click="newTaskOpen = true">
          <mdc-icon icon="add"></mdc-icon>
        </mdc-button>

        <mdc-button title="remove list" @click='deleteList()'>
          <i class='material-icons mdc-button__icon'>delete_outline</i>
        </mdc-button>
      </div>

      <mdc-list two-line class="list-tasks">
        <task v-for="task in tasks" :key="task._id" :taskData="task" />
      </mdc-list>

      <mdc-dialog v-model='newTaskOpen' title='New Task' accept=''>
        <form @submit.prevent='addTask' class="form" key='new-task-form'>
          <mdc-textfield required label='Task Content' v-model='taskContent' multiline rows="5" cols="70" class="task-content" />
          <mdc-button type='submit' @click='newTaskOpen = false' outlined>Create Task</mdc-button>
        </form>
      </mdc-dialog>

    </mdc-card>
  </drop>
</template>

<script>
import Task from '@/components/Task';
export default {
  name: 'list',
  props: ['listData'],
  components: { Task },
  computed: {
    tasks() {
      return this.$store.state.activeTasks[this.$props.listData._id];
    }
  },
  data() {
    return {
      newTaskOpen: false,
      taskContent: '',
      open: false
    };
  },
  methods: {
    addTask() {
      this.$store.dispatch('createTask', {
        listId: this.$props.listData._id,
        content: this.taskContent
      });
      this.taskContent = '';
    },
    deleteList() {
      this.$store.dispatch('deleteList', this.$props.listData._id);
    },
    moveTask(taskId) {
      this.$store.dispatch('moveTask', { taskId, newListId: this.$props.taskContent._id })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  align-items: center;
}
.list-tasks {
  margin-left: 1.5rem;
  display: none;
}
.list-card.open {
  .list-tasks {
    display: unset;
  }
}
</style>
<style lang="scss">
.counter {
  margin-left: auto;
  width: 1.75rem;
  min-width: 1.75rem;
  height: 1.75rem;
  min-height: 1.75rem;
  background-color: var(--mdc-theme-primary);
  color: white;
  text-align: center;
  border-radius: 50%;
  line-height: 1.75rem !important;
  margin-right: 1rem;
}
.list-card {
  width: 60rem;
  max-width: 100%;
  margin: 1rem auto;
  padding: 0 1.5rem;
  form {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    button {
      width: 38.5rem;
      max-width: 100%;
    }
  }
}
.remove-height {
  .mdc-icon {
    height: unset !important;
  }
}
.mdc-button__icon {
  margin: 0 !important;
}
</style>
