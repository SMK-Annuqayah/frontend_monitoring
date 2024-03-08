import { createApp } from 'vue'
import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
    state: {
        sidebarToggled: false,
    },
    mutations: {
        TOGGLE_SIDEBAR(state) {
          state.sidebarToggled = !state.sidebarToggled;
        },
      },
      actions: {
        toggleSidebar({ commit }) {
          commit('TOGGLE_SIDEBAR');
        },
      },
    });
  
  const app = createApp({ /* your root component */ })
  
  // Install the store instance as a plugin
  app.use(store)

