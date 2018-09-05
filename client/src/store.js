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
    snack: {}
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
    register ({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(error => dispatch('showSnack', error))
    },
    authenticate ({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
        .catch(() => {}) // Swallow your errors
    },
    login ({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
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
    }

  }
})
