import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
// import HandleRefresh from './Refresh'

//components to route
import Home from './components/Home/Home'
import Construction from './components/Construction/Construction'
import Courses from './components/Courses/Courses'
import Quiz from './components/Quiz/Quiz'
import Shop from './components/Shop/Shop'

const Router = () => {
 return (
   <BrowserRouter >
        {/* <HandleRefresh /> */}
       <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/course-catalog" element={<Courses />}></Route>
           <Route path="/quiz" element={<Quiz />}></Route>
           <Route path="/shop" element={<Shop />}></Route>
           <Route path="/construction" element={<Construction/>}></Route>
       </Routes>
   </BrowserRouter>
 )
}


export default Router