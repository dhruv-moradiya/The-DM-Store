import styles from './buttons.module.css'
const NextButton = ({ onClick }) => {
  return (
    <button className={`${styles.btn} ${styles.prevBtn}`} onClick={onClick}>
      <i className="ri-arrow-right-wide-line"></i>
    </button>
  );
};
const PrevButton = ({ onClick }) => {
  return (

    <button className={`${styles.btn} ${styles.nextBtn}`} onClick={onClick}>
      <i className="ri-arrow-left-wide-line"></i>
    </button>
  );
};

export { NextButton, PrevButton }