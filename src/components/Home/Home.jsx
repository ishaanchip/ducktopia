import React, {useState, useEffect} from 'react'
import "./Home.css"

//images & icons
import ducktopiaLogo from "../../assets/ducktopia-home.png"

//intercomponent imports
import { useUser } from '../../context/UserContext'
// import { createDucktopiaAccount } from './homeHelper'

//external dependenices
import { Link } from 'react-router-dom'
import axios from 'axios'



const Home = () => {
  const [isBeta, setIsBeta]  = useState(true)
  
  //global username state
  const {currentUser, setCurrentUser} = useUser();



  //routing calls
    //changes who is logged in and saves to global state
    const handleUpdateLogin = async() =>{
      try{
        //global state will NOT update immediate, make temp to make queries work proper
          const instantUser = isBeta ? "beta" : "test01"
          if (isBeta){
            setCurrentUser("beta")
          }
          else{
            setCurrentUser("test01")
          }

        console.log(`current user: ${instantUser}`)
        const postData = {username:instantUser}
        const res = await axios.put(`${import.meta.env.VITE_API_URL}update-login`, postData);
        if (res.data.success === true){
          console.log('updated login is a sucess!');
        }
        else{
          console.log('updated login was NOT a sucess!');
        }
      }
      catch(err){
        console.log(`Problems updating login in frontend: ${err}`)
      }

    }

    // //handling create account request
    // const handleCreateAccount = async()=>{
    //   console.log('current user: ' + currentUser)
    //   if (currentUser?.length> 0){
    //     await createDucktopiaAccount(currentUser);
    //   }
    // }


  return (
    <div className='outer-shell'>
        <div className='nav-options'>
            <Link to="/shop"><button style={{marginLeft: "-10%"}} onClick={()=> handleUpdateLogin()}>SHOP</button></Link>
            <Link to="/course-catalog"><button style={{marginLeft: "5%"}} onClick={()=> handleUpdateLogin()}>BEGIN QUEST</button></Link>
            <Link to="/construction"><button style={{marginLeft: "-10%"}} onClick={()=> {handleUpdateLogin()}}>TIPS & TRICKS</button></Link>
        </div>

        <div className='ducktopia-intro'>

          <img src={ducktopiaLogo} style={{width:"750px"}} alt="Ducktopia Background" /> 
          <p>you want a five on the CSP test? you're in the right place.</p>
          {isBeta
            ? 
            <button className='temp-account-nav' onClick={() => {
              setIsBeta(false)
              }}>beta</button> 
              : 
              <button className='temp-account-nav' onClick={()=> {
                setIsBeta(true)
              }}>developer</button>
          }
        </div>

    </div>
  )
}

