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
    }, {
        grade: 1
    });

    grades = grades.map(grade => grade.grade);

    return grades;

}

/* Function to fetch crop varities */
const fetchVarieties = async (filters) => {

    const name = filters.name;
    
    let varieties = await Crop.find({
        name: name.toLowerCase()
    }, {
        variety: 1
    });

    varieties = varieties.map(variety => variety.variety);

    return varieties;
}

module.exports = {
    grades: fetchGrades,
    varieties: fetchVarieties
};