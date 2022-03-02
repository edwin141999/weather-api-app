import { NavLink } from "react-router-dom";

function Navbar() {
    const styles = {
        linkDeactived: `rounded-lg px-3 py-2 text-white font-semibold hover:bg-white hover:text-slate-900`,
        linkActive: `rounded-lg px-3 py-2 text-black font-semibold bg-white text-slate-900`
    }

    return (
        <nav className="bg-gray-800">
            <div className="px-2 mx-auto max-w 7x1 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16 ">
                    <div className="sm:block sm:ml-6">
                        <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                            <div className="flex space-x-4">
                                <NavLink to="/" className={({ isActive }) => isActive ? styles.linkActive : styles.linkDeactived} >Inicio</NavLink>
                                <NavLink to="/current" className={({ isActive }) => isActive ? styles.linkActive : styles.linkDeactived} >Dia actual</NavLink>
                                <NavLink to="/days" className={({ isActive }) => isActive ? styles.linkActive : styles.linkDeactived}>3 dias</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;