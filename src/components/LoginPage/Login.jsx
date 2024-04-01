import logo from "../../assets/tmu_logo.svg";
import "./Login.css";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="login-component main-wrap">
        <main className="login">
          <div className="img-wrap">
            <img src={logo} alt="TMU Logo" width={100} height={100} />
          </div>
          <h1 className="sitename">UniFynd</h1>
          <form>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button className="login-btn">Login</button>
            <a href="/signup" className="register-btn">
              Register
            </a>
            <a href="/home" className="register-btn">
              Home (temp)
            </a>
          </form>
        </main>
      </div>
    </>
  );
}

export default Login;
