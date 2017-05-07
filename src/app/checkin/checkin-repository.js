var Seat = require('./seat');

class CheckinRepository {
    constructor($http) {
        this.$http = $http;
    }

    getSeats() {
        return this.$http
            .get('http://localhost:8000/seats')
            .then(res => res.data.map(s => new Seat(s)));
    }

    bookSeat(seat) {
        return this.$http
            .post('http://localhost:8000/booking', {number: seat.number})
            .then(res => {
            return true;
        });
    }
}

angular.module('app').service('CheckinRepository', CheckinRepository);
