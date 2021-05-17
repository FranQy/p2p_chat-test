<template>
    <div class="users-list">
        <div class="title">
            Friends:
        </div>
        <div class="users">
            <div class="user" v-for="(user, key) in $store.state.friends" @click="openChat(user.id)"
                 :class="{'user--active':isActiveUser(user.id)}">
        <span class="username">
          {{ user.name }}
        </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UsersList',
        data: function () {
            return {}
        },
        methods: {
            openChat(id) {
                this.$store.state.chatId = id
            },
            isActiveUser(id) {
                return id === this.$store.state.chatId
            }
        }
    }
</script>

<style scoped lang="scss">
    .users-list {
        overflow: hidden;
        flex-grow: 1;
        width: 300px;
        color: #2c3e50;
        font-size: 20px;
        border: 1px solid #2c3e50;
        border-right: none;

        .title {
            background: #2c3e50;
            color: white;
            padding: 0 20px;
            text-align: center;
        }

        .users {
            font-size: 16px;
            max-height: calc(100% - 50px);
            overflow: auto;
            margin-top: -1px;

            .user {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                border-top: 1px solid #2c3e50;
                padding: 10px 0;
                margin: 0 15px;
                cursor: pointer;
                text-align: left;

                &--active {
                    font-weight: bold;
                }
            }
        }
    }
</style>
