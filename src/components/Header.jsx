function Header() {
    function drstr(path) {
        window.location.pathname = path;
    }

    return (
        <header style={{background:'#fcf5f5', padding: '15px 0', position: 'fixed', width: '100%',top:'0',zIndex:'1000'}}>
            <nav style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
                <button onClick={() =>drstr('home')} 
                    style={{padding:'10px 20px', background: window.location.pathname.startsWith("home") ? 'rgba(255,255,255,0.2)' : 'transparent',
                        color:'#292121', border:'none'
                    }}>
                    Početna
                </button>
                <button onClick={() =>drstr('namirnice')} 
                    style={{padding:'10px 20px', background: window.location.pathname.startsWith("namirnice")?'rgba(255,255,255,0.2)' : 'transparent',
                        color:'#292121', border:'none'}}>
                    Namirnice
                </button>
                <button onClick={() =>drstr('contact')} 
                    style={{padding:'10px 20px', background: window.location.pathname.startsWith("contact") ? 'rgba(255,255,255,0.2)' : 'transparent',
                        color:'#292121', border:'none'}}>
                    Kontakt
                </button>
                <button onClick={() =>drstr('login')} 
                    style={{padding:'10px 20px', background: window.location.pathname.startsWith("login")?'rgba(255,255,255,0.2)' : 'transparent',
                        color:'#292121', border:'none'}}>
                    Prijavi se
                </button>
            </nav>
        </header>
    );
}

export default Header;