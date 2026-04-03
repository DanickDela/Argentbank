import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

/**
 * Appel API login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>} token JWT
 */
export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });

    return response.data.body.token;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(
        error.response?.data?.message || "Email ou mot de passe incorrect",
      );
    }

    if (error.response?.status === 500) {
      throw new Error("Erreur serveur");
    }

    throw new Error(
      "Impossible de se connecter au serveur. Veuillez réessayer plus tard.",
    );
  }
}
export async function getUserProfile(token) {
  try {
    const response = await axios.post(
      `${API_URL}/user/profile`,
      {}, // body vide
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.body;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(error.response?.data?.message);
    }

    if (error.response?.status === 500) {
      throw new Error("Erreur serveur");
    }

    throw new Error(
      "Impossible de se connecter au serveur. Veuillez réessayer plus tard.",
    );
  }
}

export async function UserSignup(email, password, firstName, lastName) {
  try {
    const response = await axios.post(
      `${API_URL}/user/signup`,
      {
        email,
        password,
        firstName,
        lastName,
      },
      {},
    );

    return response.data.body;
  } catch (error) {
    console.error("Erreur récupération profil :", error);
    throw error;
  }
}

export async function patchUserProfile(token, firstName, lastName) {
  try {
    const response = await axios.put(
      `${API_URL}/user/profile`,
      {
        firstName,
        lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.body;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(
        error.response?.data?.message ||
          "Données invalides pour la mise à jour du profil",
      );
    }

    if (error.response?.status === 500) {
      throw new Error("Erreur serveur");
    }

    throw new Error(
      "Impossible de se connecter au serveur. Veuillez réessayer plus tard.",
    );
  }
}
