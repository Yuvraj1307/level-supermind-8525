import React from 'react'
import {Routes,Route} from "react-router-dom"
import ArticleList from '../components/Body'
import SimpleCard1 from '../components/Login'
import SimpleCard2 from "../components/Signup"
import Mypost from '../components/Myposts'
import SimpleCard3 from "../components/Makepost"


export default function AllRoutes() {
    return (
    <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/myposts' element={<Mypost />} />
        <Route path='/makepost' element={<SimpleCard3 />} />


        <Route path='/login' element={<SimpleCard1 />} />
        <Route path='/signup' element={<SimpleCard2 />} />
        {/* <Route path='*' element={<InvalidPage />} /> */}

    </Routes>
       
       )
}