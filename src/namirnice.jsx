import { useState,useEffect } from 'react';
import axios from 'axios';
function Namirnice() {
    const [trazi, setTrazi] = useState('');
    const [hrana, setHrana] = useState([]);
    const [ucita,setUcita] =useState(true);
    const [eror, setEror] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const baza = '/api';

    const uzmiNamirnice = async () =>{
        try{
            setUcita(true);
            setEror(null);
            const rensponse = await axios.get(`${baza}/ingredients`);
            setHrana(rensponse.data);
            setUcita(false);
        }
        catch(greska){
            setEror('Imamo gresku, jej');
            setUcita(false);
            console.error(greska);        
        }
    };

    const tragac = async(pretrgo) =>{
        try{
            setUcita(true);
            setEror(null);
            const[rezsr, rezen] = await Promise.all([
                axios.get(`${baza}/ingredients/search`, {
                    params: {query:pretrgo, lang:'en'}
                }),
                axios.get(`${baza}/ingredients/search`, {
                    params: {query:pretrgo, lang:'sr'}
                })
            ]);
            const srez = [...rezsr.data, ... rezen.data];
            const filtrez = srez.filter((el, index, s) => index=== s.findIndex((n) => n.id ===el.id));
            setHrana(filtrez);
            setUcita(false);
        }
        catch(greska){
            setEror('Imamo gresku, jej');
            setUcita(false);
            
        }
    };

    useEffect(() => {
        uzmiNamirnice();
    }, []);

    useEffect(()=> {
        if(searchTimeout) {
            clearTimeout(searchTimeout);
        }
        if(trazi.trim() ===''){
            uzmiNamirnice();
            return;
        }
        const ovid = setTimeout(() =>{
            tragac(trazi);
        });
        setSearchTimeout(ovid);
        return() => {
            clearTimeout(ovid);
        };
    },[trazi]);


    return (
        <>         
            <div className="namirnice">
                <h1>Zderi brate, niko ne gleda</h1>
                <input type="text"placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)}
                    style={{width:'100%',padding:'15px',border:'none',marginBottom:'20px'}}></input>
                {!ucita && !eror && hrana.length > 0 &&(
                    <div className ="listanamir">
                        {hrana.map(namirnice =>(
                            <div key={namirnice.id} className="namirnica">
                                <h3>{namirnice.name_sr}</h3>
                                <p className="english">{namirnice.name_en}</p>
                                <div className ="gluposti">
                                    <span>Kalorije:</span> <strong>{namirnice.protein}g</strong>
                                    <span>Ugljeni hidrati:</span> <strong>{namirnice.carbohydrates}g</strong>
                                    <span>Masti:</span> <strong>{namirnice.fats}g</strong>
                                </div>
                            </div>
                           
                        ))};
                    </div>
                )};
                {!ucita && !eror && hrana.lenght === 0 && trazi !== ''&& (
                    <div className="umro">
                        <p></p>
                    </div>
                )}
            </div>   
        </>
    );
}

export default Namirnice;