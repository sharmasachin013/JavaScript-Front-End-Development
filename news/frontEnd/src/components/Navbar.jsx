import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://dev-newsdrupalbackend.pantheonsite.io/api/news-menu-api/main"
    )
      .then((response) => response.json())
      .then((data) => setMenuItems(data || []))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2 py-lg-0 px-lg-5">
        <a href="/" className="navbar-brand d-block d-lg-none">
          <h1 className="m-0 display-4 text-uppercase text-primary">
            Biz<span className="text-white font-weight-normal">News</span>
          </h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between px-0 px-lg-3"
          id="navbarCollapse"
        >
          <div className="navbar-nav mr-auto py-0">
            {menuItems.map((item, index) => (
              <a key={index} href={item.url} className="nav-item nav-link">
                {item.title}
              </a>
            ))}

            {/* Static Dropdown */}
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Dropdown
              </a>
              <div className="dropdown-menu rounded-0 m-0">
                <a href="#" className="dropdown-item">
                  Menu item 1
                </a>
                <a href="#" className="dropdown-item">
                  Menu item 2
                </a>
                <a href="#" className="dropdown-item">
                  Menu item 3
                </a>
              </div>
            </div>
          </div>

          <div
            className="input-group ml-auto d-none d-lg-flex"
            style={{ width: "100%", maxWidth: "300px" }}
          >
            <input
              type="text"
              className="form-control border-0"
              placeholder="Keyword"
            />
            <div className="input-group-append">
              <button className="input-group-text bg-primary text-dark border-0 px-3">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
