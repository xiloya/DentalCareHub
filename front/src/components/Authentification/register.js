import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.css";
import { FaUser, FaTooth } from "react-icons/fa"; // Importing icons

const Register = () => {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    dob: "",
    phone_number: "",
    address: "",
    password: "",
    confirm_password: "",
    specialization: "", // For dentists
    medical_history: "", // For patients
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

    // Prevent sending confirm_password to the backend
    const { confirm_password, ...dataToSend } = formData;

    const url =
      role === "dentist"
        ? "http://127.0.0.1:8000/register/dentist/"
        : "http://127.0.0.1:8000/register/patient/";

    try {
      const response = await axios.post(url, dataToSend);
      console.log("Registration successful", response.data);
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

      {role === null ? (
        <div className="role-popup">
          <div className="popup-content">
            <h5>Select Your Role</h5>
            <div className="role-buttons">
              <button
                className="btn btn-primary"
                onClick={() => setRole("dentist")}
              >
                <FaTooth className="me-2" /> Dentist
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setRole("patient")}
              >
                <FaUser className="me-2" /> Patient
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="auth-page-content">
          <div className="container">
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

                        <div className="row">
                          <div className="col-md-6 mb-3">
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
                          <div className="col-md-6 mb-3">
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
                        </div>

                        <div className="mb-3">
                          <label htmlFor="dob" className="form-label">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="dob"
                            id="dob"
                            placeholder="Enter date of birth"
                            value={formData.dob}
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

                        {role === "dentist" && (
                          <div className="mb-3">
                            <label
                              htmlFor="specialization"
                              className="form-label"
                            >
                              Specialization
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="specialization"
                              id="specialization"
                              placeholder="Enter specialization"
                              value={formData.specialization}
                              onChange={handleChange}
                            />
                          </div>
                        )}

                        {role === "patient" && (
                          <div className="mb-3">
                            <label
                              htmlFor="medical_history"
                              className="form-label"
                            >
                              Medical History
                            </label>
                            <textarea
                              className="form-control"
                              name="medical_history"
                              id="medical_history"
                              placeholder="Enter medical history"
                              value={formData.medical_history}
                              onChange={handleChange}
                            />
                          </div>
                        )}

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label
                              htmlFor="userpassword"
                              className="form-label"
                            >
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
                          </div>
                          <div className="col-md-6 mb-3">
                            <label
                              htmlFor="confirm_password"
                              className="form-label"
                            >
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="confirm_password"
                              id="confirm_password"
                              placeholder="Confirm password"
                              value={formData.confirm_password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        {error && (
                          <div className="error text-danger mt-2">{error}</div>
                        )}

                        <div className="mt-4">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <p className="mb-0 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="fw-semibold text-primary">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
