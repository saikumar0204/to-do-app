
var express=require('express')
var todocontroller= require('./controllers/todocontroller')
var app= express()
var port= process.env.PORT||3000

app.set('view engine','ejs')
app.use(express.static('./public'))


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.listen(port)
console.log('Server is running on port 3000');

//fire controller
todocontroller(app)
