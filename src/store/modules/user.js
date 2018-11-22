import { login, logout, getInfo } from '@/api/login'
import { getToken, removeToken, setToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          let data = response.data
          commit('SET_TOKEN', data.data.username)
          setToken(data.data.username)
          commit('SET_NAME', data.data.username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GuestLogin: ({ commit }) => {
      commit('SET_TOKEN', 'GuestLogin')
      commit('SET_NAME', 'Guest')
      setToken('GuestLogin')
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          if (response.data.code === 0) {
            commit('SET_ROLES', ['user'])
            commit('SET_NAME', response.data.data.user.username)
          } else {
            commit('SET_ROLES', ['guest'])
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    SetGuest({ commit }) {
      return new Promise(resolve => {
        let guest = 'Guest'
        commit('SET_NAME', guest)
        resolve()
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
