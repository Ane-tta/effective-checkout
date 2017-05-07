var fs = require('fs');

var seats = new Array(120).
    join(' ').
    split(' ').
    map((item, index) => index).
    map(i => {
        var number = Math.ceil((i + 1) / 6);
        var subNumber = 'ABCDEF'[i % 6];
        var additionalPrice = [10, 5, 0, 0, 5, 10][i % 6];
        var available = Math.random() < 0.3;
        var userId = null;

        var price = 10 + (Math.ceil((20 - number) / 6) * 5) + additionalPrice;

        if (!available)
            userId = Math.floor(Math.random() * 10000000).toString(16);

        return {
            id: i,
            userId: userId,
            available: available,
            number: `${number}${subNumber}`,
            price: price
        };
    });

fs.writeFileSync('./seats.json', JSON.stringify(seats));
