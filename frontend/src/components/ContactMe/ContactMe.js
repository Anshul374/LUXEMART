import React, { useEffect } from "react";
import "./ContactMe.css";
import img2 from "../../Images/img2.jpg";
import insta from "../../Images/instagram.png";
import fb from "../../Images/facebook (2).png";

const ContactMe = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="contactMainDiv">
      <div>
        <h3>CONTACT ME</h3>
        <img src={img2} alt="img2" />
        <div className="rightDiv">
          <div className="contactMeDiv">
            <h3>CONTACT ME</h3>
            <p>
              Hello there! I'm thrilled that you're interested in reaching out.
              Whether you have a question, a suggestion, or just want to say
              hello, I'd love to hear from you. Please feel free to use the
              contact details below to send me a message. I promise to read
              every single one and get back to you as soon as possible. Your
              feedback and inquiries are incredibly important to me, and I value
              the opportunity to connect with you.
              <br />
              Thankyou for taking the time to visit my website and for
              considering getting in touch. I'm excited to hear from you and
              look forward to our conversation!
            </p>
          </div>
          <div className="bestRegardsDiv">
            <h4>Best regards,</h4>
            <p>Anshul Thakur</p>
            <a href="mailto:anshulthakur3339@gmail.com">
              <p>anshulthakur3339@gmail.com</p>
            </a>
            <p>9816161374</p>
          </div>
          <div className="socialMediaDiv">
            <h4>Follow me on social media:</h4>
            <a href="https://www.instagram.com/anshul374/">
              <img src={insta} alt="insta" />
            </a>
            <a href="https://www.facebook.com/anshul.thakur.56829">
              <img src={fb} alt="fb" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
