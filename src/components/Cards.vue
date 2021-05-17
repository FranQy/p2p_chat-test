<template>
    <div class="cards">
        <div class="card noselect" v-bind:class="{ 'selected': card.value === selectedCard.value }"
             v-for="card in cards"
             v-on:click="chooseCard(card)">
            {{ card.value }}
        </div>
    </div>
</template>

<script>
    import p2p from "../communication/p2p";

    export default {
        name: 'Cards',
        data: function () {
            return {
                cards: this.$store.state.cards,
            }
        },

        beforeMount() {
            if (this.$store.state.isHost) {
                p2p.onReceive('selectCard', this.selectCard.bind(this));
            }
            p2p.onReceive('updateSelectedCards', this.updateSelectedCards.bind(this));
        },

        methods: {
            chooseCard(selectedCard) {
                if(this.$store.state.areCardsVisible){
                    return
                }
                // if(selectedCard){
                //   return;
                // }

                const user = this.$store.state.user;
                for (let card of this.cards) {
                    if (card.value === selectedCard.value) {
                        this.selectCard({...card, userId: user.id, userName: user.username});
                    }
                }
            },

            selectCard(selectedCard) {
                let cards = this.$store.state.selectedCards;
                cards = cards.filter(card => card.userId !== selectedCard.userId);
                cards.push(selectedCard);
                this.$store.state.selectedCards = cards;

                if (this.$store.state.isHost) {
                    p2p.send('updateSelectedCards', this.$store.state.selectedCards)
                } else {
                    p2p.send("selectCard", selectedCard)
                }
            },

            updateSelectedCards(cards) {
                this.$store.state.selectedCards = cards;
            }
        },

        computed: {
            selectedCard() {
                const user = this.$store.state.user;
                return this.$store.state.selectedCards.find(card => card.userId === user.id) || {};
            }
        },
    }
</script>

<style scoped lang="scss">
    $card-height: 80;

    .cards {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100vw;
        height: #{$card-height * 1.9}px;

        .card {
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

            @media (max-width: 600px) {
                padding: 0 10px;
            }

            &:hover {
                cursor: pointer;
                border-color: #ffc532;
                color: #ffc532;
                box-shadow: 0 0 10px #ffc532;
            }

            &.selected {
                border-color: #27e40a;
                color: #27e40a;
                box-shadow: 0 0 10px #27e40a;
            }
        }

        $all-elements: 10;
        $max-rotation: 20;
        $step: $max-rotation / floor($all-elements / 2);

        @for $i from 1 through $all-elements {
            .card:nth-child(#{$i}) {
                z-index: #{1 + $i};

                $rotation: 0;
                $translateX: 0;
                $translateY: 5;

                @if $i <= floor($all-elements / 2) {
                    $rotation: -#{$max-rotation - ($i * $step) + $step};
                    $translateX: #{($max-rotation - ($i * $step) + $step) * 3};
                    $translateY: #{(($max-rotation - ($i * $step) + $step) * 2) + ((ceil($all-elements / 2) - $i) * (ceil($all-elements / 2) - $i))};
                }

                @if $i > ceil($all-elements / 2) {
                    $rotation: #{(($i - ((ceil($all-elements / 2) - 1) + (1 - ($all-elements % 2)))) * $step)};
                    $translateX: #{(($max-rotation - (($i + (1 - ($all-elements % 2))) * $step) + $step) * 3) + ((1 - ($all-elements % 2)) * 10)};
                    $translateY: #{(($max-rotation - (($i + (1 - ($all-elements % 2))) * $step) + $step) * -2) + ((ceil($all-elements / 2) - $i) * (ceil($all-elements / 2) - $i))};
                }

                transform: translate(#{$translateX}px, #{$translateY}px) rotate(
                                #{$rotation}deg);
            }
        }
    }
</style>
