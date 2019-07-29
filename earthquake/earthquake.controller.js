const Earthquake = require('./earthquake.model.js');

//Create new Product

var request = require("request")

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// const data

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        
        if(!body.features) {
        
            return res.status(400).send({
                message: "Product content can not be empty"
            });
        }

        // console.log(body.features.length)
        
    
        for(var i = 0; i < body.features.length; i ++) {
            const earthquake = new Earthquake({
                type: body.features[i].type || "No product title", 
                properties: body.features[i].properties,
                geometry: body.features[i].geometry,
                id: body.features[i].id
            });
        
            
            earthquake.save()
            
        }
    }
})


exports.find100 = (req, res) => {
    Earthquake.find().limit(100)
    .then(earthquakes => {
        res.send(earthquakes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving earthquakes."
        });
    });
};


exports.findLatestMaxMag = (req, res) => {
    Earthquake.find({}).sort({'properties.time':-1, 'properties.mag':-1}).limit(10)
    .then(earthquakes => {
        res.send(earthquakes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving earthquakes."
        });
    });
};

exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const earthquake = new Earthquake({
        type: req.body.type,
        properties: req.body.properties,
        gemoetry: req.body.geometry,
        id: req.body.id
    });

    // Save Product in the database
    earthquake.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
};