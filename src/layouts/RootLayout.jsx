import { Outlet } from "react-router"
import Footer from "../pages/shared/Footer/Footer"
import NavBar from "../pages/shared/NavBar/NavBar"

const RootLayout=()=>{

    return(
        <div className="flex flex-col px-0.5 border-4 border-emerald-500/10 max-w-7xl mx-auto min-h-screen">
            <NavBar/>
            <div className="flex-1"><Outlet/></div>
            <Footer/>
        </div>
    )
}

export default RootLayout;