<template>
  <div class="board">
    <mdc-headline>Welcome to ...{{activeBoard.title}}!</mdc-headline>
  </div>
</template>

<script>
export default {
  name: "board",
  computed: {
    activeBoard() {
      return this.$store.state.activeBoard;
    }
  },
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }

    // dispatch boardId to setBoard for activeBoard
    this.$store.dispatch("setBoard", this.$props.boardId);
  },
  props: ["boardId"]
};
</script>