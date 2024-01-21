const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()
const PORT=8000

// middleware
app.use(cors())
app.use(bodyParser.json())

// mongoDB connection 
mongoose.connect('mongodb+srv://GeethanjaliKarra:anjali1234@cluster0.tyoqyst.mongodb.net/',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("mongoDB connected")})
.catch((error)=>{console.log(error)})

const userSchema={
    name:String,
    password:String,
    completed:Boolean
}

const User=mongoose.model('User',userSchema)

app.delete('/user/:id',async(req,res)=>{
    const{id}=req.params
    try{
        await User.findByIdAndDelete(id)
        res.json("success:true")
    }
    catch(error){
        console.log(error)
    }
})

app.put('/user/:id',async(req,res)=>{
    const{id}=req.params
    const{name,password,completed}=req.body
    try{
        const updateUser=await User.findByIdAndUpdate(id,req.body,{new:true})
        res.json(updateUser)
    }
    catch(error){
        console.log(error)
    }
})




app.get('/user',async(re,res)=>{
    try{
        const users=await User.find()
        // console.log(users)
        res.json(users)
    }
    catch(error){
        console.log(error)
    }
})





// post route
app.post('/user',async(req,res)=>{
    // console.log(req.body)
    const{name,password,completed}=req.body
    try{
        const user=new User(req.body)
        await user.save()
        // console.log(user)
        res.json(user)
    }
    catch(error){
        console.log(error)
    }
})



app.get('/',async(req,res)=>{
    res.send("hello")
})





app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`)
})