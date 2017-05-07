module.exports = class EventEmitter {
    constructor() {
        this._events = {};
    }

    subscribe(event, fct) {
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
    }

    unsubscribe(event, fct) {
        if (event in this._events === false) {
            return;
        }
        this._events[event].splice(this._events[event].indexOf(fct), 1);
    }

    publish(event, ...args) {
        if (event in this._events === false) {
            return;
        }

        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, args);
        }
    }
}
