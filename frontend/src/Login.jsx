import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Login({ switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
  await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  setErrorMsg("");
} catch (error) {
      if (error.code === "auth/invalid-credential") {
    setErrorMsg("Invalid email or password");
  }
  else if (error.code === "auth/user-not-found") {
    setErrorMsg("Account does not exist");
  }
  else if (error.code === "auth/wrong-password") {
    setErrorMsg("Incorrect password");
  }
  else if (error.code === "auth/invalid-email") {
    setErrorMsg("Invalid email format");
  }
  else {
    setErrorMsg("Login failed");
  }
    }
  };

  return (
  <div className="auth-container">
    <h2>Welcome Back 👋</h2>

    {errorMsg && (
      <p style={{
        color: "#ef4444",
        textAlign: "center",
        marginTop: "10px"
      }}>
        {errorMsg}
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

    <button onClick={handleLogin}>
      Login
    </button>
    


    <p
  onClick={() => switchToSignup()}
  style={{
    textAlign: "center",
    marginTop: "15px",
    cursor: "pointer",
    color: "#6c63ff"
  }}
>
  Don't have an account? Sign Up
</p>
  </div>
);
}

export default Login;