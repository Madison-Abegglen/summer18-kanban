<template>
  <div class="board">
    <header>
      <mdc-headline class='m-0 board-title'>Welcome to your board:
        <strong>{{activeBoard.title}}</strong>
      </mdc-headline>
      <mdc-body class='m-0'>Created at: {{ activeBoard.created | moment('h:mm a — MM/DD/YY') }}</mdc-body>
    </header>

    <transition-group name='lists' tag='section'>
      <mdc-card v-if="newListOpen" class="add-list-card list" key='form'>
        <form @submit.prevent="addNewList">
          <mdc-textfield v-model="newListTitle" label="Title goes here" required />
          <mdc-button outlined type="submit">Create List</mdc-button>
        </form>
      </mdc-card>

      <list class='list' v-for="list in activeLists" :key="list._id" :listData="list" />
    </transition-group>

    <mdc-fab fixed icon="add" @click="newListOpen = !newListOpen" class='add-list-button' :class='{ rotate45: newListOpen }'>
    </mdc-fab>
    <!-- <mdc-button class='add-list-button' @click='newListOpen = !newListOpen' :class='{ opened: newListOpen }'>
      <i class="material-icons mdc-button__icon">add</i>
      {{ newListOpen ? 'Close' : 'Add list' }}
    </mdc-button> -->

  </div>
</template>

<script>
import List from '@/components/List';
export default {
  name: 'board',
  computed: {
    activeBoard() {
      return this.$store.state.activeBoard;
    },
    activeLists() {
      return this.$store.state.activeLists;
    }
  },
  created() {
    // blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: 'login' });
    }

    // dispatch boardId to setBoard for activeBoard
    this.$store.dispatch('setBoard', this.$props.boardId);
  },
  props: ['boardId'],
  components: { List },
  data() {
    return {
      newListOpen: false,
      newListTitle: ''
    };
  },
  methods: {
    addNewList() {
      this.newListOpen = false;
      this.$store.dispatch('createList', this.newListTitle);
      this.newListTitle = '';
    }
  }
};
</script>
<style lang='scss' scoped>
.lists-leave-active {
  position: absolute;
}
.lists-enter,
.lists-leave-to {
  opacity: 0;
  transform: translateX(-2.25rem);
}
.lists-move {
  transition: transform 0.3s, all 0.2s;
}
</style>
<style lang="scss">
.m-0 {
  margin: 0;
}
.board-title {
  strong {
    font-weight: 500;
  }
}
header {
  padding: 1.5rem 2rem;
  background-color: var(--mdc-theme-tertiary);
  color: white;
}
.add-list-card {
  width: 60rem;
  margin: 1rem auto;
  padding: 0 1.5rem;
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.list {
  max-width: calc(100% - 1.5rem);
  transition: all 0.2s;
}

.board .mdc-text-field {
  margin: 0.5rem 0 1rem !important;
  width: 15rem;
}

.add-list-button {
  transition: transform 0.2s;
}
.rotate45 {
  transform: rotate(45deg);
}
</style>
