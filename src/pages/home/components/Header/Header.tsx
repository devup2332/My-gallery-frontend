import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import { ReactComponent as LogoMovileSVG } from "../../../../assets/icons/logo_movile.svg";
import { ReactComponent as LogoTabletSVG } from "../../../../assets/icons/logo_tablet.svg";
import { ReactComponent as MenuSVG } from "../../../../assets/icons/menu.svg";
import { ReactComponent as SearchSVG } from "../../../../assets/icons/search.svg";
import { useHistory } from "react-router";
import { HeaderProps } from "../../../../models/header-home";

const HeaderComponent = ({ user }: HeaderProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [changeLogo, setChangeLogo] = useState(false);
  const history = useHistory();

  const closeNav = (e: MouseEvent) => {
    if (
      e.target !== btnMenuRef.current &&
      e.target !== btnMenuRef.current?.children[0] &&
      e.target !== btnMenuRef.current?.children[0].children[0] &&
      e.target !== btnMenuRef.current?.children[0].children[1] &&
      e.target !== btnMenuRef.current?.children[0].children[2] &&
      e.target !== btnMenuRef.current?.children[0].children[3]
    ) {
      navRef.current?.classList.remove("bounce_menu");
      document.removeEventListener("click", closeNav);
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("t1ks1ehn");
    history.push("/");
  };

  const openMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navRef.current?.classList.toggle("bounce_menu");
    document.removeEventListener("click", closeNav);
    document.addEventListener("click", closeNav);
  };

  const setLogoListener = () => {
    const mql = window.matchMedia("(min-width:760px)");
    const tabletLogo = (ev: MediaQueryListEvent | MediaQueryList) => {
      if (ev.matches) {
        setChangeLogo(true);
      } else {
        setChangeLogo(false);
      }
    };
    mql.addEventListener("change", tabletLogo);
    tabletLogo(mql);
    return;
  };

  const goToRegister = () => {
    history.push("/register");
  };

  useEffect(() => {
    setLogoListener();
    document.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 100) {
        headerRef.current?.classList.add("down");
      } else {
        headerRef.current?.classList.remove("down");
      }
    });
    return;
  }, []);
  return (
    <div className="header_component_container" ref={headerRef}>
      <div className="subcontainer_header">
        <div className="rigth_container_header">
          <div className="logo_header_container">
            {changeLogo ? <LogoTabletSVG /> : <LogoMovileSVG />}
          </div>
          <form className="input_search_container">
            <input
              type="text"
              className="input_search_header"
              placeholder="Search"
            />
            <button type="submit" className="btn_search_header">
              <SearchSVG />
            </button>
          </form>
        </div>
        {user ? (
          <button
            className="btn_user_profile"
            ref={btnMenuRef}
            onClick={openMenu}
          >
            <img src={user.avatar} alt="" />
          </button>
        ) : (
          <button
            className="btn_menu_header"
            onClick={openMenu}
            ref={btnMenuRef}
          >
            <MenuSVG />
          </button>
        )}

        {user ? (
          <nav className="navigation_header user" ref={navRef}>
            <ul className="menu_navigation_header">
              <li className="menu_item_navigation">Add Photo</li>
              <li className="menu_item_navigation">Profile</li>
              <li className="menu_item_navigation" onClick={logOutUser}>
                Log Out
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="navigation_header noUser" ref={navRef}>
            <ul className="menu_navigation_header">
              <li className="menu_item_navigation">Login</li>
              <li className="menu_item_navigation" onClick={goToRegister}>
                Register
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
