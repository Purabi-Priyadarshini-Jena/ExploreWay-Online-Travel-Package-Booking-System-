import React from 'react'
import Navbar from "../Layout/Navbar"

// import LoginPage from './LoginPage'
// import bg from "../assets/travel-bg.jpg"
import HomePageSec from "../Component/HomePage/HomePageSec"
import DestinationPage from '../page/DestinationPage'
import ConnectPage from '../page/ConnectPage'
import Footer from "../Layout/Footer"
import FeedbackPage from './DisscountPage'
 



const HomePage = () => {
    return (
        <>
            <Navbar />
            {/* <LoginPage /> */}
            <HomePageSec />
            <DestinationPage />
            <FeedbackPage />
            <ConnectPage />
            <Footer />
              
        </>
    )
}

export default HomePage


{/* <div className='relative z-0 w-full h-[50rem] mx-auto bg-black'>
                <img src={bg} alt="" className='absolute z-0 h-[50rem] w-full'/>
                <div className='font-bold text-2xl text-blue-400 h-[30rem] flex flex-col justify-center items-center absolute z-10 pl-[24rem] bg-transparent' id='hommy'>
                    <p>"Store your stories in a unique way like u want to store.."</p>
                    <p className='text-xl'>By click on "Register" button store your memories.. </p>
                </div>
            </div> */}
            {/* <div className='font-bold text-2xl text-blue-400 h-[30rem] flex flex-col justify-center items-center   bg-transparent' id='hommy'>
                    <p>"Store your stories in a unique way like u want to store.."</p>
                    <p className='text-xl'>By click on "Register" button store your memories.. </p>
            </div> */}