<template>
    <div class="home">
        <header class="home__header">
            <user-info/>
        </header>
        <div class="home__content">
            <users-list/>
            <chat/>
        </div>
    </div>
</template>

<script>
    import UsersList from '@/components/UsersList.vue'
    import p2p from "../communication/p2p";
    import UserInfo from "../components/UserInfo";
    import Chat from "../components/Chat";

    export default {
        name: 'Home',
        components: {
            Chat,
            UserInfo,
            UsersList
        },
        data: function () {
            return {
                showExitModal: false,
            }
        },

        beforeMount() {
            if (!this.$store.state.user) {
                this.$router.push({name: 'Login'}).catch(err => {
                });
                return;
            }


            console.log('userId', this.$store.state.user.id);

            p2p.init(this.$store.state.user.id).then(this.initChat.bind(this))


        },
        methods: {
            initChat() {
                p2p.createConnection(this.$store.state.user.id);
            },
        },

        computed: {},
    }
</script>

<style scoped lang="scss">
    .home {
        flex-grow: 1;
        width: 100vw;
        max-width: 1000px;
        height: calc(100% - 60px);
        display: flex;
        flex-direction: column;

        &__content {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            flex-grow: 1;
            height: calc(100% - 122px);
        }


    }
</style>
