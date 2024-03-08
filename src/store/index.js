import { createStore } from 'vuex'

export default createStore({
  state: {
    countdown: 60,
    countdowning: false
  },
  getters: {
  },
  mutations: {
    startCountDown(state) {
      if (!state.countdowning) {
        state.countdowning = true;
        const interval = setInterval(() => {
          state.countdown--;
          if (state.countdown <= 0) {
            clearInterval(interval);
            state.countdown = 60;
            state.countdowning = false;
          }
        }, 1000);
      }
    }

  },
  actions: {
  },
  modules: {
  }
})
