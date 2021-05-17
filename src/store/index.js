import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isHost: false,
        gameId: undefined,
        card:undefined,
        user: {
            id: undefined,
            username: undefined,
            role: 0
        },
        users: [],
        cards:[
            {
                value: 0,
                text: "0"
            },
            {
                value: 0.5,
                text: "1/2"
            },
            {
                value: 1,
                text: "1"
            },
            {
                value: 2,
                text: "2"
            },
            {
                value: 3,
                text: "3"
            },
            {
                value: 5,
                text: "5"
            },
            {
                value: 8,
                text: "8"
            },
            {
                value: 13,
                text: "13"
            },
            {
                value: 20,
                text: "20"
            },
            {
                value: 40,
                text: "40"
            },
            {
                value: 100,
                text: "100"
            },
            {
                value: null,
                text: "?"
            },
        ],
        selectedCards:[],
        areCardsVisible:false
    },

    mutations: {
        saveLoggedUser(state, payload) {
            if (state && payload) {
                state.user = payload.user;
                if (payload.user) {
                    localStorage.setItem('user', JSON.stringify(payload.user));
                } else {
                    localStorage.removeItem('user')
                }
            }
        },
        saveHostGameId(state, payload) {
            if (state && payload) {
                state.gameId = payload.gameId;

                localStorage.setItem(payload.gameId, payload.gameId);
            }
        },
    },
    actions: {},
    modules: {},

})
