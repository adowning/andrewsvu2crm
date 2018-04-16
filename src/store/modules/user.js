import Vue from "vue"
import Vuex from "vuex"
var Parse = require('parse');
Vue.use(Vuex)

const state = {

  callingAPI: false,
  searching: "",
  user: null,
  amplifyUser: null,
  token: null,
  userAttributes: null,
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
    Parse.User.logOut().then(() => {
      var currentUser = Parse.User.current();  // this will now be null
    });
    commit("setToken", token)
    commit("setUser", user)
    commit("setUserAttributes", user.attributes)
  },
  logout ({ commit }) {
    commit("setToken", null)
    commit("setAmplifyUser", null)
    commit("setUserAttributes", null)
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
  },
  setUserAttributes (state, userAttributes) {
    state.userAttributes = userAttributes
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
