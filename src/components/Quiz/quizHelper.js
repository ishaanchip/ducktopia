import axios from "axios";


//gets 5 questions from bank of corresponding course
    export const retrieveSampleQuestions = async(course) =>{
        try{
            const result = await axios.get(`${import.meta.env.VITE_API_URL}retrieve-quiz-questions/${course}`)
            console.log(result.data)
            return result.data.the_bank;

        }
        catch(err){
            console.log(`there was an error in the frontend attaining sample questions: ${err}`)
            return [];
        }
    }

//returns coin mutliplier 
    export const coinsForQuiz = (correct) =>{
        let base = correct * 100;
        let mutliplier = Math.random()*1 + 1;
        return parseInt(base*mutliplier);
    }

//updates user quiz results to mongo - FINISH (update total corect and total guessed)
    export const saveQuizResults = async(username, course, totalCoins, totalGuessed, totalCorrect)=>{
        try{
            //{courseName, username, coinsEarned, guessed, correct}
            const postData = {courseName:course, username:username, coinsEarned:totalCoins, guessed:totalGuessed, correct:totalCorrect}
            const result = await axios.put(`${import.meta.env.VITE_API_URL}save-quiz-results`, postData);
            if (result.data.success === true){
                console.log('updated quiz results were a sucess!');
              }
              else{
                console.log('updated quiz results were NOT a sucess!');
              }
        }
        catch(err){
            console.log(`there was an error in the frontend transferring quiz data: ${err}`)

        }
        
    }

//gets newly updated user data and displays (would retrieve accumulated numbers)
    export const retrieveTotalQuizResults = async(username, course) =>{
        try{
            const result = await axios.get(`${import.meta.env.VITE_API_URL}fetch-quiz-results/${username}`)
            const courseArray = result.data.result.account_courses
            for (let i = 0; i < courseArray.length; i++){
                if (courseArray[i].course_title === course){
                    let final = courseArray[i].quiz_data
                    return {totalCorrect:final.total_correct, totalGuessed:final.total_guessed}
                }
            }
            
        }
        catch(err){
            console.log(`there was an error in the frontend retrieving quiz data: ${err}`)
        }
    }



