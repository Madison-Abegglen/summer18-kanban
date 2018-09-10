<template>
  <div class="board" ref='container'>
    <!-- <header class='mdc-elevation mdc-elevation--z4'>
    </header> -->
    <mdc-top-app-bar icon='arrow_back' dense v-on:nav='$router.push({ name: "boards" })'>
      <div class='header-title'>
        <mdc-headline class='m-0 board-title'>Welcome to your board:
          <strong>{{activeBoard.title}}</strong>
        </mdc-headline>
        <mdc-body class='m-0'>Created at: {{ activeBoard.created | moment('h:mm a — MM/DD/YY') }}</mdc-body>
      </div>
      <i class="material-icons mdc-button__icon info-icon">info
        <div class='board-description mdc-elevation mdc-elevation--z4'>{{ activeBoard.description }}</div>
      </i>
    </mdc-top-app-bar>
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
const autoScroll = require('dom-autoscroller')

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
  async created() {
    // dispatch boardId to setBoard for activeBoard
    await this.$store.dispatch('setBoard', this.$props.boardId);
  },
  mounted() {
    const dragging = () => !!this.$store.state.dragging
    autoScroll(this.$refs.container, {
      margin: 2000,
      maxSpeed: 200,
      pixels: 40,
      scrollWhenOutside: true,
      autoScroll() {
        return this.down && dragging()
      }
    })
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
header {
  position: unset !important;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1.5rem;
  height: unset;
  background-color: var(--mdc-theme-tertiary);
  * {
    margin: 0;
  }
  .header-title {
    display: flex;
    flex-direction: column;
  }
  .info-icon {
    align-self: flex-start;
    margin-left: 0.5rem !important;
    cursor: pointer;
    position: relative;
    &:hover {
      .board-description {
        opacity: 1;
        pointer-events: unset;
      }
    }
    .board-description {
      transition: opacity 0.2s;
      will-change: opacity;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: calc(100% + 0.75rem);
      left: 50%;
      transform: translate(-50%);
      padding: 1rem;
      font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: var(--mdc-theme-background);
      color: var(--mdc-theme-secondary);
      width: 15rem;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 0.5rem;
        height: 0.5rem;
        background-color: var(--mdc-theme-background);
      }
    }
  }
}

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
  margin-left: auto;
  margin-right: auto;
}

.board .mdc-text-field {
  margin: 0.5rem 0 1rem !important;
  width: 15rem;
}

.board .comment-content .mdc-textfield,
.board .task-content .mdc-textfield {
  width: 100%;
}

.add-list-button {
  transition: transform 0.2s;
}
.rotate45 * {
  transform: rotate(45deg);
}
</style>
<style lang='scss'>
.mdc-top-app-bar__section {
  flex: unset !important;
  margin-right: 1rem;
}
</style>