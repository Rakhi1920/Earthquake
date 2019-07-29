module.exports = (app) => {
    const earthquake = require('./earthquake.controller.js');

    // Create a new earthquake
    app.post('/earthquake', earthquake.create);

    // Retrieve all Earthquakes
    app.get('/earthquake', earthquake.find100);

    app.get('/getLatest', earthquake.findLatestMaxMag);
    
}