const axios = require("axios");
const PROPERTY = require("../models/Property")

class Property {
     /**
     * Gets the property data that is saved in our MongoDb
     * returns all results
     *
     */
    getPropertyDataFromMongo = async () => {
        return PROPERTY.find({});
    }
}

module.exports = Property;