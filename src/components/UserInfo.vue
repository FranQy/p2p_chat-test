<template>
    <div class="user-info">
        <div class="title">
            <h2 class="title__text">
                Your ID: {{$store.state.user.id}}
            </h2>
            <span class="title__hint">Send this id to your friend, so he/she can add you</span>
        </div>
        <form class="action" @submit.prevent="addFriend">
            <div class="action__input" v-bind:class="{ 'action__input--error': errorId }">
                <input placeholder="Friend ID" v-model="friendId">
                <div class="error-message">
                    {{errorId}}
                </div>
            </div>
            <div class="action__input" v-bind:class="{ 'action__input--error': errorName }">
                <input placeholder="Friend name" v-model="friendName">
                <div class="error-message">
                    {{errorName}}
                </div>
            </div>
            <button class="action__button" @click.prevent="addFriend">
                Add friend
            </button>
        </form>
    </div>
</template>

<script>
    import p2p from "../communication/p2p";

    export default {
        name: 'UserInfo',
        data: function () {
            return {
                friendId: null,
                friendName: null,
                errorId: null,
                errorName: null,
            }
        },

      created(){
        p2p.onReceive('addFriend',(id,data)=>{
          this.$store.commit({
            type: 'addFriend',
            friend: {
              name: data.username,
              id: data.id
            }
          });
        })
      },
        methods: {
            addFriend() {
                if (!this.friendId) {
                    this.errorId = "ID can't be empty"
                }
                if (!this.friendName) {
                    this.errorName = "Name can't be empty"
                }

                if (!this.friendId || !this.friendName) {
                    return
                }

                this.errorId = this.errorName = null;

                p2p.connect(this.friendId)
                    .then(() => {
                      p2p.send(this.friendId, 'addFriend', this.$store.state.user);
                        this.$store.commit({
                            type: 'addFriend',
                            friend: {
                                name: this.friendName,
                                id: this.friendId
                            }
                        });
                      this.friendName= this.friendId = null;
                    })
                    .catch(() => {
                        this.errorId = "Can't find this ID"
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .user-info {
        width: 100%;
        border: 1px solid #2c3e50;
      border-bottom: none;
      box-sizing: border-box;


        .title {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            padding: 10px;

            &__text {
                font-size: 18px;
                display: block;
                margin: 0;
            }

            &__hint {
                display: block;
            }
        }


        .action {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 10px;

            &__input {
                width: 40%;
                margin: 0 10px;
                text-align: left;

                input {
                    width: 100%;
                    box-sizing: border-box;
                }

              &--error{
                color: red;
                input {
                  border-color: red;
                }
              }
            }

        }
    }
</style>
