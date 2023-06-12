import React, { useEffect } from "react";
import "./AboutMe.css";
import img1 from "../../Images/img1.jpg";
import img2 from "../../Images/img2.jpg";
import img4 from "../../Images/img4.jpg";
import img5 from "../../Images/img5.jpg";
import insta from "../../Images/instagram.png";
import fb from "../../Images/facebook (2).png";
const AboutMe = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="aboutMainDiv">
      <div className="innerDiv1">
        <div>
          <h3>So, who am I?</h3>
          <p>
            Hello!! I'm Anshul Thakur and I'm delighted to welcome you to my
            website. I am from Hamirpur, Himachal Pradesh. I am the developer by
            profession. I am a computer science graduate with a passion for
            exploring the wonders of technology. I obtain my B.Tech degree in
            Computer Science, which has equipped me withh a solid foundation in
            programming, software development and problem-solving.
          </p>
        </div>
        <img src={img1} alt="img1" />
      </div>
      <div className="innerDiv1">
        <img src={img2} alt="img2" />
        <div>
          <h3>Eager to acquire knowledge!!</h3>
          <p>
            Curiosity has always been my driving force, pushing me to delve into
            new and exciting realms. I find immense joy in uncovering the latest
            advancements in the world of technology and learning about
            cutting-edge concepts. With an insatiable thirst for knowledge, I am
            continuously honing my skills and expanding my understanding of this
            ever-evolving field.
          </p>
        </div>
      </div>
      <div className="innerDiv1">
        <div>
          <h3>My love for dogs</h3>
          <p>
            Beyond the realm of computers and code, there are three other
            passions that make my heart skip a beat.Firstly, my love for dogs
            knows no bounds. Their unconditional love, loyalty, and infectious
            energy have captured my heart. I find solace in spending time with
            these incredible creatures. Meet My friend <strong>Bruno</strong>.
            He is 9 years old German Shepherd. I love to play with him. I used
            to take him for a walk whenever i go back to my home.
          </p>
        </div>
        <img src={img4} alt="img4" />
      </div>
      <div className="innerDiv1">
        <img src={img5} alt="img5" />
        <div>
          <h3>Interests</h3>
          <p>
            Whenever I have a camera in my hands, I feel a sense of freedom and
            creativity that is truly exhilarating. Through my lens, I aim to
            capture the essence of the world around me, freezing fleeting
            moments in time for others to cherish and enjoy.
            <br /> But that's not all - I have another passion that fills me
            with unbridled joy : dancing. It is a form of expression that allows
            me to unleash my emotions and connect with my inner self.{" "}
          </p>
          <div className="linkInsta">
            <p>You can checkout my instagram and facebook here :</p>
            <div>
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
    </div>
  );
};

export default AboutMe;
