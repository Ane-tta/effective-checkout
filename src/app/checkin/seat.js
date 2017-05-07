module.exports = class Seat {
    constructor(seat) {
        this.id = seat.id;
        this.available = seat.available;
        this.number = seat.number;
        this.price = seat.price;
        this.userId = seat.userId;
    }
}
