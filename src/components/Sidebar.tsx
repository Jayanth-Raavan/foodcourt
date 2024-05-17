import { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenu = () => {
        setShowMenu(!showMenu);
    };
    const hideMenu =()=>{
        setShowMenu(false);
    }

    return (
        <div className={` mt-3 sidebar ${showMenu ? 'show' : ''}`}>
            <button className={`btn menu-button ${showMenu ? 'shifted' : ''}`} onClick={handleMenu}>
                <i className={`text-white bi ${showMenu ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
            <ul className="list-group">
                <li className="list-group-item bg-transparent empty-list" onClick={hideMenu}></li>
                <li className="list-group-item active bg-transparent" aria-current="true">
                <Link className='text-decoration-none text-white' to={'/'} onClick={hideMenu}>Dashboard</Link>
                </li>
                <li className="list-group-item bg-transparent">
                    <Link className='text-decoration-none text-white' to={'/starters'} onClick={hideMenu}>Starters</Link>
                </li>
                {/* <li className="list-group-item bg-transparent">Soups</li>
                <li className="list-group-item bg-transparent">Biryani</li>
                <li className="list-group-item bg-transparent">Biryani</li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
