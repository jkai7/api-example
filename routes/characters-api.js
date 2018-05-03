const express = require('express');
const router  = express.Router();
const Character = require('../models/character-schema');//==require character schema


//==route will be /api/characters - see app.js for details
router.get('/characters', (req, res, next) => {
 //==find all characters same as .find({}) or .find({name: 'han solo'})--cont.
 //==find all characters with the same name 
  Character.find() //==find all characters
  .then((theList) => {//=='theList' can be whatever name you'd like to give
      //console.log(theList)==logs in the terminal
      res.json(theList)
  })
  .catch((err) =>{
    console.log(err)
    next(err)
  })
});//==END characters route

//=========================================================

//==Character id route = /api/characters/'characters id'(because params)
router.get('/characters/:id', (req, res, next) => {

Character.findById(req.params.id)
    .then((theCharacter) => {
        res.json(theCharacter)
    })
    .catch((err) =>{
        console.log(err)
        next(err)
    })

})//==END character ID route

//==========================================================

//==new character route
router.post('/characters/create', (req, res, next) => {

//Character.create(req.body);
//==same as above if name is just name and not theName
Character.create({
//==left side is Schema names
    name: req.body.theName,//==must match name from charInfo in script.js
    occupation: req.body.theOccupation,
    weapon: req.body.theWeapon,
    cartoon: req.body.theCartoon
})
.then((theCharacter) => {
    res.json(theCharacter)
})
.catch((err) => {
    next(err);
})

})//==END new character route


//===========================================================


//==BEGIN edit character route
                            //==req.params
router.post('/characters/update/:id', (req, res, next) => {
                                //==has to match end :route
    Character.findByIdAndUpdate(req.params.id, req.body)
        .then((updatedCharacter) => {
            res.json(updatedCharacter)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})//==END edit character route







module.exports = router;