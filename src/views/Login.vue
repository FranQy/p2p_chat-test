<template>
  <form class="login" @submit.prevent="login">
    <div class="input-wrapper" v-bind:class="{ 'error': usernameError }">
      <label for="name">
        User name:
      </label>
      <input id="name" placeholder="User name" v-model="username">
      <div class="error-message">
        {{usernameError}}
      </div>
    </div>

    <button type="button" class="submit-btn" @click.prevent="login">
      Join
    </button>
  </form>
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
        p2p.init().then(userId=>{
          this.$store.commit({
            type: 'saveCurrentUser',
            user: {
              username: this.username,
              id: userId
            }
          });

          this.$router.push({ name: 'Home'});
        });

      }else{
        this.usernameError = "Username can not be empty!";
      }
    }
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
