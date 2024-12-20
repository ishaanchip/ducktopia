import React from 'react'
import "./Courses.css"

//images & icons
import digitalInformationImage from "../../assets/digital-info.gif"
import programmingImage from "../../assets/programming.jpeg"

//intercomponet imports

//external dependencies
import { Link } from 'react-router-dom'


const Courses = () => {
    return (
        <div className='ducktopia-courses-backdrop'>
            <div className='ducktopia-courses-header'>
            <Link to="/" style={{textDecoration:'none', color:'black'}}><h1>ducktopia</h1></Link>
            </div>
            <div className='ducktopia-catalog-container'>
                <div className='ducktopia-catalog-item'>
                    <img src={digitalInformationImage} alt='digi info image'/>
                    <div className='information'>
                        <p style={{fontWeight:'600'}}>digital information</p>
                        <p>*</p>
                        <p style={{fontStyle:'italic'}}>unit #1</p>
                        <p>*</p>
                        <Link to="/quiz?quiz_name=digital_information"><button>begin quiz</button></Link>
                    </div>
                </div>
                <div className='ducktopia-catalog-item'>
                <img src={programmingImage} alt='digi info image'/>
                    <div className='information'>
                        <p style={{fontWeight:'600'}}>introduction to programming</p>
                        <p>*</p>
                        <p style={{fontStyle:'italic'}}>unit #4</p>
                        <p>*</p>
                        <Link to="/quiz?quiz_name=intro_to_programming"><button>begin quiz</button></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Courses