/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialize = {
  user: {},
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    case "error":
      alert(action.payload);
      return { state };
    default:
      throw new Error("Some thing went wrong, pls try again");
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialize);

  const { user, isAuthenticated } = state;

  function login(email, password) {
    if (FAKE_USER.email !== email || FAKE_USER.password !== password)
      dispatch(authDispatch("error", "Email or Password be wrong"));

    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch(authDispatch("login", { email, password }));
  }

  function logout() {
    dispatch(authDispatch("logout"));
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("Context must be use inside AuthProvider, pls try again");
  return context;
}

function authDispatch(type, payload) {
  return { type, payload };
}

export { AuthProvider, useAuthContext };
