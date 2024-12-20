import React, {useState} from 'react'
import "./Construction.css"

//images & icons
import ducktopiaBlueprint from "../../assets/construction.png"


//intercomponet imports
import LoadingBar from '../LoadingBar/Loading'

//external dependencies
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Construction = () => {
  //loading bar func
      const delay = (ms) => new Promise((resolve) => {
          setTimeout(resolve, ms)
      })
      //minimum loading time functionality
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
    
    if (minLoading){
      return (
        <div className='ducktopia-loading-backdrop'>
          <h1>ducktopia</h1>
          <LoadingBar />
          <p>Give us a sec...</p>
        </div>
      )
    }

  return (
    <div className='ducktopia-construction-backdrop'>
      <div className='ducktopia-construction-header'>
        <Link to="/" style={{textDecoration:'none', color:'black'}}><h1>ducktopia</h1></Link>
      </div>
      <img src={ducktopiaBlueprint} style={{width:"800px"}} /> 
      <p>page is currently in production; we'll let you know once its finished.</p>
    </div>
  )
}

export default Construction