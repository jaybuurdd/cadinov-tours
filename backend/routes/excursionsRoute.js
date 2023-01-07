const express = require("express");
const router = express.Router();

// Import the ObjectId class from the MongoDB library
const { ObjectId } = require('mongodb');
const Excursion = require('../models/excursion')

router.get("/getallexcursions", async(req, res) => {

  console.log('Api running...')
    try {

        const excursions = await Excursion.find({})
        return res.send(excursions)

    } catch (error) {

        return res.status(400).json({ message: error });
        
    }

});

router.post("/getexcursionbyid", async(req, res) => {


    const excursionid = req.body.excursionid
    try {

        const excursion = await Excursion.findOne({_id : excursionid})
        return res.send(excursion)

    } catch (error) {

        return res.status(400).json({ message: error });
        
    }

});

// router.get("/getallexcursions", async(req, res) => {

//     console.log(req.body);
//     try {
//          const excursions = await Excursion.find({})
//          res.send(excursions)
//     } catch (error) {
//          return res.status(400).json({ message: error });
//     }
// });

router.post("/addexcursion", async(req, res) => {

 const { excursion , 
    imgurl1 ,imgurl2 ,imgurl3, price, type,  
    maxcount ,size, duration,description} = req.body

const newexcursion = new Excursion ({
    name : excursion,
    imageurls:[imgurl1, imgurl2, imgurl3],
    price,
    type,
    maxcount,
    size,
    duration,
    description
    
    
  })

    try {
        
        const newexcursion = new Excursion(req.body)
        await newexcursion.save()
        
        res.send('New Excursion Added Successfully')
    } catch (error) {
         return res.status(400).json({ error });
    }
});


// Delete an excursion by ID
router.delete('/:id', (req, res) => {

    // Get the excursion ID from the request
    const excursionId = req.params.id;
    const objectId = new ObjectId(excursionId);
    const stringId = objectId.toString();
  
    // Delete the excursion from the database
    Excursion.deleteOne({ _id: stringId }, (err) => {
      if (err) {
        // Handle error
        res.status(500).send({ success: false, error: err.message });
      } else {
        // Handle success
        res.send({ success: true });
      }
    });
  });
  


module.exports = router;