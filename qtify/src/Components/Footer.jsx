import React, { useState } from 'react';
import styles from './Footer.module.css';

function Footer() {
  const [isOpenFirst, setIsOpenFirst] = useState(true);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  return (
    <footer className={styles.footer}>
      <h2 className={styles.heading}>FAQs</h2>

      <div className={styles.faqWrapper}>
        <div className={styles.faqItem}>
          <button
            type="button"
            className={styles.accordion}
            onClick={() => setIsOpenFirst((prev) => !prev)}
            aria-expanded={isOpenFirst}
          >
            <span>Is QTify free to use?</span>
            <span className={`${styles.arrow} ${isOpenFirst ? styles.arrowOpen : ''}`}>›</span>
          </button>

          {isOpenFirst && (
            <div className={styles.answer}>
              Yes! It is 100% free, and has 0% ads!
            </div>
          )}
        </div>

        <div className={styles.faqItem}>
          <button
            type="button"
            className={styles.accordion}
            onClick={() => setIsOpenSecond((prev) => !prev)}
            aria-expanded={isOpenSecond}
          >
            <span>Can I download and listen to songs offline?</span>
            <span className={`${styles.arrow} ${isOpenSecond ? styles.arrowOpen : ''}`}>›</span>
          </button>

          {isOpenSecond && (
            <div className={styles.answer}>
              Sorry, unfortunately we don't provide the service to download any songs.
            </div>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.brand}>Qtify</div>
        <div className={styles.copy}>© 2026 All rights reserved</div>
      </div>
    </footer>
  );
}

export default Footer;
