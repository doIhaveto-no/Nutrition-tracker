import { useState,useEffect } from 'react';
import axios from 'axios';
function Namirnice() {
    const [trazi, setTrazi] = useState('');
    const [hrana, setHrana] = useState([]);
    const [ucita,setUcita] =useState(true);
    const [eror, setEror] = useState(null);
    const [page, setPage] = useState(2);
    const baza = '/api';

    function prevPage() {
        if (page > 1) setPage(page - 1);
    }

    function nextPage() {
        setPage(page + 1);
    }

    async function uzmiNamirnice() {
        try{
            setUcita(true);
            setEror(null);
            const rensponse = await axios.get(`${baza}/ingredients`, { params: {limit: 32, page: page}});
            setHrana(rensponse.data);
            setUcita(false);
        }
        catch(greska){
            setEror('Imamo gresku, jej');
            setUcita(false);
            console.error(greska);        
        }
    };

    async function tragac(pretrgo) {
        try{
            setUcita(true);
            setEror(null);
            const[rezsr, rezen] = await Promise.all([
                axios.get(`${baza}/ingredients/search`, {
                    params: {query:pretrgo, lang:'en', limit: 32, page: page}
                }),
                axios.get(`${baza}/ingredients/search`, {
                    params: {query:pretrgo, lang:'sr', limit: 32, page: page}
                })
            ]);
            const srez = [...rezsr.data, ... rezen.data];
            const filtrez = srez.filter((el, index, s) => index=== s.findIndex((n) => n.id ===el.id));
            const limited = filtrez.filter((el, index) => index < 32);
            setHrana(limited);
            setUcita(false);
        }
        catch(greska){
            console.error(greska);
            setEror('Imamo gresku, jej');
            setUcita(false);
            
        }
    };

    useEffect(() => {
        uzmiNamirnice();
    }, [page]);

    useEffect(()=> {
        if(trazi.trim() === ''){
            uzmiNamirnice();
            return;
        } else {
            tragac(trazi);
        }
    },[trazi]);


    return (
        <>         
            <div className="namirnice">
                <h1>Zderi brate, niko ne gleda</h1>
                <input type="text"placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)}
                    style={{width:'100%',padding:'15px',border:'none',marginBottom:'20px'}}/>
                <div className='flex justify-center space-x-5'>
                    <button className='cursor-pointer bg-[cornsilk] px-2 py-1 rounded-md' onClick={prevPage}>&lt;</button>
                    <button className='cursor-pointer bg-[cornsilk] px-2 py-1 rounded-md' onClick={nextPage}>&gt;</button>
                </div>
                {!ucita && !eror && hrana.length > 0 &&(
                    <div className ="listanamir">
                        {hrana.map(namirnice =>(
                            <div key={namirnice.id} className="namirnica">
                                <div className="grid grid-flow-col justify-between">
                                    <h3 className=''>{namirnice.name_sr}</h3>
                                    <h3 className='english'>{namirnice.name_en}</h3>
                                    <strong className='row-span-2 col-start-2 text-3xl'>{namirnice.kcal} kcal</strong>
                                </div>
                                <div className ="gluposti">
                                    <span>Proteini:</span> <strong>{namirnice.protein} g</strong>
                                    <br/>
                                    <span>Ugljeni hidrati:</span> <strong>{namirnice.carbohydrates} g</strong>
                                    <br/>
                                    <span>Masti:</span> <strong>{namirnice.fats} g</strong>
                                </div>
                                <p className='text-right italic text-[slategray]'>Sve je /100g</p>
                            </div>
                           
                        ))}
                    </div>
                )}
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