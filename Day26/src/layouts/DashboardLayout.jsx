import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({
    darkMode,
    setDarkMode,
    collapsed,
    setCollapsed
}) {
    return(
        <div className="min-h-screen">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <div
                style={{
                    marginLeft:
                        window.innerWidth >= 768
                            ? (collapsed ? "80px" : "288px")
                            : "0px"
                }}
                className="min-h-screen transition-all duration-300"
            >
                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                <Outlet/>
            </div>
        </div>
    );
}

export default DashboardLayout;