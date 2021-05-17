<template>
    <div class="poker-table">
        <div class="title">
            Poker table
        </div>
        <div class="users-cards" v-if="$store.state.selectedCards.length">
            <div class="card" v-for="userPick of $store.state.selectedCards">
                <div class="value">
                    <template v-if="$store.state.areCardsVisible">
                        {{ userPick.value }}
                    </template>
                </div>
                <p>{{ userPick.userName }}</p>
            </div>
        </div>

        <div class="info" v-if="!$store.state.selectedCards.length">
            Nobody has picked a card yet!
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PokerTable',
    }
</script>

<style scoped lang="scss">
    $card-height: 80;

    .poker-table {
        overflow: hidden;
        flex-grow: 1;
        color: #2c3e50;
        font-size: 20px;
        margin: 20px;
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

        .users-cards {
            display: flex;
            flex-flow: row wrap;
            padding: 10px 15px;
            max-height: calc(100% - 50px);
            overflow: scroll;

            .card {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 6px 10px;
                font-size: 16px;

                .value {
                    color: #2c3e50;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 25px;
                    margin: 10px 5px 0;
                    width: 50px;
                    height: #{$card-height}px;
                    background-color: #fff;
                    border: 2px solid #2c3e50;
                    border-radius: 10px;
                    box-sizing: content-box;
                    transition: all .1s;

                }

                p {
                    margin: 0;
                    max-width: 120px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }

        .info {
            height: 100%;
            max-height: calc(100% - 50px);
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
