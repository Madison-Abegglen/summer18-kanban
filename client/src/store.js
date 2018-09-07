import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: '//localhost:3000/auth/',
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: '//localhost:3000/api/',
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    snack: {},
    activeLists: [],
    activeTasks: {},
    reroute: undefined
  },
  getters: {
    loggedIn: state => !!state.user._id
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setBoards (state, boards) {
      state.boards = boards
    },
    setSnack (state, snack) {
      state.snack = snack
    },
    setActiveBoard (state, activeBoard) {
      state.activeBoard = activeBoard
    },
    setActiveLists (state, activeLists) {
      state.activeLists = activeLists
    },
    setActiveTasks (state, { listId, tasks }) {
      Vue.set(state.activeTasks, listId, tasks)
    }
  },
  actions: {
    showSnack ({ commit }, snack) {
      if (snack instanceof Error) {
        if (snack.response && snack.response.data && snack.response.data.error) {
          snack = { message: snack.response.data.error, actionText: 'OK' }
        } else {
          snack = { message: snack.message, actionText: 'OK' }
        }
      }
      commit('setSnack', snack)
    },

    // AUTH STUFF
    register ({ commit, dispatch, state }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push(state.reroute || { name: 'boards' })
        })
        .catch(error => dispatch('showSnack', error))
    },
    authenticate ({ commit, state }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push(state.reroute || { name: 'boards' })
        })
        .catch(() => { }) // Swallow your errors
    },
    login ({ commit, dispatch, state }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push(state.reroute || { name: 'boards' })
        })
        .catch(error => dispatch('showSnack', error))
    },
    logout ({ commit, dispatch }) {
      auth.delete('logout')
        .then(() => commit('setUser', {}))
        .catch(error => dispatch('showSnack', error))
    },

    // BOARDS
    getBoards ({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data.map(board => {
            board.open = false
            return board
          }))
        })
        .catch(error => dispatch('showSnack', error))
    },
    addBoard ({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
        .catch(error => dispatch('showSnack', error))
    },
    deleteBoard ({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(error => dispatch('showSnack', error))
    },

    // SINGULAR BOARD
    async setBoard ({ commit, dispatch, state }, boardId) {
      let activeBoard = state.boards.find(board => board._id === boardId)
      if (!activeBoard) {
        try {
          let { data: boards } = await api.get('boards/')
          boards = boards.map(board => {
            board.open = false
            return board
          })
          activeBoard = boards.find(board => board._id === boardId)
        } catch (error) {
          dispatch('showSnack', error)
        }
      }
      commit('setActiveBoard', activeBoard)
      dispatch('setLists', boardId)
    },

    // LISTS
    setLists ({ commit, dispatch, state }, boardId) {
      api.get('lists/' + boardId)
        .then(res => {
          commit('setActiveLists', res.data)
          res.data.forEach(list => {
            dispatch('setTasks', list._id)
          })
        })
        .catch(error => dispatch('showSnack', error))
    },
    createList ({ dispatch, state }, title) {
      api.post('lists/', { title, boardId: state.activeBoard._id })
        .then(res => {
          dispatch('setLists', state.activeBoard._id)
        })
        .catch(error => dispatch('showSnack', error))
    },
    deleteList ({ dispatch, state }, listId) {
      api.delete('lists/' + listId)
        .then(res => {
          dispatch('setLists', state.activeBoard._id)
        })
        .catch(error => dispatch('showSnack', error))
    },
    clearLists ({ commit }) {
      commit('setActiveLists', [])
    },

    // TASKZZZZ
    setTasks ({ commit, dispatch }, listId) {
      api.get('tasks/' + listId)
        .then(res => {
          commit('setActiveTasks', { listId, tasks: res.data })
        })
        .catch(error => dispatch('showSnack', error))
    },
    createTask ({ dispatch }, data) {
      api.post('tasks/', data)
        .then(res => {
          dispatch('setTasks', data.listId)
        })
        .catch(error => dispatch('showSnack', error))
    },
    moveTask ({ dispatch }, data) {
      api.put('tasks/' + data.taskId, { listId: data.newListId })
        .then(res => {
          dispatch('setTasks', data.newListId)
          dispatch('setTasks', data.oldListId)
        })
        .catch(error => dispatch('showSnack', error))
    },

    // COMMENTTTTTTZ
    createComment ({ dispatch }, data) {
      api.post('tasks/comments/' + data.taskId, {
        content: data.content
      })
        .then(res => {
          dispatch('setTasks', data.listId)
        })
        .catch(error => dispatch('showSnack', error))
    }
  }
})
