const mongoose = require('mongoose');

// create Schema
const courseSchema = new mongoose.Schema({
    name:{ type: String, required: true, max: 30},
    author: { type: String, required: true, max: 25},
    tags: [String],
    category: String,
    date: { type: Date, default: Date.now },
    status: {type: String,
             enum: ['not started', 'ongoing', 'completed'],
             default: 'not started'}
  },{
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
