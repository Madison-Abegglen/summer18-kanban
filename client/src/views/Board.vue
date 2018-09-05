<template>
  <div class="board">
    <header>
      <mdc-headline class='m-0'>Welcome to your board: {{activeBoard.title}}</mdc-headline>
      <mdc-body class='m-0'>Created At: {{ activeBoard.created | moment('h:mm a — MM/DD/YY') }}</mdc-body>
    </header>
    <section>
      <mdc-card v-if="newListOpen">
      <form @submit.prevent="addNewList">
        <mdc-textfield v-model="newListTitle" label="Title goes here" />
        <mdc-button outlined type="submit">Create List</mdc-button>
      </form>
      </mdc-card>
      <list v-for="list in activeLists" :key="list._id" :listData="List" />
    </section>
    <mdc-fab fixed icon="add" @click="newListOpen = true">
    </mdc-fab>
  </div>
</template>

<script>
import List from "@/components/List";
export default {
  name: "board",
  computed: {
    activeBoard() {
      return this.$store.state.activeBoard;
    },
    activeLists() {
      return this.$store.state.activeLists;
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
  components: { List },
  data() {
    return {
      newListOpen: false,
      newListTitle: ""
    };
  },
  methods: {
    addNewList() {
      this.newListOpen = false;
      this.$store.dispatch("createList", this.newListTitle);
      this.newListTitle = "";
    }
  }
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
