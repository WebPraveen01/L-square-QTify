import React from "react";
import styles from "./Hero.module.css";
import heroImage from "../assets/Hero image.png";

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.textBlock}>
        <h1>100 Thousand Songs, ad-free</h1>
        <h1>Over thousands podcast episodes</h1>
      </div>
      <div className={styles.imageWrap}>
        <img src={heroImage} alt="Hero" />
      </div>
    </div>
  );
}

export default Hero;