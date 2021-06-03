
const Book = require('../models/book')
const Category = require('../models/category')


const printAllBooks = async () => {
    let books = await Book.find();
   
    books.length === 0 ?
        console.log('No Books Found \n')
    :
    books.forEach(book => {
        console.log('----------------------')
        console.log('Book title: ', book.title )
        console.log('Book price: ', book.price )
        
        console.log('Book category: ', book.category )
        console.log('Book authors: ', book.authors )
        console.log('----------------------')
    })
}
const addNewBook = async (title, price, categoryName, authors) => {
    try{
        const category = await Category.findOne({name:categoryName})
       
        const book = new Book({title, price, category, authors})
        await book.save()
        console.log('----------------------')
        console.log('Book ' + title +' saved')
        console.log('----------------------')
        
    } catch (e){
        console.log('Error', e.message)
    }
}
const removeBook = async (title)=> {
   
    try{
        const book = Book.findOne({title})
       
        await book.deleteOne()
        console.log('----------------------')
        console.log('Book ' + title + ' deleted')
        console.log('----------------------')
    }catch (e){
        console.log('Error', e.message)
    }
}

const searchBooks = async(query) => {
   
    try {
       Book.findOne({ title: {"$regex" :query, "$options": "i"   }}, 
        (err,book) => {
           const result =  book            
        })
        console.log( result )
    } catch (e){
        console.log('Error ', e,message)
    }
}

module.exports ={
    printAllBooks,
    addNewBook,
    removeBook,
    searchBooks 
}