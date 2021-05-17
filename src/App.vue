<template>
  <div id="app">
    <logo></logo>
    <router-view/>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  name: 'App',
  components: {
    Logo
  },
  beforeMount(){
    this.$store.state.isHost = !this.$route.params.id;
    this.$store.state.gameId = this.$route.params.id;

    try {
      this.$store.state.user = JSON.parse(localStorage.getItem('user')) || this.$store.state.user;
      this.$store.state.user.role=0;
    }catch (e) {
      localStorage.removeItem('user')
    }

    if(localStorage.getItem(this.$store.state.gameId)){
      this.$store.state.isHost = true;
      this.$store.state.user.role=1;
    }


    if(!this.$store.state.user.id){
      this.$router.push({ name: 'Login', params: { id:  this.$route.params.id }}).catch(err => {});
    }
    // else{
    //   this.$router.push({ name: 'Home', params: { id:  this.$route.params.id }}).catch(err => {});
    // }
  }
}
</script>

<style lang="scss">
body{
  overflow: hidden;
  max-width: 100vw;
  max-height: 100vh;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 40px);
  max-height: calc(100vh - 40px);
}

label{
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: auto;
  margin-bottom: 2px;
}

input, button{
  background: transparent;
  color: #2c3e50;
  border: 2px solid #2c3e50;
  padding: 5px 10px;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-block;
  margin: 2.5px 0;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

button{
  letter-spacing: 2px;
}

.noselect, button {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

button:hover{
  background-color: #2c3e50;
  color: white;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input-wrapper{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin: 5px 0;

  &.error{
    color: red;

    input{
      border-color: red;
    }

    .error-message{
      display: block;
    }
  }

  .error-message{
    text-align: left;
    display: none;
  }
}
</style>
