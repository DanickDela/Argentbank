import { useEffect, useState } from "react";
import styles from "../../styles/form.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSelector } from "react-redux";
import { isValidEmail } from "../../hooks/useRegex";
import { useNavigate } from "react-router-dom";

function SigninForm() {
  const loginUser = useLoginUser();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // rediriger vers le profil
      navigate("/profile");
    }
  }, [token, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function handleBlurUsername() {
    if (!username) {
      setError("L'email est obligatoire");
    } else if (!isValidEmail(username)) {
      setError("Email invalide");
    } else {
      setError("");
    }
  }

  function handleBlurPassword() {
    if (!password) {
      setError("Le password est obligatoire");
    } else if (password.length < 11) {
      console.log("password", password.length);
      setError("Le password doit avoir au moins 11 caractères");
    } else {
      setError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(); // ❗ empêche le reload

    if (!username) {
      setError("L'email est obligatoire");
      return;
    }

    if (!isValidEmail(username)) {
      setError("Email invalide");
      return;
    }

    if (!password) {
      setError("Le mot de passe est obligatoire");
      return;
    }

    if (password.length < 11) {
      setError("Le mot de passe doit avoir au moins 12 caractères");
      return;
    }

    setError("");
    try {
      setError("");
      await loginUser(username, password, remember);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className={styles.signin_content}>
      <FaUserCircle className={styles.signin_icon} />
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.input_wrapper}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleBlurUsername}
          />
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlurPassword}
          />
        </div>

        <div className={styles.input_remember}>
          <input
            type="checkbox"
            id="remember-me"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        {/* ❗ Affichage erreur */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className={styles.signin_content_button}>
          Sign In
        </button>
      </form>
    </section>
  );
}

export default SigninForm;
