<template>
  <div class="board">
    <mdc-headline class='title'>Welcome to your board: {{activeBoard.title}}</mdc-headline>
    <mdc-body>{{ activeBoard.created | moment('MM/DD/YY') }}</mdc-body>
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
.title {
  margin-bottom: 0;
}
</style>
