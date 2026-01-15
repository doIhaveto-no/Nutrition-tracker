import { useState,useEffect } from 'react';
import axios from 'axios'
function Namirnice() {
   // const [trenstr, setTrenstr] = useState('pocetna'); 
    const [trazi, setTrazi] = useState('');
    const [klik, setKlik] = useState(false);
    const [hrana, setHrana] = useState([]);
    const [ucita,setUcita] =useState(true);
    const [eror, setEror] = useState(null);


    useEffect(() => {
        uzmiNamirnice();
    }, []);
    //TODO zameniti listu hrana pozivom na API
    const  uzmiNamirnice = async () => {
        try{
            const response = await axios.get('http://localhost:5173/api/ingredients');
            setHrana(response.data.map(item =>({
                id: item.id,
                name_sr: item.name_sr,
                name_en: item.name_en,
                kcal: item.kcal,
                protein: item.protein,
                carbohydrates: item.carbohydrates,
                fats: item.fats,
                type: item.type
            })));
            setUcita(false);
        }
        catch(greska){
            setEror('Imamo gresku, jej');
            setUcita(false);
            console.error(greska);
        }
    };

    const filterhrane = uzmiNamirnice.filter(uzmiNamirnice=> uzmiNamirnice.name_sr.toLowerCase().includes(trazi.toLowerCase()));
    //const drstr = (str) =>{setTrenstr(str);};
    useEffect(() =>{
        console.log("Da li je stranica uxitana");
    },[]);
    return (
        <>            
            <section className="full-screen" style={{background:'linear-gradient(#decaca,#f58488 0%,#ff1a22 100%)'}}>
                <h1>Zderi brate, niko ne gleda</h1>
                <input type="tekst"placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)}
                    style={{width:'100%',padding:'15px',border:'none',marginBottom:'20px'}}></input>
                {/* <p style={{textAlign:'center'}}>Pronađeno {filterhrane.lenght} namirnica</p>*/}
                {/* ovde ide lepo da se prikazu pronadjenje namirnice */}
            </section>
        </>
    );
}

export default Namirnice;