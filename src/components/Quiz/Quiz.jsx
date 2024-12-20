import React, {useState} from 'react'
import "./Quiz.css"

//images & icons
import ducktopiaCoin from "../../assets/coin.png"


//intercomponet imports
import { retrieveSampleQuestions, saveQuizResults, retrieveTotalQuizResults, coinsForQuiz } from './quizHelper'
import LoadingBar from '../LoadingBar/Loading'
import { useUser } from '../../context/UserContext'

//external dependencies
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

//function to handle quiz
    //pick 5 random from question bank - completed
    //question renders, waits for user to pick - completed
    //user selection, regardless will display correct with answer - completed
    //button to nav to next - completed
    //whole new render - completed 
    //repeat until all questions answered - completed 
    //rn return home button when 5 random finish - completed

const Quiz = () => {
    //USER global state
        const {currentUser} = useUser();

    //HIGHLIGHT FUNCTIONALITY
        const [isSelected, setIsSelected] = useState(-1)
        const [progress, setProgress] = useState(0);

        const delay = (ms) => new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    


    //retrieving specialized questions for users    
        //getting specific question bank
        const [searchParams] = useSearchParams();
        const quizName = searchParams.get('quiz_name');
        const {data:questionSet, isFetching:loadingQuestions} = useQuery(
            {
                queryKey:['retrieving-questions'],
                queryFn: async()=> retrieveSampleQuestions(quizName)
            }
        )
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [coinAmount, setCoinAmount] = useState(0);
    const [totalQuestionsCorrect, setTotalQuestionsCorrect] = useState(0)
    const [totalQuestionsGuessed, setTotalQuestionsGuessed] = useState(0)
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleAnswerChoice = async(i) => {
        setIsSelected(i)
        if (questionSet[currentQuestionIndex].correct_choice === questionSet[currentQuestionIndex].answer_choices[i]){
            setCorrectAnswers((prev) => prev + 1);
        }
        setProgress(0)
        for (let i = 0; i < 10; i++) {
            await delay(10);
            setProgress((prev) => prev + 10);
        }
    }

    const handleNavigation = async(i) =>{
        setProgress(0)
        setIsSelected(-1);
        setCurrentQuestionIndex((prev) => prev + 1);
    }

    const handleQuizResults = async ()=>{
        //getting randomized coin amount for questions
            const finalCoinAmount = coinsForQuiz(correctAnswers)
            setCoinAmount(finalCoinAmount)

        //call to backend to save all data
        await saveQuizResults(currentUser, quizName, finalCoinAmount,currentQuestionIndex + 1, correctAnswers);

        //attempt to retrieve updated data
        const {totalCorrect} = await retrieveTotalQuizResults(currentUser, quizName)
        const {totalGuessed} = await retrieveTotalQuizResults(currentUser, quizName)
        setTotalQuestionsCorrect(totalCorrect)
        setTotalQuestionsGuessed(totalGuessed)
        setQuizCompleted(true);
    }


    //minimum loading time functionality when waiting for question
        const [minLoading, setMinLoading] = useState(true)
        const minLoadingFunction = async() => {
        await delay(2500)
        setMinLoading(false)
        return true;
        }
        useQuery({
        queryKey:['minloading'],
        queryFn: async() => minLoadingFunction(),
        })


    if (loadingQuestions || minLoading){
        return (
            <div className='ducktopia-quiz-loading-backdrop'>
              <h1>ducktopia</h1>
              <LoadingBar />
              <p>Give us a sec...</p>
            </div>
          )
    }
    return (
        <div className='ducktopia-quiz-backdrop'>
            <div className='ducktopia-quiz-header'>
                <Link to="/" style={{textDecoration:'none', color:'black'}}><h1>ducktopia</h1></Link>
            </div>
            <div className='quiz-shell'>

                <div className='quiz-question-area'>
                    <h2 className='current-question'>Q: {questionSet[currentQuestionIndex]?.question}</h2>
                    <div className='answer-choices'>
                        {questionSet[currentQuestionIndex]?.answer_choices.map((currentQuestion, i) =>(
                            <div className='answer-choice' style={isSelected >= 0 ? {pointerEvents:'none'} : {}} onClick={()=> handleAnswerChoice(i)} key={currentQuestion}>
                                    {currentQuestion === questionSet[currentQuestionIndex].correct_choice &&
                                        <div className="correct-highlight-overlay" style={{
                                            width: `${progress}%`, 
                                            transition: 'width 0.35s linear, box-shadow 0.3s linear, opacity 0.3s linear',
                                            opacity: 0.3 + (progress >= 80 ? (progress - 80) * 0.015 : 0),
                                        }}></div>
                                    }
                                    {(currentQuestion !== questionSet[currentQuestionIndex].correct_choice && isSelected === i) &&
                                        <div className="incorrect-highlight-overlay" style={{
                                            width: `${progress}%`, 
                                            transition: 'width 0.35s linear, box-shadow 0.3s linear, opacity 0.3s linear',
                                            opacity: 0.3 + (progress >= 80 ? (progress - 80) * 0.015 : 0),
                                        }}></div>
                                    }
                                <p>{currentQuestion}</p>
                            </div>
                        ))}
                    </div>
                    <div className="quiz-outer-bar">
                        <div className="quiz-inner-bar" style={{width: `${correctAnswers*20}%`, transition: 'width 0.5s linear'}}>
                        </div>
                    </div>
                    {(isSelected >= 0  && currentQuestionIndex < questionSet.length - 1)&& 
                        <button className={`quiz-navigation-btn ${isSelected >= 0 ? 'visible' : ''}`} onClick={() => handleNavigation()}>next question</button>
                    }
                    {(isSelected >= 0  && currentQuestionIndex === questionSet.length -1 && !quizCompleted)&& 
                        <button className={`quiz-navigation-btn ${isSelected >= 0 ? 'visible' : ''}`} onClick={()=>handleQuizResults()}>submit quiz</button>
                    }

                </div>

                <div className='quiz-helper-area'>
                    {quizCompleted &&
                        <div>
                            <h1>Score: {correctAnswers} / {currentQuestionIndex + 1}</h1>
                            <h1>Lifetime Score: {totalQuestionsCorrect} / {totalQuestionsGuessed}</h1>
                            <div className='coins-added-area'>
                                <img src={ducktopiaCoin} style={{width:"150px"}} alt="Ducktopia Coins" /> 
                                <h1 className='coins-text'>+{coinAmount} coins</h1>
                            </div>
                            <Link to="/" style={{textDecoration:'none', color:'black'}}><button className='quiz-navigation-btn quiz-completion-navigation-btn'>return home</button></Link>
                        </div>
                    }


                </div>

            </div>
        </div>
    )
}

export default Quiz