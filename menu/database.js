const {createPool}= require('mysql2')
const express=require("express")
const app=express()
const path=require('path')
const methodOverride=require('method-override')
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'))


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
 


const pool=createPool({

    host:"localhost",
    user:"root",
    password:"2002",
    connectionLimit:10

})
  
  
var cart=[]
var menudata=[]
pool.query("select * from menu.food order by name asc",(err,res)=>{
 
  if(err)
  {
      console.log(err)
  }
  
  res.forEach((row) => {
      menudata.push(row);
  })
 
  
})






app.listen(4000,() =>{
  console.log("Listening on port 4000")

})
app.get('/home',(req,res)=>{
  res.render('index')
})
app.get('/menu',(req,res)=>{
  res.render('home',{menudata})
})
app.get('/order',(req,res)=>{
  res.render('order',{menudata})
})
app.get('/cart/:id',(req,res1)=>{
  
  const {id} =req.params ;
  
  const qr=(`select * from menu.food where name like '${id}'`);

  pool.query(qr,(err,res)=>{
  if(err)
  {
      console.log(err)
  }
  
  res.forEach((row) => {
    var k=0
    var z=0;
    for(let i=0;i<cart.length;i++)
    {
      if(cart[i].name===row.name)
      {
        cart[i].qty++;
        var k=1
        z=z+1;

      }
    }
    if(k===0)
    {
      cart.push(row)
     
    }
  })
 console.log(cart)
 var body = null;
 
  res1.render('cart',{cart})
 
})
})
app.get('/cart-/:id',(req,res1)=>{
  
  const {id} =req.params ;
  
  const qr=(`select * from menu.food where name like '${id}'`);

  pool.query(qr,(err,res)=>{
  if(err)
  {
      console.log(err)
  }
  
  res.forEach((row) => {
    var k=0
    for(let i=0;i<cart.length;i++)
    {
      if(cart[i].name===row.name)
      {
        cart[i].qty--;
        var k=1
      }
      if(cart[i].qty===0)
      {
        cart.splice(i,1);
      }
    }
  
  })
 console.log(cart)
  res1.render('cart',{cart})
 
})
})

app.get('/cart',(req,res)=>{
 
  res.render('cart',{cart})
})
app.get('/success',(req,res)=>
{
  res.render('success')
})


app.post('/menu/search',(req,res1)=>{
  
  const data = req.body;
  const data1=data.item;
  const qr=(`select * from menu.food where name like '%${data1}%'`);
pool.query(qr,(err,res)=>{
  var menudata1=[];
  if(err)
  {
      console.log(err)
  }
  
  if(res.length===0)
  {
    res1.render('new')
  }
  else{
  res.forEach((row) => {
    menudata1.push(row);
    
  })
  res1.render('search',{menudata1})
}
})
})

app.post('/order/search',(req,res1)=>{
  
  const data = req.body;
  const data1=data.item;
  const qr=(`select * from menu.food where name like '%${data1}%'`);
pool.query(qr,(err,res)=>{
  var menudata1=[];
  if(err)
  {
      console.log(err)
  }
  
  if(res.length===0)
  {
    res1.render('nonew')
  }
  else{
  res.forEach((row) => {
  
    menudata1.push(row);
  })
  res1.render('searchorder',{menudata1})
}
})
})
app.get("/reservation",(req,res)=>{
  const data=req.body;
  const q = `INSERT INTO menu.reservations VALUES('${data.name}','${data.email}','${data.date}','${data.number}')`;
  console.log(q)
  pool.query(q, (error, result) => {
    if (error)
    { console.log(error);
    } 
    res.render('index')
  });
  
    

})
app.get("/admin/reservations",(req,res1)=>{
  const q="select *from menu.reservations"
  pool.query(q,(err,res)=>{
     if(err)
     throw err;
    console.log(res)
     res1.render('reservation',{res});

  })
})

  






  
 


   





