import { useState,useEffect } from 'react';
import axios from 'axios';
import "@tailwindplus/elements";

function Namirnice() {
    const [trazi, setTrazi] = useState('');
    const [hrana, setHrana] = useState([]);
    const [ucita,setUcita] = useState(true);
    const [eror, setEror] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const [limit, setLimit] = useState(32);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [type, setType] = useState(null);
    const [sort, setSort] = useState('id');
    const [order, setOrder] = useState('asc');
    const baza = '/api';

    function prevPage() {
        if (page > 1) setPage(page - 1);
    }

    function nextPage() {
        if (page < pages) setPage(page + 1);
    }

    async function uzmiNamirnice() {
        try{
            setUcita(true);
            setEror(null);
            const rensponse = await axios.get(`${baza}/ingredients`, { params: {limit: limit, page: page, sort: sort, order: order}});
            setHrana(rensponse.data);
            setUcita(false);

            const page_count = await axios.get(`${baza}/ingredients/pages`, { params: {limit: limit} });
            setPages(page_count.data);
        }
        catch(greska){
            setEror('Imamo gresku, jej');
            setUcita(false);
            console.error(greska);        
        }
    };

    function createSearchParams(lang) {
        const obj = { lang: lang, limit: limit, page: page };
        if (trazi.trim() !== '') obj.query = trazi;
        if (type) obj.type = type;
        if (sort) obj.sort = sort;
        if (order) obj.order = order; 
        return obj;
    }

    function createSearchPagesParams() {
        const obj = { limit: limit };
        if (trazi.trim() !== '') obj.query = trazi;
        if (type) obj.type = type;
        return obj;
    }

    async function tragac(pretrgo) {
        try {
            setUcita(true);
            setEror(null);
            const[rezsr, rezen] = await Promise.all([
                axios.get(`${baza}/ingredients/search`, {
                    params: createSearchParams('en')
                }),
                axios.get(`${baza}/ingredients/search`, {
                    params: createSearchParams('sr')
                })
            ]);
            const srez = [...rezsr.data, ... rezen.data];
            const filtrez = srez.filter((el, index, s) => index === s.findIndex((n) => n.id === el.id));
            const limited = filtrez.filter((el, index) => index < limit);
            setHrana(limited);
            setUcita(false);

            const page_count = await axios.get(`${baza}/ingredients/search/pages`, { params: createSearchPagesParams() });
            setPages(page_count.data);
        }
        catch(greska){
            console.error(greska);
            setEror('Imamo gresku, jej');
            setUcita(false);
        }
    };

    useEffect(() => {
        const page_buttons = document.getElementById('page-buttons');
        page_buttons.textContent = '';
        
        for (let i = 1; i <= pages; i++) {
            const page_button = document.createElement('button');
            page_button.innerText = i;
            page_button.id = `page-${i}-button`;
            page_button.classList.add(... 'cursor-pointer bg-[cornsilk] px-2 py-1 rounded-md border'.split(' '));
            page_button.onclick = (event) => { setPage(parseInt(event.target.innerText)); };
            page_buttons.appendChild(page_button);
        }

        const next_page_button = document.getElementById('next-page-button');
        if (page === pages) {
            next_page_button.classList.remove('cursor-pointer');
            next_page_button.classList.add('cursor-not-allowed');
        } else {
            next_page_button.classList.remove('cursor-not-allowed');
            next_page_button.classList.add('cursor-pointer');
        }
    }, [pages]);

    useEffect(() => {
        const prev_page_button = document.getElementById('prev-page-button');
        if (page === 1) {
            prev_page_button.classList.remove('cursor-pointer');
            prev_page_button.classList.add('cursor-not-allowed');
        } else {
            prev_page_button.classList.remove('cursor-not-allowed');
            prev_page_button.classList.add('cursor-pointer');
        }

        const next_page_button = document.getElementById('next-page-button');
        if (page === pages) {
            next_page_button.classList.remove('cursor-pointer');
            next_page_button.classList.add('cursor-not-allowed');
        } else {
            next_page_button.classList.remove('cursor-not-allowed');
            next_page_button.classList.add('cursor-pointer');
        }

        if (trazi.trim() === '' && !type) uzmiNamirnice();
        else tragac(trazi);
    }, [page]);

    useEffect(() => {
        if (type) {
            if (document.getElementById('types-reset')) return;
            const removeTypeFilter = document.createElement('button');
            removeTypeFilter.textContent = "Remove filter";
            removeTypeFilter.id = 'types-reset';
            removeTypeFilter.classList.add("italic", "text-[slategray]", "w-full", "text-right");
            removeTypeFilter.onclick = () => {
                document.getElementById(type).checked = false;
                setType(null);
            };
            document.getElementById('types-menu').appendChild(removeTypeFilter);
        } else {
            const removeTypeFilter = document.getElementById('types-reset');
            if (removeTypeFilter)
                document.getElementById('types-menu').removeChild(document.getElementById('types-reset'));
        }
    }, [type]);
    
    useEffect(()=> {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            setSearchTimeout(null);
        }

        setPage(1);
        if(trazi.trim() === '' && !type) uzmiNamirnice();
        else setSearchTimeout(setTimeout(() => {
            tragac(trazi);
        }, 300));
    }, [trazi, type, sort, order]);

    return (
        <>         
            <div className="namirnice">
                <div>
                    
                </div>
                <h1>Zderi brate, niko ne gleda</h1>
                <div className='flex flex-row w-full border-black border-2 justify-end space-x-5 pr-2 rounded-lg'>
                    <input type="text" placeholder="Ždrao sam..." value={trazi} onChange={(e)=>setTrazi(e.target.value)} className='w-full h-10 p-2 pl-4 rounded-lg'/>

                    <el-dropdown className='h-10'>
                        <button className='h-full cursor-pointer'><img src="/filter.svg" alt="filter" className='h-full'/></button>
                        <el-menu anchor="bottom end" popover className="origin-top-right bg-[cornsilk] rounded-b-lg border-2">
                            <div id='types-menu' className='inline-block p-3.5 space-y-2'>
                                <label htmlFor='fruit' className="block">
                                    <input type="radio" name="type" id="fruit" onClick={element => setType(element.target.id)}/>
                                    Voće
                                </label>
                                <label htmlFor='vegetable' className="block">
                                    <input type="radio" name="type" id="vegetable" onClick={element => setType(element.target.id)}/>
                                    Povrće
                                </label>
                                <label htmlFor='animal product' className="block">
                                    <input type="radio" name="type" id="animal product" onClick={element => setType(element.target.id)}/>
                                    Životinjski Proizvodi
                                </label>
                            </div>
                        </el-menu>
                    </el-dropdown>

                    <el-dropdown className='h-10 inline-block'>
                        <button className='h-full cursor-pointer'><img src="/sort.svg" alt="sort" className='h-full'/></button>
                        <el-menu anchor="bottom end" popover className="origin-top-right bg-[cornsilk] rounded-b-lg border-2 divide-y-2">
                            <div className='p-3.5 space-y-2'>
                                <label htmlFor='sort-id' className='block'>
                                    <input type="radio" name="sort" id="sort-id" onClick={event => setSort(event.target.id.split('-')[1])}/>
                                    Default
                                </label>
                                <label htmlFor='sort-name_sr' className='block'>
                                    <input type="radio" name="sort" id="sort-name_sr" onClick={event => setSort(event.target.id.split('-')[1])}/>
                                    Ime (SR)
                                </label>
                                <label htmlFor='sort-name_end' className='block'>
                                    <input type="radio" name="sort" id="sort-name_en" onClick={event => setSort(event.target.id.split('-')[1])}/>
                                    Ime (EN)
                                </label>
                                <label htmlFor='sort-kcal' className='block'>
                                    <input type="radio" name="sort" id="sort-kcal" onClick={event => setSort(event.target.id.split('-')[1])}/>
                                    Calorije (kcal)
                                </label>
                                <label htmlFor='sort-protein' className='block'>
                                    <input type="radio" name="sort" id="sort-protein" onClick={event => setSort(event.target.id.split('-')[1])}/>
                                    Proteini
                                </label>
                                <label htmlFor='sort-carbohydrates' className='block'>
                                    <input type="radio" name="sort" id="sort-carbohydrates" onClick={event => setSort(event.target.id.split('-')[1])}/>
                                    Ugljeni Hidrati
                                </label>
                                <label htmlFor='sort-fats' className='block'>
                                    <input type="radio" name="sort" id="sort-fats" onClick={event => setSort(event.target.id.split('-')[1])}/>
                                    Masti
                                </label>
                            </div>
                            <div className='p-3.5 space-y-2'>
                                <label htmlFor='sort-asc' className='block'>
                                    <input type="radio" name="order" id="sort-asc" onClick={event => setOrder(event.target.id.split('-')[1])}/>
                                    Ascending
                                </label>
                                <label htmlFor='sort-desc' className='block'>
                                    <input type="radio" name="order" id="sort-desc" onClick={event => setOrder(event.target.id.split('-')[1])}/>
                                    Descending
                                </label>
                            </div>
                        </el-menu>
                    </el-dropdown>
                </div>

                <div className='flex justify-center space-x-4 mt-3.75'>
                    <button id='prev-page-button' className='cursor-pointer bg-[cornsilk] px-2 py-1 rounded-md border' onClick={prevPage}>&lt;</button>
                    <div id='page-buttons' className='flex space-x-2'></div>
                    <button id='next-page-button' className='cursor-pointer bg-[cornsilk] px-2 py-1 rounded-md border' onClick={nextPage}>&gt;</button>
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
                        <p>test</p>
                    </div>
                )}
            </div>   
        </>
    );
}

export default Namirnice;