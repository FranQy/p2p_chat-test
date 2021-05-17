<template>
    <div class="logo">
        <span class="logo__pre">JE</span>
        <span class="logo__main">CHAT</span>
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
        user-select: none;


        &__pre {
            font-size: 28px;
        }

        &__main {
            font-size: 41px;
            font-weight: bold;
        }
    }
</style>
