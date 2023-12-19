//username program
//stores username in username!


document.addEventListener("DOMContentLoaded",function(){
let userName =document.getElementById("typingUser");
let userNameButton = document.getElementById("userNameButton");
let error = document.getElementById("error");
let userRegex =  /[a-z]|!|[A-Z]/
let badUser = 0;


userName.addEventListener("input",function(){
  let user = userName.value;
  function checker(){
    for (let i=0;i<user.length;i++){
      if (userRegex.test(user[i])==false){
        badUser = badUser +1;
      }
    }
    if (badUser >0 || user.length <=2){
      error.classList.remove("hide");
      badUser = 0;
      userNameButton.classList.add("hide");
    }else if (badUser==0 || user.length>2){
      error.classList.add("hide");
      userNameButton.classList.remove("hide");
      

      
    } 
  }
  checker(); 
})  

userNameButton.addEventListener("click",
function(){
  
  username = userName.value;
  
  
}
);

});




