const express = require('express');
const router = express.Router();
const Joi =  require('joi');
const CourseModel = require('../models/course');
const objectID = require('mongodb').ObjectID;
const debug = require('debug')('app:api');
// // get all courses
router.get('/', async (req, res) => {
    debug(req.method);
    try {
       let courses = await CourseModel.find();
       res.send(courses);
    }catch(err) {
        res.status(500).send(err.message);
    }
    res.send(); 
 });

// get course by id
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    if (!objectID.isValid(id)) return res.status(400).send('course Id is not valid');
    try {
        let course = await CourseModel.findById(id);
        if (! course) return res.status(404).send('please provide a valid course id');
        res.send(course); 
    }catch(err) {
        res.status(500).send(err.message);
    }
});
// create a course
router.post('/', (req, res)=> {
    let {error} = validateCourse(req.body);
    if (error)  return res.status(400).send(error.details[0].message);
    let {name, author, category, tags, status } = req.body;
    let newCourse = new CourseModel({
        name,
        author,
        category, 
        tags, 
        status
    });
    newCourse.save(function (err, course) {
        if (err) return console.error(err);
        res.status(201).send(course);
      });
}); 
// //  update a course by id
router.put('/:id', (req, res)=> {
    let id = req.params.id;
    if (!objectID.isValid(id)) return res.status(400).send('course Id is not valid');
    req.body.isUpdate = true;
    let {error} = validateCourse(req.body);
    if (error)  return res.status(400).send(error.details[0].message);
     // Find note and update it with the request body
    CourseModel.findByIdAndUpdate(id, {$set: req.body}, {new: true})
    .then(course => {
        if(!course) {
            return res.status(404).send(`Note not found with id: ${id}`);
        }
        res.send(course);
    }).catch(err => {
        return res.status(500).send(err.message);
    });
}); 
//  delete  a course by id
router.delete('/:id', (req, res)=> {
    let id = req.params.id;
    if (!objectID.isValid(id)) return res.status(400).send('course Id is not valid');
    CourseModel.findByIdAndRemove(id)
                .then(course => {
                    if(!course) {
                        return res.status(404).send(
                           `Course not found with id: ${id}`
                        );
                    }
                   return res.send(course);
                }).catch(err => {
                    return res.status(500).send(err.message);
            });
});
 


function validateCourse(course) {
    const schema = {
        name : Joi.alternatives().when('isUpdate', {is: true, 
                                                    then: Joi.string().min(5).required(),
                                                    otherwise: Joi.string().min(5) }),
        author: Joi.alternatives().when('isUpdate', {is:true, 
                                                    then: Joi.string().min(6).required(), 
                                                    otherwise: Joi.string().min(6) }),
        category: Joi.string().max(15).default('Un-categorized'),                                            
        // category: Joi.alternatives().when('isUpdate', {is:true, 
        //                                             then: , 
        //                                             otherwise: Joi.string().max(15) }),                                            
        tags: Joi.array().items(Joi.string()),
        status: Joi.alternatives().when('isUpdate', {is:true, 
                                                    then: Joi.string().valid('not started', 'ongoing', 'completed').required(), 
                                                     otherwise: Joi.string().valid('not started', 'ongoing', 'completed') }),
        isUpdate: Joi.boolean().default(false)
    };
   return Joi.validate(course, schema);
}

module.exports = router;