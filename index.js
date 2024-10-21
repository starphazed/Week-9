import express from 'express';

import fetch from 'node-fetch'
const app = express();
const port = process.env.PORT || 3001;

const cats = {
    persian: {
        temperament: "calm"
    },
    siamese: {
        temperament: "playful"
    },
    mainecoon: {
        temperament: "affectionate"
    },
    bengal: {
        temperament: "active"
    }
};

// Route to get cats based on temperament
app.get('/', (req, res) => {
    const requestedTemperament = req.query.temperament;
    const matchingCats = [];

    for (const breed in cats) {
        if (cats[breed].temperament === requestedTemperament) {
            matchingCats.push(breed);
        }
    }

    console.log(matchingCats);
    res.send(matchingCats);
});

// Route to get information about a specific cat breed using substring
app.get('/cat/:breed', (req, res) => {
    console.log(req.params.breed.substring(1));

    for (const breed in cats) {
        if (breed === req.params.breed.substring(1)) {
            console.log(`The temperament of this breed is ${cats[breed].temperament}`);
            res.send(`The temperament of this breed is ${cats[breed].temperament}`);
            return; // Exit after sending the response to avoid sending multiple responses
        }   
    }

    // If no match is found, send a default response
    res.send(`Sorry, we don't have information about the breed ${req.params.breed.substring(1)}.`);
});

app.listen(port, () => {
    console.log(`My cat app is listening on port ${port}`);
});
