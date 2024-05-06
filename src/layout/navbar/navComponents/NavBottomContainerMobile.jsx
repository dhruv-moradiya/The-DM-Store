import { memo } from 'react';
import styles from '../navbar.module.css'
import { useNavigate } from 'react-router-dom';

function NavBottomContainerMobile({ section, setSection }) {

  const navigate = useNavigate()

  function handleClick(item) {
    setSection(item)
    navigate('/')
  }
  return (
    <div className={styles.navBottomContainerMobile}>
      {["MEN", "WOMEN", "KIDS"].map((item, index) => {
        return (
          <button
            key={index}
            className={section === item ? styles.activeCategotyTab : ""}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default memo(NavBottomContainerMobile)