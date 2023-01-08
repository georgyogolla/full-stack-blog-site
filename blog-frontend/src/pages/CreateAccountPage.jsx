import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    const auth = getAuth();

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/articles");
    } catch (error) {
      setError(error.message);
    }

    return (
      <>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
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
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={createAccount} type="submit">
            Create Account
          </button>
          <Link to="/login">Already have an account? Log in</Link>
        </form>
      </>
    );
  };
};
export default CreateAccountPage;
