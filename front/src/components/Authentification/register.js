import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    age: "",
    phone_number: "",
    address: "",
    password: "",
    role: "patient", // Default role set to patient, can be changed to dentist
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        formData
      );
      console.log("Registration successful", response.data);
      // Redirect or clear form if needed
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please try again.");
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
                <p className="mt-3 fs-15 fw-medium">Dentalcare Website</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Create New Account</h5>
                    <p className="text-muted">
                      Get your free DentalCare account now
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <form
                      className="needs-validation"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-3">
                        <label htmlFor="useremail" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="useremail"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter email
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          id="username"
                          placeholder="Enter username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter username
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          id="first_name"
                          placeholder="Enter first name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          id="last_name"
                          placeholder="Enter last name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                          Age
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="age"
                          id="age"
                          placeholder="Enter age"
                          value={formData.age}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="phone_number" className="form-label">
                          Phone Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone_number"
                          id="phone_number"
                          placeholder="Enter phone number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <textarea
                          className="form-control"
                          name="address"
                          id="address"
                          placeholder="Enter address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="userpassword" className="form-label">
                          Password <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="userpassword"
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter password
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="role" className="form-label">
                          Role <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-control"
                          name="role"
                          id="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                        >
                          <option value="dentist">Dentist</option>
                          <option value="patient">Patient</option>
                        </select>
                      </div>
                      <div className="mt-3">
                        <button className="btn btn-success w-100" type="submit">
                          Sign Up
                        </button>
                      </div>
                      {error && (
                        <p className="error text-danger mt-2">{error}</p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    Sign In
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

export default Register;
