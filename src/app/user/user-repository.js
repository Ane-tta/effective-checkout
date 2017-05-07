var User = require('./user');

class UserRepository {
    constructor($http) {
        this.$http = $http;
    }

    getUser() {
        return this.$http
            .get('http://localhost:8000/user')
            .then(res => new User(res.data));
    }
}

angular.module('app').service('UserRepository', UserRepository);
