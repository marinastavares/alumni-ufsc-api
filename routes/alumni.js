var express = require('express');
var Alumni = require('../models/alumni');
var router = express.Router();

router.get('/', function(req, res){
    console.log('getting all alumni');
    Alumni.find({}).exec(function(err, alumni){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(alumni);
            res.json(alumni);
        }
    });
});

router.get('/:id', function(req, res){
    console.log('getting one alumni');
    Alumni.findOne({
        _id: req.params.id
    }).exec(function(err, alumni){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(alumni);
            res.json(alumni);
        }
    });
});

router.post('/', function(req, res){
    var newAlumni = new Alumni();
    newAlumni.full_name = req.body.full_name;
    newAlumni.start_by = req.body.start_by;
    newAlumni.end_by = req.body.end_by;
    newAlumni.linkedin = req.body.linkedin;
    newAlumni.country = req.body.country;
    newAlumni.position = req.body.position;
    newAlumni.company = req.body.company;
    newAlumni.ufsc = req.body.ufsc;
    newAlumni.save(function(err, alumni){
        if(err) {
            res.send('error saving alumni');
        } else {
            console.log(alumni);
            res.send(alumni);
        }
    });
});

router.put('/:id', function(req, res){
    Alumni.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category
        }
    },{
        upsert: true
    },function(err, newAlumni){
        if(err) {
            res.send('error updating alumni');
        } else {
            console.log(newAlumni);
            res.send(newAlumni);
        }
    });
});

router.delete('/:id', function(req, res){
    Alumni.findByIdAndRemove({
        _id: req.params.id
    },function(err, alumni){
        if(err) {
            res.send('error deleting alumni');
        } else {
            console.log(alumni);
            res.send(alumni);
        }
    });
});

module.exports = router;
