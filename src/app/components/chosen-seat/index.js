class ChosenSeatController {
    constructor(CheckinService) {
        this.checkinService = CheckinService;
        this.seat = this.checkinService.chosenSeat;

        this.checkinService.subscribe('chosen seat',
            () => this.seat = this.checkinService.chosenSeat);
    }

    bookSeat() {
        this.checkinService
            .bookSeat(this.seat)
            .then(() => this.booked = true);
    }
}

angular.module('app').component('chosenSeat', {
    templateUrl: 'app/components/chosen-seat/template.html',
    controller: ChosenSeatController
});
