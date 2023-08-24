// import { login, logout, getInfo, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import user from '@/api/user'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '', // 用户真实姓名
    username: '', // 用户昵称
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  setRealname: (state, name) => {
    state.name = name
  },
  setUsername: (state, name) => {
    state.username = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      user.login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        user.getUserInfo().then((res) => {
          commit('setRealname', res.data.realname)
          commit('setUsername', res.data.username)
          resolve()
        })
        setToken(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      user.getUserInfo().then((res) => {
        commit('setRealname', res.data.realname)
        commit('setUsername', res.data.username)
        resolve()
      }).catch(error => {
        reject(error)
      })
      // getInfo(state.token).then(response => {
      //   const { data } = response
      //
      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }
      //
      //   const { name, avatar } = data
      //
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      user.logout(state.token).then(() => {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
