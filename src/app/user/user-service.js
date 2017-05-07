var EventEmitter = require('../../lib/event-emitter');

class UserService extends EventEmitter {
    constructor(UserRepository) {
        super();

        angular.extend(this, new EventEmitter());
        this.userRepository = UserRepository;

        this.user = null;
    }

    getUser() {
        return this.userRepository
            .getUser()
            .then(user => this.user = user);
    }
}

angular.module('app').service('UserService', UserService);
