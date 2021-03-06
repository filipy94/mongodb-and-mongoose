require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const {Schema} = mongoose;
const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var jimHalpert = new Person({
    name: "Jim Halpert",
    age: 27,
    favoriteFoods: ["jelly", "soda"]
  });
  jimHalpert.save((err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Pam Beesly", age: 26, favoriteFoods: ["yogurt", "soda", "chicken"]},
  {name: "Dwight Schrute", age: 27, favoriteFoods: ["deer ham", "beets"]},
  {name: "Michael Scott", age: 42, favoriteFoods: ["chocolate", "pretzel", "chicken wings"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if(err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if(err) return console.error(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if(err) return console.error(err);
    done(null, foodFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, idFound) => {
    if(err) return console.error(err);
    done(null, idFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
    if(err) return console.error(err);
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if(err) return console.error(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/); 
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, data) => {
      if(err) return console.error(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
