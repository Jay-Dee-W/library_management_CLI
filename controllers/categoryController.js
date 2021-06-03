
const Category = require('../models/category')

const printAllCategories = async () => {
    let categories = await Category.find();
    categories.length === 0 ?
        console.log('No Categories Found \n')
    :
    categories.forEach(category => {
        console.log('----------------------')
        console.log('category name: ', category.name )
        console.log('----------------------')
    })
}

const addNewCategory = async (name) => {
    try{
        const category = new Category({name})
        await category.save()
        console.log('----------------------')
        console.log('Category ' + name +' saved')
        console.log('----------------------')
    } catch (e){
        console.log('Error', e.message)
    }
}
const removeCategory = async (name)=> {
    try{
        const category = Category.findOne({name})
        await category.deleteOne()
        console.log('----------------------')
        console.log('Category ' + name + ' deleted')
        console.log('----------------------')
    }catch (e){
        console.log('Error', e.message)
    }
}

const findCategory = async (name)=> {
    console.log('2',name)
    try{
        const category = await Category.findOne({name})
        console.log(category._id)
        return category
    }catch (e){
        console.log('Error', e.message)
    }
}

module.exports ={
    printAllCategories,
    addNewCategory,
    removeCategory,
    findCategory
}