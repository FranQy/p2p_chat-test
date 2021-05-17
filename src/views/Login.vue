<template>
  <div class="login">
    <div class="input-wrapper" v-bind:class="{ 'error': usernameError }">
      <label for="name">
        User name:
      </label>
      <input id="name" placeholder="User name" v-model="username">
      <div class="error-message">
        {{usernameError}}
      </div>
    </div>

    <button type="button" class="submit-btn" v-on:click="login">
      Create game
    </button>
  </div>
</template>

<script>

import p2p from "../communication/p2p";

export default {
  name: 'Login',
  components: {},
  data: function () {
    return {
      username: "",
      usernameError: ""
    }
  },
  methods:{
    login(){
      if(this.username){
        this.$store.state.isHost =  this.$store.state.isHost || !this.$route.params.id;

        p2p.init().then(userId=>{
          this.$store.commit({
            type: 'saveLoggedUser',
            user: {
              username: this.username,
              role: this.$store.state.isHost ? 1 : 0,
              id: userId
            }
          });

          this.$router.push({ name: 'Home', params: { id:  this.$route.params.id }});
        });

      }else{
        this.usernameError = "Username can not be empty!";
      }
    }
  },
  beforeMount() {
    this.$store.commit({
      type: 'saveLoggedUser',
      user: undefined
    });
  }
}
</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 15px 5px #0000006e;
  margin-top: 20px;
  padding: 20px;
  width: calc(100% - 40px);
  max-width: 600px;

  .submit-btn {
    margin-top: 20px;
    width: 200px;
    margin-left: auto;
  }
}
</style>
