import express from 'express';

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

app.get('/cat/:breed', (req, res) => {
    console.log(req.params.breed.substring(1));

    for (const breed in cats) {
        if (breed === req.params.breed) {
            console.log(`The temperament of this breed is ${cats[breed].temperament}`);
            res.send(`The temperament of this breed is ${cats[breed].temperament}`);
        }   
    }
});

app.listen(port, () => {
    console.log(`My cat app is listening on port ${port}`);
});
