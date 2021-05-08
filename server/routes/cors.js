const cors = require('cors');

const whitelist = [
    'http://localhost:8081',
    'http://localhost:3000',
    'http://www.home-cook-recipes.com',
    'https://www.home-cook-recipes.com',
    'http://50.18.30.115'
];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;

    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);