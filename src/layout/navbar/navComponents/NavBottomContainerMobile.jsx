import { memo } from 'react';
import styles from '../navbar.module.css'

function NavBottomContainerMobile({ section, setSection }) {
  return (
    <div className={styles.navBottomContainerMobile}>
      {["MEN", "WOMEN", "KIDS"].map((item, index) => {
        return (
          <button
            key={index}
            className={section === item ? styles.activeCategotyTab : ""}
            onClick={() => setSection(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default memo(NavBottomContainerMobile)