<template>
  <div class="modal" v-if="$props.show">
    <div class="modal-content">
      <div class="top-bar">
        <div class="title">
          {{ $props.title }}
        </div>
        <span class="close" v-on:click="close">&times;</span>
      </div>

      <p> {{ $props.message }}</p>
      <div class="actions">
        <button v-for="actionButton in $props.actions" v-on:click="actionButton.onclick()">
          {{actionButton.title}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: true,
    title: String,
    message: String,
    onClose: Function,
    actions: Array
  },
  methods: {
    close() {
      this.$props.onClose();
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  display: block;
  position: fixed;
  z-index: 100;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: #2c3e50;
    color: white;
    padding: 7px 30px 7px 15px;

    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .close {
      top: 0;
      right: 0;
      margin: 0 10px;
      padding: 0;
      position: fixed;
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;

      &:hover, &:focus {
        color: white;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }

  /* Modal Content */
  .modal-content {
    background-color: #fefefe;
    margin: auto;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .actions{
      display: flex;
      justify-content: flex-end;

      button{
        margin: 10px 10px 10px 0px;
      }
    }
  }
}
</style>
