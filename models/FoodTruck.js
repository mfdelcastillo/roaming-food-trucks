const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const axios = require('axios')

const foodTruckSchema = new Schema(
    {
        foodTruckName: String,
        description: String,
        img: String,
        phone: String,
        location: {
            locationName: String,
            street: String,
            city: String,
            state: String,
            zipCode: String,
            lat: String,
            lng: String,
            hours: [{
                day: [{
                    start: Number,
                    end: Number
                }]
            }]
        },
        cuisine: [{
            type: String,
            enum: [
                "american", "chinese", "japanese", "mediteranean", "thai", "indian", "filipino", "french", "haitian", "cuban", "tex-mex", "vietnamese", "mexican", "korean", "soul food", "polish", "ethiopian", "greek", "asian-fusion", "nigerian"
            ]
        }],
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }],
        currentRating: Number,
        priceRating: Number,
        menu: {
            apps: [{
                dishName: String,
                description: String,
                price: Number
            }],
            entrees: [{
                dishName: String,
                description: String,
                price: Number
            }],
            sides: [{
                dishName: String,
                description: String,
                price: Number
            }],
            drinks: [{
                dishName: String,
                description: String,
                price: Number
            }],
            desserts: [{
                dishName: String,
                description: String,
                price: Number
            }]
        }
    }
);

foodTruckSchema.pre('save', async function (next) {
    if (this.reviews.length > 0) {
        await this.populate('reviews')
        let aggregateRating = this.reviews.reduce((acc, review) => acc + parseInt(review.rating), 0)
        this.currentRating = aggregateRating
    }
    if (this.isModified("location")) {
        const locationStringToSearch = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.MAPS_KEY}&address=${this.location.street}%20${this.location.city}%20${this.location.state}%20${this.location.zipCode}%20USA`.replaceAll(" ", '%20')
        console.log(locationStringToSearch)
        const geoLocation = await axios.get(locationStringToSearch)
        console.log(geoLocation.data.results.geometry)
        this.location.lat = geoLocation.data.results[0].geometry.location.lat
        this.location.lng = geoLocation.data.results[0].geometry.location.lng
    }
    return next();
});

const FoodTruck = mongoose.model('FoodTruck', foodTruckSchema);

module.exports = FoodTruck;