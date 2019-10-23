'use strict';

const models = require('../../models');
const Crop = models.Crop;

/* Check for duplicates */
const checkDuplicate = async (categoryData) => {

    const crop = await Crop.findOne({
        name: categoryData.name.toLowerCase(),
        variety: categoryData.variety.toLowerCase(),
        grade: categoryData.grade.toLowerCase()
    }).exec();

    if(crop)
        throw new Error('Category already exists');
}

/* Create new crop category */
const create = async (categoryData) => {

    await checkDuplicate(categoryData);

    const crop = new Crop({
        name: categoryData.name.toLowerCase(),
        variety: categoryData.variety.toLowerCase(),
        grade: categoryData.grade.toLowerCase()
    });

    const doc = await crop.save();
    
    return doc;

}

/* Finds or creates crop category */
const findOrCreate = async (categoryData) => {

    let crop = await Crop.findOne({
        name: categoryData.name.toLowerCase(),
        variety: categoryData.variety.toLowerCase(),
        grade: categoryData.grade.toLowerCase()
    }).exec();

    if(crop)
        return crop;
    else{
        crop = await create(categoryData);
        return crop;
    }

}

/* Finds category id based on filter data */
const getCropCategoryFromFilter = async (filter) => {
    const name = filter.name;
    const variety = filter.variety;
    const grade = filter.grade;
    
    if(name && variety && grade){
        // When name, variety and grade are defined in filter
        const category = await Crop.find({
            name: name.toLowerCase(),
            variety: variety.toLowerCase(),
            grade: grade.toLowerCase()
        }).exec();
        return category;
    }else if(name && variety){
        // When name and variety are defined in filter
        const category = await Crop.find({
            name: name.toLowerCase(),
            variety: variety.toLowerCase()
        }).exec();
        return category;
    }else if(name){
        // When name are defined in filter
        const category = await Crop.find({
            name: name.toLowerCase()
        }).exec();
        return category;
    }else{
        return [];
    }
}

module.exports = {
    create: create,
    checkDuplicate: checkDuplicate,
    findOrCreate: findOrCreate,
    getCropCategoryFromFilter: getCropCategoryFromFilter
}