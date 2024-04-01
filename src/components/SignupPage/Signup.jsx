import { useState } from "react";
import logo from "../../assets/tmu_logo.svg";
import "./Signup.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <div className="signup-component main-wrap1">
        <main className="signup">
          <div className="img-wrap">
            <img className="" src={logo} alt="TMU Logo" width={100} height={100} />
          </div>
          <h1 className="sitename">UniFynd</h1>
          <form className="signup">
            {/* name w/ first and last being side-to-side*/}
            <div className="names">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="name firstName"
                type="text"
                placeholder="First Name"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="name lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            {/* email */}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username"
              type="text"
              placeholder="Username"
            />
            {/* email */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email"
              type="email"
              placeholder="Email"
            />
            {/* password */}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password"
              type="password"
              placeholder="Password"
            />
            {/* confirm password */}
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="confirm-password"
              type="password"
              placeholder="Confirm Password"
            />
            {/* signup button */}
            <button className="signup-btn">Sign Up</button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Signup;
