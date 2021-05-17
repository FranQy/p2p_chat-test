<template>
  <div class="not-found">
    <div>
      <div class="line"></div>
      <img src="../assets/minionek_ubranie.png" class="trousers">
    </div>
    <div class="element_404">
      <span>4</span>
      <img src="../assets/minionek.png" class="minionek">
      <span>4</span>
    </div>
    <p>
      <button v-on:click="goHome">Go home</button>
    </p>
  </div>
</template>

<script>

export default {
  name: 'NotFound',
  methods: {
    goHome() {
      this.$router.replace("/");
    }
  }
}

</script>

<style scoped lang="scss">

.not-found {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 150px);

  .line {
    height: 1px;
    background: black;
    width: 100vw;
  }

  .trousers {
    width: 50px;
  }

  .element_404 {
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 100px;
    font-weight: bold;

    .minionek {
      height: 108px;
      width: auto;
    }
  }
}

</style>
