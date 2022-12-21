import React from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/cards/Card";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>

          <h2>Register</h2>

          <form>
            <input
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              required
            />
            <input
              placeholder="email"
              type="email"
              name="email"
              id="email"
              required
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              id="password"
              required
            />
            <input
              placeholder="confirm password"
              type="password"
              name="confirm password"
              id="confirm password"
              required
            />
            <button type="submit" className="--btn --btn-primary --btn-block ">
              Register
            </button>
          </form>

          <Link to={"/forgot"}>Forgot password</Link>

          <span className={styles.register}>
            <Link to={"/"}>Home</Link>
            <p>&nbsp; Already have an account? &nbsp;</p>
            <Link to={"/Login"}>Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
