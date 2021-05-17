export default class CardsRepository {
    selectCard(selectedCard){
        let cards = this.$store.state.selectedCards;
        const user = this.$store.state.user;
        cards = cards.filter(card => card.userId !== user.id);
        cards.push(selectedCard);
        this.$store.state.selectedCards = cards;
    }
}
