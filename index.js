const mongoose = require('mongoose');
const readlineSync = require('readline-sync');


const categoryController = require('./controllers/categoryController')
const bookController = require('./controllers/bookController')

function displayOptions() {
    console.log('Welcome to Library\n')
    console.log('What you can do:')
    console.log('1: See All Categories')
    console.log('2: Add New Category')
    console.log('3: Delete one Category')
    console.log('4: See All Books')
    console.log('5: Add New Book')
    console.log('6: Delete one Book')
    // console.log('7: Search for a Book')
    // console.log('8: Get all books of a category')
    console.log('7: Exit')
    console.log('Enter 1-7')
}

let db = mongoose.connection
mongoose.connect('mongodb://localhost:27017/Library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        showOptions()

    }).catch(e => console.log(e.message))

async function showOptions() {
    displayOptions()


    let response = readlineSync.question('Option ?: ')

    switch (response) {
        case '1': {
            await categoryController.printAllCategories()
            showOptions()
        }
        break
        case '2':{
            let categoryToAdd = readlineSync.question('Catergory to add ?: ')
            await categoryController.addNewCategory(categoryToAdd)
            showOptions()
        }
        break
        case '3' : {
            let categoryToDelete = readlineSync.question('Catergory to delete ?: ')
            await categoryController.removeCategory(categoryToDelete)
            showOptions()
        }
        break
        case '4': {
            await bookController.printAllBooks()
            showOptions()
        }
        break
        case '5':{
            let bookTitle = readlineSync.question('Book Title ?: ')
            let bookPrice = readlineSync.question('Book Price ?: ')
            let bookAuthors = readlineSync.question('Book Author/s ?: ')
            let bookCategory = readlineSync.question('Book Category ?: ')
            await bookController.addNewBook(bookTitle,bookPrice,bookCategory,bookAuthors)
            showOptions()

        }
        break
        // case '6':{
        //     let bookToDelete = readlineSync.question('book title to delete ?: ')
        //     await bookController.removeBook(bookToDelete)
        //     showOptions()
        // }
        // break
        // case '7':{
        //     let stringQuery = readlineSync.question('String query to search for ?: ')
        //     await bookController.searchBooks(stringQuery)
        //     showOptions()
        // }
        // break
        case '7':{
            db.close()
        }
        break
        default:
            showOptions()
            break;
    }
   

}

