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

            <section className="full-screen" style={{background:'linear-gradient(#decaca,#ed6d6d 0%,#cf3636 100%)'}}>
                <h1>Nutrition Tracker</h1>
                <input type="tekst"placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)}
                    style={{width:'100%',padding:'15px',border:'none',marginBottom:'20px'}}></input>
                {/* <p style={{textAlign:'center'}}>Pronađeno {filterhrane.lenght} namirnica</p>*/}
                {/* ovde ide lepo da se prikazu pronadjenje namirnice */}
            </section>

            
            
        </>
    );
}

export default App;
