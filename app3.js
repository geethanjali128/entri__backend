const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()
const PORT=5000

// middleware
app.use(cors())
app.use(bodyParser.json())

// mongoDB connection 
mongoose.connect('mongodb+srv://GeethanjaliKarra:anjali1234@cluster0.tyoqyst.mongodb.net/',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("mongoDB connected")})
.catch((error)=>{console.log(error)})


const todoSchema={
    text:String,
    completed:Boolean
}

const Todo=mongoose.model('Todo',todoSchema)

// update route
app.put('/todos/:id',async(req,res)=>{
    const {id}=req.params
    const{text,completed}=req.body
    try{
        const updateTodos=await Todo.findByIdAndUpdate(id,req.body,{new:true})
        res.json(updateTodos)
    }
    catch(error){
        console.log(error)
    }
})




// delete route
app.delete('/todos/:id',async(req,res)=>{
    // console.log(req.params)
    const{id}=req.params
    try{
        await Todo.findByIdAndDelete(id)
        res.json("success:true")
    }
    catch(error){
        console.log(error)
    }
})




// get route
app.get('/todos',async(req,res)=>{
    try{
        const todos=await Todo.find()
        // console.log(todos)
        res.json(todos)
    }
    catch(error){
        console.log(error)
    }
})





// post route
app.post('/todos',async(req,res)=>{
    const{text,completed}=req.body

    try{
        const todo= new Todo({text,completed})
        await todo.save()
        res.json(todo)
        // console.log(todo)
    }
    catch(error){
        console.log(error)
    }
})


app.get('/',async(req,res)=>{
    res.send("app is working")
})

app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`)
})