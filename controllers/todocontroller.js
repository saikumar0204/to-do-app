var mongoose= require('mongoose')
mongoose.connect("mongodb+srv://saikumar0204:Sai12345@cluster0.rx4l3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
  console.log('Connected to Mongoose')
})

var todoschema= new mongoose.Schema({
  item:String
})

//create Model
var Todo= mongoose.model('Todo',todoschema)

// var itemOne= Todo({item:'Buy goods'}).save(err=>{
//   if(err) console.log(err)
//   else console.log("Item saved")
// })

module.exports=function(app){
  
  // var data=[{item:'feed dog'},{item:"do bath"}]
  app.get('/todo',(req,res)=>{
    Todo.find({},function(err,data){
      if(err) console.log(err)
      
      else res.render('todo.ejs',{todos:data})
    })
  })
  app.post('/todo',(req,res)=>{
    //Get data from view and add it to db
    var newTodo= Todo(req.body).save(function(err,data){
      if(err) console.log(err)
      // else res.render('todo.ejs',{todos:data})
      res.redirect('/todo')
    })
  })
  app.get('/todo/:id',(req,res)=>{
     Todo.deleteOne({_id:req.params.id})
     .then(()=>{
       console.log('File deleted Successfully')
       res.redirect('/todo')
     })
     .catch(e=>{
       console.log('Error')
     })
    
  })

  app.get('/home',(req,res)=>{
    res.send(' this is home page')
  })
}