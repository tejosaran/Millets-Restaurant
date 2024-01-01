
var modal = document.getElementById("myModal");
var btn = document.getElementById("ji");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;  
  let y = document.forms["reservation"]["name"].value;
  let z=document.forms["reservation"]["email"].value;
  let w=document.forms["reservation"]["date"].value;
  let w1=document.forms["reservation"]["number"].value;
  
let dateObj = new Date();
let year = dateObj.getUTCFullYear();
let month = dateObj.getUTCMonth() + 1;
let day = dateObj.getUTCDate();

 
  if (y == "") {
    alert("Name must be filled out");
  }
  else if (z == "" || !regEmail.test(z)) 
  {
    alert("Enter Valid Email");
    email.focus();
  }
  else if(w.slice(0,4)<year)
  {
    alert("Enter Future Date");
  }
  else if(w.slice(5,7)<month && w.slice(0,4)==year)
  {
    alert("Enter Future Date");
  }
  else if(w.slice(8,10)<day && w.slice(5,7)==month  && w.slice(0,4)==year)
 {
  alert("Enter Future Date");
 }
  else if(w1=="" || w1<=0)
  {
    alert("Enter Valid Number of Guests");
  }
  else{
  document.getElementById("demo").innerHTML="Dear"+", "+y;
  
  modal.style.display = "block";
  }
 
}
span.onclick = function() {
  modal.style.display = "none";
}



