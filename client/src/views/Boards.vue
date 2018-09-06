<template>
  <main class='boards'>
    <mdc-headline align="center">WELCOME TO THE BOARDS!!!</mdc-headline>
    <mdc-fab fixed icon='add' @click='open = true'></mdc-fab>
    <mdc-dialog v-model='open' title='New Board' accept=''>
      <form @submit.prevent='addBoard' class="form">
        <mdc-textfield label='Title' v-model='newBoard.title' required />
        <mdc-textfield label='Description' v-model='newBoard.description' multiline rows="5" cols="70" class="description" />
        <mdc-button type='submit' @click='open = false' outlined>Create Board</mdc-button>
      </form>
    </mdc-dialog>
    <mdc-list bordered class='list'>
      <mdc-list-item class='list-item mdc-elevation mdc-elevation--z2' v-for='board in boards' :key='board._id'>
        <mdc-button class='board-title' :to='{name: "board", params: {boardId: board._id}}'>{{board.title}}</mdc-button>
        <mdc-menu-anchor>
          <mdc-button @click='board.open = true' class='settings'>
            <i class='material-icons mdc-button__icon'>more_horiz</i>
          </mdc-button>
          <mdc-menu v-model='board.open'>
            <mdc-button @click='deleteBoard(board._id)'>Remove</mdc-button>
            <mdc-button>Rename</mdc-button>
            <mdc-button :to='{name: "board", params: {boardId: board._id}}'>Open</mdc-button>
          </mdc-menu>
        </mdc-menu-anchor>
      </mdc-list-item>
    </mdc-list>
  </main>
</template>

<script>
export default {
  name: 'boards',
  created() {
    // blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: 'login' });
    }
  },
  mounted() {
    this.$store.dispatch('getBoards');
  },
  data() {
    return {
      newBoard: {
        title: '',
        description: ''
      },
      open: false
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch('addBoard', this.newBoard);
      this.newBoard = { title: '', description: '' };
    },
    deleteBoard(boardId) {
      this.$store.dispatch('deleteBoard', boardId);
    }
  }
};
</script>

<style lang='scss' scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 35rem;
  max-width: 100%;
  margin: auto;
}
.list {
  width: 35rem;
  margin: auto;
  .list-item {
    display: flex;
    justify-content: space-between;
    overflow: visible;
    transition: box-shadow 0.2s;
    will-change: box-shadow;
    &:not(:hover) {
      box-shadow: none;
    }
    .settings {
      border-radius: 50%;
      min-width: unset;
      padding: 0;
      width: 2rem;
      height: 2rem;

      i {
        margin: 0;
      }
    }
  }
}

.board-title {
  text-transform: initial;
  text-decoration: underline;
  color: #222 !important;
  transition: color 0.2s;
  will-change: color;
  &:hover {
    color: #666 !important;
  }
  letter-spacing: 0;
  &::before,
  &::after {
    background-color: transparent !important;
  }
}
</style>
<style lang='scss'>
ul.mdc-simple-menu__items.mdc-list {
  padding: 0;
}

textarea {
  resize: none;
}
</style>
