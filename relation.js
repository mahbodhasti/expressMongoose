const mongoose =require("mongoose");
mongoose
.connect("mongodb://localhost:27017/relation")
.then(()=>console.log('connected to the mongodb'))
.catch(()=>console.log('could not connected to the mongodb'))

const Book = mongoose.model("Book", new mongoose.Schema({
    title:String,
    pages:Number
}))

const User = mongoose.model("User",new mongoose.Schema({
    first_name:String,
    last_name:String,
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
}))

async function createUser(first_name,last_name,book_id){
   const user = new User({
        first_name,
        last_name,
        book:book_id
    })

    const result = await user.save();
    console.log(result)
}
async function createBook(title,pages){
   const book= new Book({
        title,
        pages
    })

    const result =await book.save()
    console.log(result)

}

async function getUsers(){
    users = await User.find().populate('book','title pages -_id ')
    console.log(users)
}

// createBook('nodjsProgramming',100)
// createUser('mahbod','hasti','62b2e2b27189ce6152902abd')
getUsers()
