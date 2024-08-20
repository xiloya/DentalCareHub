import React from 'react';
import { Link } from 'react-router-dom';
import chairImage from '../../../images/chair.png';
const HeaderTop = () => {
    return (
        <div style={{ height: "600px", 'width': '100%' }} className="row d-flex align-items-center container">
            <div className="col-md-4 col-sm-6 col-12 offset-md-1 md-mx-5">
                <h1>Your New Smile <br />Starts From Here</h1>
                <p className="text-secondary">
                At Exceptional Dental Care, we believe a beautiful smile can transform lives. Our experienced team offers comprehensive dental services designed to enhance your smile and boost your confidence. From preventive care to advanced cosmetic treatments, we are dedicated to providing exceptional care tailored to your needs. Begin your journey to a healthier, more radiant smile with us today.
                </p>
                <Link to="/login" className="btn btn-primary btn-lg shadow rounded"> GET STARTED</Link>

            </div>
            <div className="col-md-6 col-sm-6 col-12">
                <img src={chairImage} className="img-fluid rounded" alt="" />
            </div>
        </div>
    );
};

export default HeaderTop;