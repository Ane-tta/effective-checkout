var restify = require('restify');
var fs = require('fs');

loadSeats();

function loadSeats() {
    var seatsJSON = fs.readFileSync('./seats.json', 'utf8');

    seats = JSON.parse(seatsJSON);
}

function getSeats(req, res) {
    loadSeats();
    res.send(seats);
}

function saveSeats() {
    fs.writeFileSync('./seats.json', JSON.stringify(seats));
}

function bookSeat(req, res) {
    var seat = seats.find(s => s.number == req.body.number);
    if (!seat.available) return res.send(400, 'Seat is already booked');

    seat.available = false;

    saveSeats();

    res.send(200);
}

function getUser(req, res) {
    res.send({
        id: Math.floor(Math.random() * 10000000).toString(16),
        balance: Math.floor(Math.random() * 30)
    });
}

var server = restify.createServer();

server.use(restify.CORS());
server.use(restify.bodyParser());

server.get('/user', getUser);
server.get('/seats', getSeats);
server.post('/booking', bookSeat);

server.listen(8000, () => {
    console.log('%s listening at %s', server.name, server.url);
});
