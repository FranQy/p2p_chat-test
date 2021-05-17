<template>
    <form class="chat" @submit.prevent="sendMessage">
        <h2 class="chat__name" v-if="chatId">{{chatName}}</h2>
        <div class="chat__messages" v-if="chatId" ref="messages">
            <div class="chat__message" v-for="message in chatMessages"
                 :class="{'chat__message--my': isMe(message.userId)}">
                <span class="chat__message__username"
                      v-if="!isMe(message.userId)">{{getUsername(message.userId)}}</span>
                <p class="chat__message__content">
                    {{message.content}}
                </p>
            </div>
        </div>
        <div class="chat__input" v-if="chatId">
            <div class="chat__input__container">
                <input type="text" v-model="currentMessage"/>
                <button>submit</button>
            </div>
            <div class="chat__input__error">
                {{error}}
            </div>
        </div>
    </form>
</template>

<script>
    import p2p from "../communication/p2p";

    export default {
        name: 'Chat',
        data: function () {
            return {
                currentMessage: '',
                error: null,
            }
        },

        created() {
            p2p.onReceive('message', (id, data) => {
                this.$store.commit({
                    type: 'addMessage',
                    message: {
                        content: data.content,
                        userId: data.userId
                    },
                    chatId: data.userId
                });
            })
        },
        computed: {
            chatId() {
                return this.$store.state.chatId
            },

            chatName() {
                return (this.$store.state.friends.find(user => user.id === this.chatId) || {}).name
            },

            chatMessages() {
                console.log('messages updated')

                return this.$store.state.history[this.chatId] || [];
            },
        },
        methods: {
            sendMessage() {
                if (!this.currentMessage) {
                    return;
                }
                this.error = null;

                const message = {
                    content: this.currentMessage,
                    userId: this.$store.state.user.id
                };

                p2p.connect(this.chatId)
                    .then(() => {
                        p2p.send(this.chatId, 'message', message);
                        this.$store.commit({
                            type: 'addMessage',
                            message: message,
                            chatId: this.chatId
                        });
                        this.currentMessage = null;
                    })
                    .catch(() => {
                        this.error = "Can't send message."
                    })
            },

            getUsername(id) {
                return this.$store.state.friends.find(user => user.id === id).name
            },

            isMe(id) {
                return this.$store.state.user.id === id;
            }
        },

        watch: {
            chatMessages() {
                this.$nextTick(() => {
                    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
                })
            },

            chatId() {
                this.currentMessage = ''
                this.error = null
            }
        }
    }
</script>

<style scoped lang="scss">
    .chat {
        width: 100%;
        border: 1px solid #2c3e50;
        display: flex;
        flex-flow: column;
        align-items: stretch;

        &__name {
            width: 100%;
            padding: 15px;
            margin: 0;
            border-bottom: 1px solid #2c3e50;
            box-sizing: border-box;
        }

        &__messages {
            flex-grow: 1;
            overflow: auto;
            display: flex;
            flex-flow: column;
            padding: 8px 0;
        }

        &__message {
            margin: 8px 15px;
            width: 55%;
            min-width: 300px;
            max-width: 100%;
            box-sizing: border-box;
            background: aquamarine;
            border-radius: 10px;
            padding: 10px 15px;
            text-align: left;

            &--my {
                align-self: flex-end;
                background: gainsboro;
            }

            &__username {
                display: block;
                font-weight: bold;
                font-size: 12px;
            }

            &__content {
                margin: 0;
                padding: 0;
            }
        }

        &__input {
            width: 100%;
            padding: 15px;
            border-top: 1px solid #2c3e50;
            box-sizing: border-box;

            &__container {
                display: flex;
                align-items: flex-start;

                input {
                    flex-grow: 1;
                }

                button {
                    margin-left: -1px;
                }
            }

            &__error {
                display: block;
                text-align: left;
                margin-top: 5px;
            }
        }

    }
</style>
