
import { NavLink, Link } from "react-router-dom";
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import "./header.scss"
import { useEffect, useRef } from "react";

function Header(){
    // Giả sử bạn có state để check user đã login chưa
    const isLoggedIn = false; // Thay bằng logic check login thực tế của bạn
    
    const navLinks = [
        {
            path: "home",
            name: "Trang chủ"
        },
        {
            path: "aboutPage",
            name: "Giới thiệu"
        },
        {
            path: "servicePage",
            name: "Dịch vụ"
        },
        {
            path: "bookingPage",
            name: "Đặt lịch"
        }
    ]

    const headerRef = useRef(null);
    const menuRef = useRef(null);

    const handleStickyHeader = () => {
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
            headerRef.current?.classList.add('sticky__header');
        } else {
            headerRef.current?.classList.remove('sticky__header'); // Fixed typo here
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleStickyHeader);

        return () => window.removeEventListener('scroll', handleStickyHeader);
    }, []);

    const toggleMenu = () => menuRef.current?.classList.toggle('show__menu');

    return (
        <>
            <header className="header" ref={headerRef}>
                <div className="container">
                    <div className="header__main">

                        {/* ======= LOGO ======= */}
                        <div>DentCare</div>

                        {/* ======= MENU =======  */}
                        <div className="menu" ref={menuRef} onClick={toggleMenu}>
                            <ul className="menu--list">
                                {navLinks.map((links, index) => (
                                    <li key={index} >
                                        <NavLink to={links.path} className={({ isActive }) => isActive ? "menu__item--active" : "menu__item"}>
                                            {links.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ======= NAV RIGHT =======  */}
                        <div className="header__nav--right">
                            {isLoggedIn && (
                                <div className="nav__user logged-in">
                                    <Link to='profile'>
                                        <div className="nav__right--icons">
                                            <UserOutlined />
                                        </div> 
                                    </Link>
                                </div>
                            )}

                            {!isLoggedIn && (
                                <Link to='login'>
                                    <button className="btn__login">Login</button>
                                </Link>
                            )}

                            <span className="menu__icon" onClick={toggleMenu}>
                                <MenuOutlined />
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;  