import { Outlet } from "react-router";
import Header from "./components/Header";

function Root() {
    return (
        <>
            {
                //<Header/>
            }
            <Outlet/>
            <footer style={{background:'#decaca', color:'#292121', padding:'20px 20px',textAlign:'center',marginTop:'auto'}}>
                <p style={{fontSize:'12px'}}>Nutrition tracker - Pingvini sa madagaskara</p>
            </footer>
        </>
    );
}

export default Root;