export default Home









  // const fillUpQuestionBank = async()=>{
  //   try{
  //     const postData = 
  //     {questionBank: [
  //       {
  //         "question": "Why is a variable important in a program?",
  //         "answer_choices": [
  //           "It provides a way to execute multiple commands simultaneously.",
  //           "It allows values to be stored and reused throughout the program.",
  //           "It simplifies the conversion of data types.",
  //           "It ensures code execution occurs in a specific order."
  //         ],
  //         "correct_choice": "It allows values to be stored and reused throughout the program.",
  //         "explanation": "Variables store data that can be accessed and reused multiple times, making programming efficient."
  //       },
  //       {
  //         "question": "How does using a variable improve program readability?",
  //         "answer_choices": [
  //           "It reduces the number of functions in a program.",
  //           "It replaces hardcoded values with descriptive names.",
  //           "It eliminates the need for debugging code.",
  //           "It guarantees data security in a program."
  //         ],
  //         "correct_choice": "It replaces hardcoded values with descriptive names.",
  //         "explanation": "Using variables with meaningful names makes the code easier to understand and maintain."
  //       },
  //       {
  //         "question": "How does a string differ from other data types in programming?",
  //         "answer_choices": [
  //           "It represents text or characters instead of numerical values.",
  //           "It cannot be modified after initialization.",
  //           "It requires more memory than other data types.",
  //           "It is used exclusively for Boolean expressions."
  //         ],
  //         "correct_choice": "It represents text or characters instead of numerical values.",
  //         "explanation": "Strings are used to represent sequences of characters, such as text, as opposed to numbers or Boolean values."
  //       },
  //       {
  //         "question": "Why might a programmer use a string instead of a number in a variable?",
  //         "answer_choices": [
  //           "To store Boolean values like true or false.",
  //           "To store textual data like names or messages.",
  //           "To perform mathematical calculations.",
  //           "To ensure faster data processing."
  //         ],
  //         "correct_choice": "To store textual data like names or messages.",
  //         "explanation": "Strings are ideal for storing text, such as user names, messages, or other character-based data."
  //       },
  //       {
  //         "question": "How does the assignment operator function in programming?",
  //         "answer_choices": [
  //           "It performs a comparison between two variables.",
  //           "It creates a loop for repetitive tasks.",
  //           "It generates a new variable automatically.",
  //           "It assigns a value to a variable."
  //         ],
  //         "correct_choice": "It assigns a value to a variable.",
  //         "explanation": "The assignment operator (`=`) sets or updates the value stored in a variable."
  //       },
  //       {
  //         "question": "Which situation demonstrates the use of the assignment operator?",
  //         "answer_choices": [
  //           "Converting a string to a number.",
  //           "Updating a variable to store a new user input.",
  //           "Comparing two variables to check equality.",
  //           "Executing a function to print output."
  //         ],
  //         "correct_choice": "Updating a variable to store a new user input.",
  //         "explanation": "The assignment operator is used to update the value of a variable, such as storing user input."
  //       },
  //       {
  //         "question": "What is the key difference between a global variable and a local variable?",
  //         "answer_choices": [
  //           "Local variables can only store strings, while global variables can store any data type.",
  //           "Global variables execute faster than local variables.",
  //           "Global variables can be accessed anywhere in the program, while local variables exist only within a specific block.",
  //           "Global variables require less memory than local variables."
  //         ],
  //         "correct_choice": "Global variables can be accessed anywhere in the program, while local variables exist only within a specific block.",
  //         "explanation": "Global variables have program-wide scope, while local variables are restricted to the block of code in which they are defined."
  //       },
  //       {
  //         "question": "Why should a programmer prefer local variables over global variables in some cases?",
  //         "answer_choices": [
  //           "Local variables reduce the risk of unintended side effects.",
  //           "Local variables allow global variables to use more memory.",
  //           "Local variables are automatically saved between program runs.",
  //           "Local variables execute faster than global variables."
  //         ],
  //         "correct_choice": "Local variables reduce the risk of unintended side effects.",
  //         "explanation": "Local variables are limited in scope, reducing the chances of conflicts or unexpected modifications in other parts of the program."
  //       },
  //       {
  //         "question": "How does a Boolean value simplify decision-making in programming?",
  //         "answer_choices": [
  //           "It ensures all variables remain immutable.",
  //           "It evaluates conditions to either true or false.",
  //           "It compares strings and numbers directly.",
  //           "It allows programs to generate random values."
  //         ],
  //         "correct_choice": "It evaluates conditions to either true or false.",
  //         "explanation": "Boolean values represent true or false, which are essential for controlling program flow based on conditions."
  //       },
  //       {
  //         "question": "In what situation would you use a Boolean value?",
  //         "answer_choices": [
  //           "To store a user’s name and age.",
  //           "To represent large amounts of numerical data.",
  //           "To execute repeated actions in a loop.",
  //           "To check whether a user is logged in or not."
  //         ],
  //         "correct_choice": "To check whether a user is logged in or not.",
  //         "explanation": "Boolean values are perfect for representing true/false states, such as whether a user is logged in."
  //       }
  //     ]}

  //     const result  = await axios.put(`${import.meta.env.VITE_API_URL}fill-question-bank`, postData)
  //     if (result.data.success === true){
  //       console.log('updated question bank is a sucess!');
  //     }
  //     else{
  //       console.log('updated question bank was NOT a sucess!');
  //     }
      
  //   }
  //   catch(err){
  //     console.log(`Problems transferring questions to backend: ${err}`)
  //   }
  // }