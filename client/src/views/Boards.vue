<template>
  <main class="boards">
    WELCOME TO THE BOARDS!!!
    <mdc-fab fixed icon="add" @click="open=true"></mdc-fab>
    <mdc-dialog v-model="open" title="Title" accept="Accept" cancel="Decline" @accept="onAccept" @cancel="onDecline">
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required>
      <input type="text" placeholder="description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    </mdc-dialog>
    <mdc-list bordered class='list'>
      <mdc-list-item class='list-item' v-for="board in boards" :key="board._id">
        <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
        <!-- <mdc-button @click="deleteBoard(board._id)">DELETE BOARD</mdc-button> -->
        <mdc-menu-anchor>
          <mdc-button @click='open=true' class='settings'>
            <i style='margin: 0;' class="material-icons mdc-button__icon">more_horiz</i>
          </mdc-button>
          <mdc-menu v-model='open'>
            <mdc-menu-item>Remove</mdc-menu-item>
          </mdc-menu>
        </mdc-menu-anchor>
      </mdc-list-item>
    </mdc-list>
  </main>
</template>

<script>
export default {
  name: "boards",
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
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
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(boardId) {
      this.$store.dispatch("deleteBoard", boardId);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 35rem;
  margin: auto;
  .list-item {
    display: flex;
    justify-content: space-between;
    overflow: visible;
    .settings {
      border-radius: 50%;
      min-width: unset;
      padding: 0;
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
<style lang="scss">
ul.mdc-simple-menu__items.mdc-list {
  padding: 0;
}
</style>
