import './Loading.css';
import React, {useState, useEffect, useCallback} from 'react'

//images & icons
import ducktopiaCart from "../../assets/duck-cart.png"

const LoadingBar = () => {
  const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms)
})

const [progress, setProgress] = useState(0);


  const activeLoadBar = useCallback(async() => {
      setProgress(10);
      for (let i = 0; i < 20; i++){
        setProgress((prev) => prev + (Math.random() * 4.5));
        await delay(200);
      }
      setProgress(100);
  }, [])

  useEffect(() => {
    activeLoadBar()
  }, [activeLoadBar])

    return (
    <div className='loading-outer-shell'> 
        <img src={ducktopiaCart} style={{width:"200px", marginTop:"-5%", left: `${ Math.max(20, (1.1*progress+20)/2) }%`, transition:'left 0.5s linear'}} alt="Ducktopia Background" className='ducktopia-cart' /> 
        <div className="outer-bar">
            <div className="inner-bar" style={{width: `${progress}%`, transition: 'width 0.5s linear'}}>
            </div>
        </div>
    </div> 
  )
}

export default LoadingBar
