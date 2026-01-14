import { useState,useEffect } from 'react';
import './Home.css';

function Home() {

    return (
        <>
            <div className='bg-amber-400 p-10 flex flex-row justify-evenly items-center bg-linear-170 from-[#decaca] via-33% via-[#f58488] to-[#ff1a22]'>
                <img src="/logo.svg" alt="Logo SVG" className='w-[30%]'/>
                <p className='w-[50%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            {/* {<section className="full-screen" style={{background:'linear-gradient(#decaca,#f58488 0%,#ff1a22 100%)'}}>
                <h1>Nutrition Tracker</h1>
            </section>} */}
        </>
    );
}

export default Home;
