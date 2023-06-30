import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <section className={styles.intro}>
        <h2 className={styles.heading}>
          Join <span>Circle</span> today.
        </h2>
        <p className={styles.features}>
          <span>FOLLOW</span> PEOPLE AROUND THE GLOBE
        </p>
        <p className={styles.features}>
          <span>CONNECT</span> WITH YOUR FRIENDS
        </p>
        <p className={styles.features}>
          <span>SHARE</span> WHAT YOU THINKING
        </p>

        <Link className={styles["link-primary"]} to="/signup">
          Join Now
        </Link>
        <Link className={styles["link-secondary"]} to="/login">
          Already have an account? Login
        </Link>
      </section>

      <section className={styles.banner}>
        <img src="https://i.postimg.cc/C1ncQ3zj/banner.jpg" alt="banner" />
      </section>
    </div>
  );
};

export default Landing;
