import React from 'react';
import doctor from '../../../images/doctor.png';
import './Appointment.css';

const Appointment = () => {
    return (
        <div className="appointment my-5">
            <div className="container">
            <div className="row ">
                <div className="col-md-5 d-none d-md-block">
                    <img src={doctor} alt="" />
                </div>
                <div className="col-md-7 text-white py-5">
                    <h5 className="brand-color text-uppercase">AppointMent</h5>
                    <h1 className="">Make An AppointMent <br/> today </h1>
                    <p>LAt Exceptional Dental Care, scheduling your dental appointment has never been easier. Our friendly staff is here to assist you in finding a convenient time for your visit. Whether you need a routine check-up or a specific dental treatment, we're committed to providing exceptional care tailored to your needs. Don't wait—book your appointment today and take the first step towards a healthier, more beautiful smile. </p>
                    <button className="btn btn-primary">Learn More</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Appointment;