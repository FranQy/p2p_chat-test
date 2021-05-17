<template>
    <div class="home">
        <button id="x" v-on:click="openExitModal">X</button>

        <modal :show="showExitModal"
               :title="'Exit'"
               :message="'Are you sure you want to leave this room?'"
               :onClose="closeModal"
               :actions="[{title: 'Cancel', onclick: closeModal}, {title: 'Yes', onclick: exit}]"
        ></modal>
        <div class="widgets-container">
            <poker-table/>
            <users-list/>
        </div>
        <div class="admin-panel" v-if="$store.state.user.role === 1">
            <button @click="playAgain">Play again</button>
            <button @click="revealCards">Reveal cards</button>
        </div>
        <cards/>
    </div>
</template>

<script>
    import Cards from '@/components/Cards.vue'
    import PokerTable from '@/components/PokerTable.vue'
    import UsersList from '@/components/UsersList.vue'
    import Modal from '@/components/Modal.vue'
    import p2p from "../communication/p2p";

    export default {
        name: 'Home',
        components: {
            Modal,
            Cards,
            PokerTable,
            UsersList
        },
        data: function () {
            return {
                showExitModal: false,
            }
        },

        beforeMount() {
            if (!this.$store.state.user) {
                this.$router.push({name: 'Login', params: {id: this.$route.params.id}}).catch(err => {
                });
                return;
            }


            console.log('game', this.$store.state.user.id);

            if (!p2p.isInitialized) {
                p2p.init(this.$store.state.user.id).then(this.startGame.bind(this))
            } else {
                this.startGame();
            }


        },
        methods: {
            startGame() {
                if (this.$store.state.isHost) {
                    this.$store.state.gameId = this.$store.state.user.id;
                    this.$store.commit({
                        type: 'saveHostGameId',
                        gameId: this.$store.state.user.id
                    });

                    this.addUser(this.$store.state.user, 1);


                    this.$router.push({
                        name: 'Home',
                        params: {id: this.$store.state.user.id},
                        replace: true
                    }).catch(err => {
                    });
                    console.log('HOST');

                    p2p.createConnection();
                    p2p.onReceive("newUser", this.addUser.bind(this));

                } else {
                    console.log('PLAYER');
                    p2p.connect(this.$store.state.gameId)
                        .then(() => {
                            console.log('PLAYER', 'connected');
                            p2p.send('newUser', this.$store.state.user)
                        });
                    p2p.onReceive("updateUsers", this.onUpdateUsers.bind(this));
                    p2p.onReceive("updateCardsVisibility", this.onUpdateCardsVisibility.bind(this));
                }
            },
            openExitModal() {
                this.showExitModal = true;
            },
            closeModal() {
                this.showExitModal = false;
            },
            exit() {
                this.closeModal();

                this.$store.commit({
                    type: 'saveLoggedUser',
                    user: undefined
                });
                this.$store.state.gameId=undefined;
                this.$store.state.selectedCards=[];
                this.$store.state.users=[];
                this.$store.state.isHost=false;
                p2p.destroy();
                this.$router.push({name: 'Login'})
            },

            addUser(user, allowAdmin = false) {
                if (!allowAdmin) {
                    user.role = 0;
                }
                this.$store.state.users.push(user);
            },

            onUpdateUsers(users) {
                this.$store.state.users = users;
            },
            onUpdateCardsVisibility(visibility) {
                this.$store.state.areCardsVisible = visibility;
            },

            playAgain() {
                this.$store.state.selectedCards = [];
                this.$store.state.areCardsVisible = false;
                p2p.send('updateSelectedCards', this.$store.state.selectedCards);
                p2p.send('updateCardsVisibility', this.$store.state.areCardsVisible);
            },

            revealCards() {
                this.$store.state.areCardsVisible = true;
                p2p.send('updateCardsVisibility', this.$store.state.areCardsVisible);
            }
        },

        computed: {
            users() {
                return this.$store.state.users
            },
            selectedCards() {
                return this.$store.state.selectedCards
            }
        },
        watch: {
            users: {
                handler() {
                    if (this.$store.state.isHost && p2p.isConnected) {
                        p2p.send('updateUsers', this.$store.state.users);
                        p2p.send('updateSelectedCards', this.$store.state.selectedCards);
                    }
                },
                deep: true
            },
        }
    }
</script>

<style scoped lang="scss">
    .home {
        flex-grow: 1;
        width: 100vw;
        max-width: 1000px;
        max-height: calc(100vh - 80px);
        display: flex;
        flex-direction: column;

        .widgets-container {
            flex-grow: 1;
            display: flex;
            max-height: calc(100vh - 270px);
        }

        .admin-panel {
            display: flex;
            justify-content: center;

            button {
                margin: 0 10px;
            }
        }

        #x {
            margin: 20px;
            position: absolute;
            top: -10px;
            right: -10px;
        }
    }
</style>
