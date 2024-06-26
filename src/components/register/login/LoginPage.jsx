import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../context/Firebase";
import PopUp from "../../common/popUp/PopUp";
import { useClothContext } from "../../../context/ClothContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/loader/Loader";

function LoginPage() {
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const { setCurrentUser, currentUser } = useClothContext();

  const navigate = useNavigate();
  function navigateToNewAccount() {
    navigate('/signup')
  }
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  function hidePopOver() {
    setIsVisible(false);
    setError("");
  }

  async function signin(e) {
    setLoading(true)
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.repassword.value;

    if (password !== passwordConfirm) {
      setError("Password and confirmation password do not match");
      setLoading(false)
      setIsVisible(true)
    } else {
      setError("");
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(userCredential.user);
        localStorage.setItem("DMStore_User", JSON.stringify(userCredential.user));
        setLoading(false)
        navigate("/");
      } catch (error) {
        setError("Invalid email or password");
        setIsVisible(true)
        setLoading(false)
        console.error("Error signing in:", error);
      }
    }
  }

  return (
    <div className={styles.container}>
      {error && (
        <PopUp
          message={error}
          isVisible={isVisible}
          status="warning"
          hidePopOver={hidePopOver}
        />
      )}
      <h3>Login with The DM Store</h3>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={signin}>
          <input type="email" id="email" name="email" placeholder="Email Address" />
          <input type="password" id="password" name="password" placeholder="Password" />
          <input type="password" id="repassword" name="repassword" placeholder="Confirm password" />
          <button className={styles.newAccountBtn} onClick={navigateToNewAccount}>Create a new account</button>
          <button className={styles.btn} type="submit">
            {loading ? <Loader containerHeight="100%" containerWidth="100%" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
