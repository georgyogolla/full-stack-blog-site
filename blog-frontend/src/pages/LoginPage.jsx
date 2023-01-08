import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // useNavigate hook is used to navigate to a different page in the application programmatically from within a component (instead of using a Link component) and it returns a function that can be called to navigate to a different page

  // validating signin
  const logIn = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/articles");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <h1>Log In</h1>;{error && <p className="error">{error}</p>}
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={logIn} type="submit">
          Log In
        </button>
        <p>
          <Link to="/create-account">
            Don't have an account? Create one here
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
