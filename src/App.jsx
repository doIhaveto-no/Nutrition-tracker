import { useState,useEffect } from 'react';
import './App.css';

function App() {
    const [trenstr, setTrenstr] = useState('pocetna'); 
    const [trazi, setTrazi] = useState('');
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
    const drstr = (str) =>{setTrenstr(str);};
    useEffect(() =>{
        console.log("Da li je stranica uxitana");
    },[]);
    const[dugmeklik,setDugmeklik] = useState(false);

    return (
        <>
            {/* kao sto mozete da vidite ovako se dodaju komentari u html, a ne ovako <!-- --> kako zasto, ne znam */}
            <header style={{background:'#fcf5f5', padding: '15px 0', position: 'fixed', width: '100%',top:'0',zIndex:'1000'}}>
                <nav style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
                    {/* videcu da li ce ovo trebati <div style={{display:'flex',gap:'15px',alignItems:'center'}}></div>*/}
                    <button onClick={() =>drstr('pocetna')} 
                        style={{padding:'10px 20px', background: trenstr ==='pocetna'?'rgba(255,255,255,0.2)' : 'transparent',
                            color:'#292121', border:'none'
                        }}>
                        Početna
                    </button>
                    <button onClick={() =>drstr('namirnice')} 
                        style={{padding:'10px 20px', background: trenstr ==='namirnice'?'rgba(255,255,255,0.2)' : 'transparent',
                            color:'#292121', border:'none'}}>
                        Namirnice
                    </button>
                    <button onClick={() =>drstr('kontakt')} 
                        style={{padding:'10px 20px', background: trenstr ==='kontakt'?'rgba(255,255,255,0.2)' : 'transparent',
                            color:'#292121', border:'none'}}>
                        Kontakt
                    </button>
                    <button onClick={() =>drstr('login')} 
                        style={{padding:'10px 20px', background: trenstr ==='login'?'rgba(255,255,255,0.2)' : 'transparent',
                            color:'#292121', border:'none'}}>
                        Prijavi se
                    </button>
                    {/*//TODO ovde dodajte dugmice*/}
                </nav>
            </header>
            {/*  <main style={{paddingTop:'40px'}}>
                {(() => {
                    switch(trenstr)    
                    {case 'namirnice':return(<section id="pocetna" style={{minHeight:'800px',padding:'40px',paddingTop:'100px', background:'linear-gradient(#decaca,#ed6d6d 0%,#cf3636 100%)'}}>
                        <h1>Nutrition tracker baza namirnica</h1>
                        <input type="tekst"placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)}
                            style={{width:'100%',padding:'15px',border:'none',marginBottom:'20px'}}></input>
                        {/* <p style={{textAlign:'center'}}>Pronađeno {filterhrane.lenght} namirnica</p>*/}
            {/* ovde ide lepo da se prikazu pronadjenje namirnice */}{/*
                    </section>);
                    case 'kontakt':return(<selection style={{minHeight:'800px',padding:'40px',paddingTop:'100px', background:'linear-gradient(#decaca,#ed6d6d 0%,#cf3636 100%)'}}>
                        <h1>Kontakt</h1>
                        {/*TODO ovde napraviti kontakt formu */}{/*
                    </selection>);
                    case 'login':return(<selection style={{minHeight:'800px',padding:'40px',paddingTop:'100px', background:'linear-gradient(#decaca,#ed6d6d 0%,#cf3636 100%)'}}>
                        <h1>Prijavi se</h1>
                        {/*TODO ovde napraviti formu za prijavu */}{/*
                    </selection>);
                    default: return(<section id="pocetna" style={{minHeight:'800px',padding:'40px',paddingTop:'100px', background:'linear-gradient(#decaca,#ed6d6d 0%,#cf3636 100%)'}}>
                        <h1>Nutrition tracker</h1>
                        <input type="tekst"placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)}
                            style={{width:'100%',padding:'15px',border:'none',marginBottom:'20px'}}></input>
                        {/* <p style={{textAlign:'center'}}>Pronađeno {filterhrane.lenght} namirnica</p>*/}
            {/* ovde ide lepo da se prikazu pronadjenje namirnice */}{/*
                    </section>);
                    }
                })}
            </main>
         */}

            <section id="pocetna" style={{minHeight:'800px',padding:'40px',paddingTop:'100px', background:'linear-gradient(#decaca,#ed6d6d 0%,#cf3636 100%)'}}>
                <h1>Nutrition tracker</h1>
                <input type="tekst"placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)}
                    style={{width:'100%',padding:'15px',border:'none',marginBottom:'20px'}}></input>
                {/* <p style={{textAlign:'center'}}>Pronađeno {filterhrane.lenght} namirnica</p>*/}
                {/* ovde ide lepo da se prikazu pronadjenje namirnice */}
            </section>

            <footer style={{background:'#decaca', color:'#292121', padding:'20px 20px',textAlign:'center',marginTop:'auto'}}>

                <p style={{fontSize:'12px'}}>Nutrition tracker - Pingvini sa madagaskara</p>
            </footer>
            
        </>
    );
}

export default App;
