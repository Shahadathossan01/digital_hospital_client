import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";


const Main = () => {
    return (
        <>
            <div style={{marginBottom:'80px'}}>
                <Navbar></Navbar>
            </div>
            <div >
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default Main;