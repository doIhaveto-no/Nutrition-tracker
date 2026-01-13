function Header() {
    return (
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
    );
}

export default Header;