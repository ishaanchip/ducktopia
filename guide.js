

//program to change duck text on hover
const duck = document.getElementById("duck");
let duckText = document.getElementById("text")

const original = duckText.textContent;

let duckClick = 1;
duck.addEventListener("click",function(){
  duckClick++
  if (duckClick%2==0){
  duckText.textContent = "PUT ME DOWN ! ! !"
  }else{
    duckText.textContent = original;
  }
})