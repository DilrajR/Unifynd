import logo from "../../assets/tmu_logo.svg";
import "./Navbar.css";

function Navbar() {
  function handleClick() {
    const mobileNav = document.querySelector(".mobile-nav");
    mobileNav.classList.toggle("clicked");
  }
  return (
    <>
      <div className="navbar">
        <nav>
          <div className="logo">
            <img src={logo} alt="TMU Logo" width={100} height={100} />
            <h1 className="sitename">UniFynd</h1>
          </div>
          <button className="hamburger-btn" onClick={handleClick}>
            ☰
          </button>
          <ul className="large-links">
            <li>
              <a href="/Home">Home</a>
            </li>
            <li>
              <a href="/AddItem">Add Post</a>
            </li>
            <li>
              <a href="/Admin">Admin</a>
            </li>
            <li>
              <a href="/Profile">Profile</a>
            </li>
            <li>
              <a href="/">Logout</a>
            </li>
          </ul>
        </nav>
        <div className="mobile-nav">
          <ul>
            <li>
              <a href="/Home">Home</a>
            </li>
            <li>
              <a href="/AddItem">Add Post</a>
            </li>
            <li>
              <a href="/Admin">Admin</a>
            </li>
            <li>
              <a href="/Profile">Profile</a>
            </li>
            <li>
              <a href="/">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
