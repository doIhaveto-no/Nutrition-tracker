import { Outlet } from "react-router";
import Header from "./components/Header";
import './Root.css';

function Root() {
    return (
        <>
            <div className="molimte">
            <Header/>
            <div className="glavno">
            <Outlet/></div>
            <footer className="Budinapodu">
                <p style={{fontSize:'1rem'}}>Nutrition tracker - Pingvini sa madagaskara</p>
            </footer>
            </div>
        </>
    );
}

export default Root;