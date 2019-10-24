'use strict';

var models = require('../../models');
let Crop = models.Crop;

/* Function to fetch crop grades */
var fetchGrades = async (filters) => {

    const name = filters.name;
    const variety = filters.variety;

    let grades = await Crop.find({
        name: name.toLowerCase(),
        variety: variety.toLowerCase()
    }).distinct('grade');

    return grades;

}

/* Function to fetch crop varities */
const fetchVarieties = async (filters) => {

    const name = filters.name;
    
    let varieties = await Crop.find({
        name: name.toLowerCase()
    }).distinct('variety');

    return varieties;
}

/* Function to fetch crop names */
const fetchNames = async () => {
    
    let names = await Crop.find().distinct('name');
    return names;
}

module.exports = {
    grades: fetchGrades,
    varieties: fetchVarieties,
    names: fetchNames
};