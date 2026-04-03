import styles from "../../styles/login.module.scss";
import SigninForm from "../../components/SigninForm/SigninForm";

function Login() {
  return (
    <main className={`${styles.main} ${styles.bgdark}`}>
      <SigninForm />
    </main>
  );
}

export default Login;
