const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require ('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect ('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i=0; i<50; i++) {
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() *20)+10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas modi consequuntur animi dolore. Ratione, unde. Earum aliquid dolores facere architecto voluptates maxime cupiditate, odio quibusdam, aspernatur iusto nostrum totam accusamus.',
            price
        })
        await camp.save();
    }
}

seedDb().then ( () => {
    mongoose.connection.close();
})