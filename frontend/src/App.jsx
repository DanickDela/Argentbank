import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./styles/app.module.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RequiredAuth from "./components/RequiredAuth/RequiredAuth";
import Profile from "./pages/Profile/Profile";
import { fetchUserProfile, clearUserProfile } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { error, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      dispatch(clearUserProfile());
      return;
    }

    if (status === "idle") {
      dispatch(fetchUserProfile(token));
    }
  }, [token, status, dispatch]);

  return (
    <>
      <Header />
      {status === "loading" && (
        <div className={styles.loading}>Chargement du profil...</div>
      )}
      {status === "failed" && (
        <div className={styles.error}>Erreur : {error}</div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/profile"
          element={
            <RequiredAuth>
              <Profile />
            </RequiredAuth>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
