<template>
  <div class="logo">
    <span class="planning">
      planning
    </span>
    <span class="poker">
      poker
    </span>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
.logo {
  text-transform: uppercase;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

  .planning {
    font-size: 22px;
  }

  .poker {
    font-size: 41px;
    font-weight: bold;
  }
}
</style>
