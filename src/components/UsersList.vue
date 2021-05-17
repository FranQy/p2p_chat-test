<template>
  <div class="users-list">
    <div class="title">
      Users:
    </div>
    <div class="users">
      <div class="user" v-for="(user, key) in $store.state.users" v-bind:class="{ 'admin': user.role == usersRoles.admin }">
        <span class="lp">
          {{ (key + 1) }}.
        </span>
        <span class="icon-crown" v-if="user.role == usersRoles.admin">

        </span>
        <span class="username">
          {{ user.username }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersList',
  data: function () {
    return {
      usersRoles: {"admin": 1, "user": 2},
    }
  },
}
</script>

<style scoped lang="scss">
.users-list {
  overflow: hidden;
  flex-grow: 1;
  max-width: 200px;
  min-width: 150px;
  color: #2c3e50;
  font-size: 20px;
  margin: 20px;
  margin-left: 0;
  background-color: #fff;
  border: 2px solid #2c3e50;
  border-radius: 10px;
  text-align: left;

  .title {
    background: #2c3e50;
    color: white;
    padding: 0 20px;
    text-align: center;
  }

  .users {
    padding: 10px 15px;
    font-size: 16px;
    max-height: calc(100% - 50px);
    overflow: scroll;

    .user{
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &.admin{
        .username, .icon-crown {
          color: #ffc532;
        }
      }

      .username{
        font-weight: bold;
      }
    }
  }
}
</style>
