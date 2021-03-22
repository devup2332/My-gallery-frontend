import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import LogoHeader from "../../../../assets/images/logo_header.png";
import LogoHeaderTablet from "../../../../assets/images/logo_header_tablet.png";
import { ReactComponent as MenuSVG } from "../../../../assets/icons/menu.svg";
import { ReactComponent as SearchSVG } from "../../../../assets/icons/search.svg";

const HeaderComponent = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  const [logo, setLogo] = useState(LogoHeader);

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

  const openMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navRef.current?.classList.toggle("bounce_menu");
    document.removeEventListener("click", closeNav);
    document.addEventListener("click", closeNav);
  };

  const setLogoListener = () => {
    const mql = window.matchMedia("(min-width:760px)");
    const tabletLogo = (ev: MediaQueryListEvent | MediaQueryList) => {
      if (ev.matches) {
        setLogo(LogoHeaderTablet);
      } else {
        setLogo(LogoHeader);
      }
    };
    mql.addEventListener("change", tabletLogo);
    tabletLogo(mql);
    return;
  };

  useEffect(() => {
    setLogoListener();
  }, []);
  return (
    <div className="header_component_container">
      <div className="subcontainer_header">
        <div className="rigth_container_header">
          <div className="logo_header_container">
            <img src={logo} alt="" />
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
        <button className="btn_menu_header" onClick={openMenu} ref={btnMenuRef}>
          <MenuSVG />
        </button>
        <nav className="navigation_header" ref={navRef}>
          <ul className="menu_navigation_header">
            <li className="menu_item_navigation">Login</li>
            <li className="menu_item_navigation">Register</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderComponent;
