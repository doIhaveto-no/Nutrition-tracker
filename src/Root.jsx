import { Outlet } from "react-router";
import Header from "./components/Header";
import './Root.css';

function Root() {
    return (
        <>
            <Header/>
            <Outlet/>
            <footer style={{background:'#decaca', color:'#292121', padding:'20px 20px',textAlign:'center',marginTop:'auto', bottom:'0'}}>
                <p style={{fontSize:'12px'}}>Nutrition tracker - Pingvini sa madagaskara</p>
            </footer>
        </>
    );
}

export default Root;