<template>
  <div class="board">
    <header>
      <mdc-headline class='m-0'>Welcome to your board: {{activeBoard.title}}</mdc-headline>
      <mdc-body class='m-0'>Created At: {{ activeBoard.created | moment('h:mm a — MM/DD/YY') }}</mdc-body>
    </header>
  </div>
</template>

<script>
import List from "@/components/List";
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
  props: ["boardId"],
  components: { List }
};
</script>
<style lang="scss">
.m-0 {
  margin: 0;
}
header {
  padding-top: 1rem;
  padding-left: 2rem;
}
</style>
