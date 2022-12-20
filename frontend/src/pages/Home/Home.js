import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../Home/Home.scss";
import heroImage from "../../assets/inv-img.png";

const Home = () => {
  return (
    <div>
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>

        <ul className="home-links">
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to={"/login"}>Login</Link>
            </button>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to={"/dashboard"}>Dashboard</Link>
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero section */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Inventory & Stock Management</h2>
          <p>
            Inventory systems to control amd manage products in the warehouse in
            real time and integrated to make it easier to develop your business.
          </p>
          <div className="hero-button">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free trial 1 Month.</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num={"14K"} text="Brand Owners" />
            <NumberText num={"23K"} text="Active users" />
            <NumberText num={"500+"} text="Partners" />
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="hero image" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
