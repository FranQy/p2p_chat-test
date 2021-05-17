import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isHost: false,
        chatId: undefined,
        user: {
            id: undefined,
            username: undefined,
        },
        friends: [],
        history: {},
        _state: true,
    },

    mutations: {
        saveCurrentUser(state, payload) {
            if (state && payload) {
                state.user = payload.user;
                if (payload.user) {
                    localStorage.setItem('user', JSON.stringify(payload.user));
                } else {
                    localStorage.removeItem('user')
                }
            }
        },

        addMessage(state, payload) {
            if (state && payload) {
                if (!state.history[payload.chatId]) {
                    state.history[payload.chatId] = [];
                }
                state.history[payload.chatId].push(payload.message);
                localStorage.setItem('history', JSON.stringify(state.history));
                state._state = !state._state
            }
        },

        addFriend(state, payload) {
            if (state && payload) {
                if (payload.friend) {
                    state.friends = state.friends.filter(user => user.id !== payload.friend.id);
                    if (payload.friend.id === state.user.id) {
                        return
                    }

                    state.friends.push(payload.friend);

                    state.history[payload.friend.id] = state.history[payload.friend.id] || [];
                    localStorage.setItem('friends', JSON.stringify(state.friends));
                    localStorage.setItem('history', JSON.stringify(state.history));
                }
            }
        },
    },
})
