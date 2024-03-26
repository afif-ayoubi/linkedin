import React from "react";
import "./style.css";
import google from "../../assets/google.svg";
import linkedin from "../../assets/linkedin.svg";
import bg from "../../assets/bg.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!credentials.email.includes("@")) {
      setError("Invalid email");
    } else if (credentials.password.length < 6) {
      setError("Short password");
    } else {
      setError("");
    }
  }, [credentials]);
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="logo-site">
            <a href="#" className="logo-link">
              <img src={linkedin} alt="" />
            </a>
          </div>
          <div className="navigation">
            <a href="#" className="btn-register">
              register
            </a>
            <a href="#" className="btn-login">
              login in
            </a>
          </div>
        </div>
      </nav>
      <div className="home">
        <div className="container">
          <div className="items">
            <div className="item">
              <div className="content">
                <h1>Find a Job through your community</h1>
                <form action="" method="post">
                  <div className="line">
                    <label htmlFor="email">Email </label>
                    <div className="field">
                      <input
                        type="text"
                        className="input"
                        placeholder=""
                        onChange={(e) => {
                          console.log(e.target.value);
                          setCredentials({
                            ...credentials,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="line">
                    <label htmlFor="email">Password</label>
                    <div className="field">
                      <input
                        type="text"
                        className="input"
                        placeholder=""
                        onChange={(e) => {
                          console.log(e.target.value);
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          });
                        }}
                      />
                      <span className="icon">display</span>
                    </div>
                  </div>
                  <a href="#" className="forgot">
                    Forgot your password ?
                  </a>

                  <div className="btns">
                    <button
                      className="btn-login"
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          const formData = new FormData();
                          const { email, password } = credentials;
                          formData.append("email", email);
                          formData.append("password", password);
                          
                          const response = await axios.post(
                            "http://localhost/linkedin_clone_backend/signin.php",
                            formData
                          );

                          console.log(response.data);

                          if (response.data.status === "success") {
                            console.log("login success");
                          } else {
                            setError(
                              "Login failed. Please check your credentials."
                            );
                          }
                        } catch (error) {
                          console.error(error);
                          setError(
                            "An error occurred during login. Please try again later."
                          );
                        }
                      }}
                    >
                      login
                    </button>
                  </div>
                </form>

                <div className="or">
                  <span>or</span>
                </div>

                <div className="terms">
                  <p>
                    By clicking Continue, you agree to Linkedin{" "}
                    <a href="#">Terms of Service</a>,{" "}
                    <a href="#">Privacy Policy</a>, and{" "}
                    <a href="#">Cookie Policy</a>
                  </p>
                </div>

                <button className="btn-google">
                  <img src={google} alt="" height="30" />
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
            <div className="item">
              <div className="image">
                <img src={bg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
