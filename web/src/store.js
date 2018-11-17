import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'lunchkeeper',
  storage: localStorage
})


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurants: []
  },
  mutations: {
    addRestaurant: function (state, res) {
      state.restaurants = [...state.restaurants, res];
    },
    removeRestaurant: function (state, res) {
      state.restaurants = state.restaurants.filter(x => x.id != res.id || x.source != res.source)
    }
  },
  actions: {

  },
  getters: {
    restaurants: state => state.restaurants
  },
  plugins: [vuexPersist.plugin]
})
