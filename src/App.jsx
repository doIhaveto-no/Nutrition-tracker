import { useState,useEffect } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [trazi, setTrazi] = useState('');
    const [activeSection,setActiveSection] = useState('pocet'); 
    const [klik,setKlik]= useState(false);

    //TODO inace u cemu je razlika izmedju ovog i normalnog komentara
    //inace evo je lista namirnica za primer
    const hrana = [
        {id:1, ime:'Jabuka', brkal:52},
        {id:2,ime:'Banana', brkal:89},
        {id:3, ime:'Paradajz',brkal:18}
    ];
    //TODO promeniti, izbrisati, nesto uraditi sa ovim gore4
    const filterhrane = hrana.filter(hrana => hrana.ime.toLowerCase().includes(trazi.toLowerCase()));
    //pokusavam nesto do not judge me
    const skrol = (secId) =>{
        setActiveSection(secId);
        const elem = document.getElementById(secId);
        if(elem){
            elem.scrollIntoView({behavior:'smooth'});
        }
    };
    useEffect(() =>{
        console.log("Da li sam uxitan");
    },[]);
    return (
        <>
            {/* kao sto mozete da vidite ovako se dodaju komentari u html, a ne ovako <!-- --> kako zasto, ne znam */}
            <header style={{background:'#fcf5f5', padding:'1rem'}}>
                <nav> 
                    <button onClick={() =>skrol('pocet')} style={{marginRight:'1rem'}}>
                        Početna
                    </button>
                    <button onClick={() =>skrol('namirnice')}>
                        Namirnice
                    </button>
                    {/*//TODO ovde dodajte dugmice*/}
                </nav>
            </header>
            
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
