import { Outlet } from "react-router";
import Header from "./components/Header";
import './Root.css';

function Root() {
    return (
        <>
            <Header/>
            <Outlet/>
            <footer className="Budinapodu">
                <p style={{fontSize:'1rem'}}>Nutrition tracker - Pingvini sa madagaskara</p>
            </footer>
        </>
    );
}

export default Root;