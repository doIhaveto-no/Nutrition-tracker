import { useState,useEffect } from 'react';
import './App.css';

function App() {
    const [count, setCount] = useState(0);
    const [trazi, setTrazi] = useState('');
    const [activeSection, setActiveSection] = useState('pocet'); 
    const [klik, setKlik] = useState(false);

    //TODO inace u cemu je razlika izmedju ovog i normalnog komentara
    //TODO je highlightovan, osim toga ništa
    //inace evo je lista namirnica za primer
    const hrana = [
        {id:1, ime:'Jabuka', brkal:52},
        {id:2,ime:'Banana', brkal:89},
        {id:3, ime:'Paradajz',brkal:18}
    ];
    //TODO zameniti listu hrana pozivom na API

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
            <header style={{background:'#fcf5f5', padding: '15px 0', position: 'fixed', width: '100%'}}>
                <nav style={{justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
                    <button onClick={() =>skrol('pocet')} style={{padding:'10px 20px'}}>
                        Početna
                    </button>
                    <button onClick={() =>skrol('namirnice')} style={{padding:'10px 20px'}}>
                        Namirnice
                    </button>
                    <button onClick={() =>skrol('kontakt')} style={{padding:'10px 20px'}}>
                        Kontakt
                    </button>
                    {/*//TODO ovde dodajte dugmice*/}
                </nav>
            </header>
            <section id="pocetna" style={{minHeight:'700px',padding:'40px',paddingTop:'100px', background:'linear-gradient(#decaca,#ed6d6d 0%,#cf3636 100%)'}}>
                <h1>Nutrition tracker</h1>
                <input type="tekst"placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)}
                    style={{width:'100%',padding:'15px',border:'none',marginBottom:'20px'}}></input>
                {/* <p style={{textAlign:'center'}}>Pronađeno {filterhrane.lenght} namirnica</p>*/}
                {/* ovde ide lepo da se prikazu pronadjenje namirnice */}
            </section>
            <section id="namirnice" style={{minHeight:'500px',padding:'40px',background:'#decaca'}}>

            </section>
            {/*
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
            </p>*/}
        </>
    );
}

export default App;
