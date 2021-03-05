var customers = require('./customers.json')
var orders = require('./orders.json')
var details = require('./orderDetails.json')

var writeResponse = function (res, str) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(str);
}
var writeJsonResponse = function (res, str) {
    writeResponse(res, JSON.stringify(str));
}

apis = "Version 1.1\n/getcustomerbycustomerid/nnn\n/getcustomers\n/getorders\n/getordersbycustomerid/nnn\n/getorderdetailsbyorderid/nnn"
var writeHelp = function (res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(apis);
}

var notFound = function (res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("The data you have requested could not be found");
}

const server = require('http').createServer();

server.on('request', (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    var urlParts = req.url.toLowerCase().split('/');
    var command = urlParts[1];
    var id = urlParts[2];

    if (command == 'getcustomerbycustomerid') {
        var cus = customers.filter(c => c.CustomerID.toLowerCase() == id);
        if(cus.length !=0)
            writeJsonResponse(res, cus[0]);
        else
            notFound(res);
    }
    else if (command == 'getcustomers') {
        writeJsonResponse(res, customers);
    }
    else if (command == 'getordersbycustomerid') {
        var ords = orders.filter(o => o.CustomerID.toLowerCase() == id);
        writeJsonResponse(res, ords);
    }
    else if (command == 'getorders') {
        writeJsonResponse(res, orders);
    }
    else if (command == 'getorderdetailsbyorderid') {
        var data = details.filter(o => o.OrderID == id);
        writeJsonResponse(res, data);
    }
    else if (command == 'getorderdetails') {
        writeJsonResponse(res, details);
    }
    else {
        writeHelp(res);
    }
});

let port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server is serving now on port ${port}!\n` + apis));
