//program to change duck text on hover
const duck = document.getElementById("duck");
let duckText = document.getElementById("text")

const original = duckText.textContent;

let duckClick = 1;
duck.addEventListener("click",function(){
  duckClick++
  if (duckClick%2==0){
  duckText.textContent = "This is actually sad. Do you really not know?"
  }else{
    duckText.textContent = original;
  }
})

//program to display answer choice
let answerDisplay = document.getElementById("submit-choice");

let choiceA= document.getElementById("choice-a");
let choiceB= document.getElementById("choice-b");
let choiceC= document.getElementById("choice-c");
let choiceD= document.getElementById("choice-d");

console.log(choiceD.textContent[0])

choiceA.addEventListener("click",function(){
  answerDisplay.textContent = choiceA.textContent[0];
})

choiceB.addEventListener("click",function(){
  answerDisplay.textContent = choiceB.textContent[0];
})
choiceC.addEventListener("click",function(){
  answerDisplay.textContent = choiceC.textContent[0];
})
choiceD.addEventListener("click",function(){
  answerDisplay.textContent = choiceD.textContent[0];
})

//check to see if answer is correct
let submit = document.getElementById("question-1-submit");

let rightArrow = document.getElementById("rightButton");

let wrongArrow = document.getElementById("wrongButton");

let box = document.getElementById("duckBox");



submit.addEventListener("click",function(){
  if (answerDisplay.textContent === "A"){
    duckText.textContent = "Good job I guess... Time for your present !";
    submit.classList.add("hide");
    rightArrow.classList.remove("hide");
    box.classList.add("rightChangeColor");
    choiceA.classList.add("unclickable");
    choiceA.classList.add("rightChoice");
    choiceB.classList.add("unclickable");
    choiceC.classList.add("unclickable");
    choiceD.classList.add("unclickable");
    duck.classList.add("unclickable");
    
    
  }else{
    duckText.textContent = "You are NOT qualified to be teaching this class rn; that was actually embarrasing...";
    submit.classList.add("hide");
    wrongArrow.classList.remove("hide");
    box.classList.add("wrongChangeColor");
    choiceA.classList.add("unclickable");
    choiceA.classList.add("rightChoice");
    choiceB.classList.add("unclickable");
    choiceC.classList.add("unclickable");
    choiceD.classList.add("unclickable");
    duck.classList.add("unclickable");
   
  }
})
