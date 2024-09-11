import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for HTTP requests
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.css"; // Custom styles if needed

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/token/", {
        email,
        password,
      });

      const { token } = response.data;

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Redirect to the calendar page after successful login
      navigate("/calendar");
    } catch (error) {
      console.error("Error during login:", error);
      // You can add an alert or error message to the user here
    }
  };

  return (
    <div className="auth-page-wrapper pt-5">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#0099ff"
              fillOpacity="0.5"
              d="M0,256L48,250.7C96,245,192,235,288,213.3C384,192,480,160,576,144C672,128,768,128,864,149.3C960,171,1056,213,1152,208C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <a href="/login" className="d-inline-block auth-logo">
                    <b></b>
                  </a>
                </div>
                <p className="mt-3 fs-15 fw-medium">DentalCare Website</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back!</h5>
                    <p className="text-muted">
                      Sign in to continue to DentalCare.
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="password-input">
                          Password <span className="text-danger">*</span>
                        </label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type="password"
                            className="form-control password-input pe-5"
                            name="password"
                            placeholder="Enter password"
                            id="password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="auth-remember-check"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="auth-remember-check"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <p className="mb-0  text-center">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <p className="mb-0 text-muted">
                  &copy; {new Date().getFullYear()} DentalCare Nacl{" "}
                  <i className="mdi mdi-heart text-danger"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
