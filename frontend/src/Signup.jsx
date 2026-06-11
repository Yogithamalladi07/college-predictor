import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { FaArrowLeft } from "react-icons/fa";

function Signup({ switchToLogin, goHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSuccessMsg("Account created successfully!");
      setErrorMsg("");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email already exists");
      } else if (error.code === "auth/weak-password") {
        setErrorMsg("Password must be at least 6 characters");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("Invalid email format");
      } else {
        setErrorMsg("Signup failed");
      }
    }
  };

  return (
  <div className="auth-container">

    <button
      className="auth-back-btn"
      onClick={goHome}
    >
      <FaArrowLeft />
    </button>

    <h2>Create Account </h2>
      {errorMsg && (
  <p
    style={{
      color: "#ef4444",
      textAlign: "center",
      marginBottom: "15px"
    }}
  >
    {errorMsg}
  </p>
)}
{successMsg && (
  <p
    style={{
      color: "#22c55e",
      textAlign: "center",
      marginBottom: "15px"
    }}
  >
    {successMsg}
  </p>
)}
    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleSignup}>
      Sign Up
    </button>

    <p
      onClick={() => switchToLogin()}
      style={{
        textAlign: "center",
        marginTop: "15px",
        cursor: "pointer",
        color: "#6c63ff"
      }}
    >
      Already have an account? Login
    </p>

  </div>
);
}

export default Signup;