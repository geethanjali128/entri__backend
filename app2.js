const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()
const port=4000

// middleware
app.use(cors())
app.use(bodyParser.json())

// mongoDB connection
mongoose.connect('mongodb+srv://GeethanjaliKarra:anjali1234@cluster0.tyoqyst.mongodb.net/',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("mongoDb connected")})
.catch((error)=>{console.log(error)})

// app.get('/',async(req,res)=>{
//     res.send(()=>{console.Console.log("hello")})
// })

const todoSchema={
    text:String,
    completed:Boolean
}
const Todo=mongoose.model('Todo',todoSchema)

// update(put) route
app.put('/todos/:id',async(req,res)=>{
    const{id}=req.params
    const{text,completed}=req.body
    try{
        const updateTodos=await Todo.findByIdAndUpdate(id,{text,completed},{new:true})
        console.log(updateTodos)
        res.json(updateTodos)
    }catch(error){
        console.log(error)
    }
})




// delete route
app.delete('/todos/:id',async(req,res)=>{
    console.log(req.params)
    const{id}=req.params
    try{
    await Todo.findByIdAndDelete(id)
    res.json({success:true})
    }catch(error){
        console.log(error)
    }
})



// get route
app.get('/todos',async(req,res)=>{
    try{
        const todos=await Todo.find()
        // console.log(todos)
        res.json(todos)
    }catch(error){
        console.log(error)
    }
})

// post route
app.post('/todos',async(req,res)=>{
    // console.log(req.body)
    const{text,completed}=req.body
    try{
        const todo=new Todo(req.body)
        console.log(todo)
        await todo.save()
        res.json(todo)
    }catch(error){
        console.log(error)
    }
})



app.listen(port,async()=>{
    console.log(`server is ruunig on the ${port}`)
})