import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {

  callingAPI: false,
  searching: "",
  user: null,
  amplifyUser: null,
  token: null,
  userInfo: {
    messages: [],
    notifications: [],
    tasks: []
  }
}

const actions = {

  updateUserAmplify ({ commit }, { amplifyUser }) {
    commit("setAmplifyUser", amplifyUser)
  },
  updateUser ({ commit }, { user, token }) {
    commit("setToken", token)
    commit("setUser", user)
  },
  logout ({ commit }) {
    commit("setToken", null)
    commit("setUser", {})
  }
}

const mutations = {
  loginLoading (state) {
    state.callingAPI = !state.callingAPI
  },
  globalSearching (state) {
    state.searching = state.searching === "" ? "loading" : ""
  },
  setAmplifyUser (state, amplifyUser) {
    state.amplifyUser = amplifyUser
  },
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
