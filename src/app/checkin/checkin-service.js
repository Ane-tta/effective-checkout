var EventEmitter = require('../../lib/event-emitter');

class CheckinService extends EventEmitter {
    constructor(CheckinRepository) {
        super();

        angular.extend(this, new EventEmitter());
        this.checkinRepository = CheckinRepository;

        this.seats = [];
        this.wasBooked = 0;
        this.user = null;
    }
    
    getUserInfo(user){
        this.user = user;
    }

    getSeats() {
        return this.checkinRepository
            .getSeats()
            .then(seats => {
                this.seats = seats;
                this.publish('seats');

                return this.seats;
            });
    }

    chooseSeat(seat) {
        if(this.user.balance < seat.price){
            return;
        }
        if(!this.wasBooked){
            this.chosenSeat = seat;
            this.publish('chosen seat');
        }
    }

    bookSeat(seat) {
        if(!this.wasBooked){
            var reply = confirm('Do you really want to book this seat?');
            if(reply) {
                this.wasBooked++;
                var tt = this.user.balance - seat.price;
                this.user.balance = tt;
                return this.checkinRepository
                    .bookSeat(seat)
                    .then(this.getSeats.bind(this));
            } else {
                return null;
            }
        }
    }
}

angular.module('app').service('CheckinService', CheckinService);