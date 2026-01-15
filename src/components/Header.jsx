function Header() {
    function drstr(path) {
        window.location.pathname = path;
    }

    return (
        <header style={{background:'#fcb59f', padding: '15px 0', width: '100%', top:'0', zIndex:'1000', display:'flex', alignItems:'center'}}>

    <a href="home"><img src="/name.png" alt="name png" style={{height:'40px', objectFit:'contain', marginRight:'20px', marginLeft:'10px'}} /></a>
  

    <nav style={{display:'flex', alignItems:'center', marginLeft:'auto'}}>
        <div style={{display:'flex', alignItems:'center'}}>
            <button onClick={() =>drstr('home')} 
                style={{padding:'10px 20px', background: window.location.pathname.startsWith("home") ? 'rgba(255,255,255,0.2)' : 'transparent',
                    color:'#292121', border:'none'}}>
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
        </div>
    </nav>
</header>

    );
}

export default Header;