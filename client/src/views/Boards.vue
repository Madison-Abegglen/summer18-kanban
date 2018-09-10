<template>
  <main class='boards'>
    <mdc-top-app-bar icon='exit_to_app' dense title='WELCOME TO YOUR BOARDS' v-on:nav='$store.dispatch("logout")'>
    </mdc-top-app-bar>
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
  created () {
    // blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: 'login' })
    }
  },
  mounted () {
    this.$store.dispatch('clearLists')
    this.$store.dispatch('getBoards')
  },
  data () {
    return {
      newBoard: {
        title: '',
        description: ''
      },
      open: false
    }
  },
  computed: {
    boards () {
      return this.$store.state.boards
    }
  },
  methods: {
    addBoard () {
      this.$store.dispatch('addBoard', this.newBoard)
      this.newBoard = { title: '', description: '' }
    },
    deleteBoard (boardId) {
      this.$store.dispatch('deleteBoard', boardId)
    }
  }
}
</script>

<style lang='scss' scoped>
header {
  position: unset !important;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1.5rem;
  height: unset;
  background-color: var(--mdc-theme-tertiary);
  * {
    margin: 0;
  }
}

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
    background-color: white;
    z-index: 22;
    &:not(:hover) {
      box-shadow: none;
      z-index: unset;
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

  button:not(:last-child) {
    border-right: solid 1px #eee;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

textarea {
  resize: none;
}

.settings {
  border-radius: 50% !important;
  min-width: unset !important;
  padding: 0 !important;
  width: 2rem;
  height: 2rem !important;

  i {
    margin: 0;
  }
}
</style>
