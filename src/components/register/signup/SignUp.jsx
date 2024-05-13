import React, { useState } from "react";
import styles from "./signup.module.css";
import PopUp from "../../common/popUp/PopUp";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../../context/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/loader/Loader";

function SignUp() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function hidePopOver() {
    setIsVisible(false);
    setError("");
  }
  function navigateToLogin() {
    navigate("/login");
  }
  async function hadleCreateUser(e) {
    e.preventDefault();
    setLoading(true);
    const displayName = e.target[0].value;
    const age = e.target[1].value;
    const gender = e.target[2].value;
    const phoneNo = e.target[3].value;
    const email = e.target[4].value;
    const password = e.target[5].value;
    const passwordConfime = e.target[6].value;
    const fileInput = e.target[7];
    const file = fileInput.files[0];

    console.log("file", file)

    if (password !== passwordConfime) {
      setError("Password and confirmation password do not match");
      setLoading(false);
      setIsVisible(true);
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      setIsVisible(true);
    } else if (!fileInput) {
      setError("Please upload your profile picture");
      setLoading(false);
      setIsVisible(true);
    } else {
      setError("");
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        localStorage.setItem("DMStore_User", JSON.stringify(user));

        const storageRef = ref(storage, `${displayName}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          null,
          (err) => {
            setError(err.message);
            console.log(err.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(user, {
                  displayName,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName,
                  gender,
                  age,
                  phoneNo,
                  email,
                  photoURL: downloadURL,
                  time: Timestamp.now(),
                });

              }
            );
          }
        );
        setLoading(false);
        navigate("/");
      } catch (error) {
        setError("Something went wrong!");
        setLoading(false);
        setIsVisible(true);
        console.log(error.message);
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
      <h3>Register with The DM Store</h3>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={hadleCreateUser}>
          <input type="text" id="name" placeholder="Name" required />

          <input type="number" id="age" placeholder="Age" required />

          <select id="gender" placeholder="Gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input type="text" id="pno" placeholder="Phone no" required />

          <input type="email" id="email" placeholder="Email Address" required />

          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <input
            type="password"
            id="repassword"
            placeholder="Confirm password"
            required
          />

          <div className={styles.imagePart}>
            <label htmlFor="photo" className={styles.photo}>
              <i className="ri-image-add-line"></i>Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              required
              style={{ display: "block", textAlign: "center" }}
            />
          </div>
          <button className={styles.signBtn} onClick={navigateToLogin}>
            Log in
          </button>
          <button className={styles.btn} type="submit">
            {loading ? (
              <Loader containerHeight="100%" containerWidth="100%" />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
