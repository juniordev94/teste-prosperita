import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "reactstrap";
import useAuth from "./hooks/useAuth";
import useStorage from "./hooks/useStorage";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";

type ProtectedRouteProps = {
  canAccess: boolean;
  redirect: string;
  children: JSX.Element;
};

const ProtectedRoute = ({
  canAccess,
  redirect,
  children,
}: ProtectedRouteProps): JSX.Element => {
  if (!canAccess) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

const Router = () => {
  const { user, setUser } = useAuth();
  const { getStorage } = useStorage()
  const [loading, setLoading] = useState<boolean>(true);

  const retrieveUser = useCallback(() => {
    const user = getStorage("user");
    
    if (user) {
      setUser(user);
    }

    setLoading(false);
  }, [setUser]);

  useEffect(() => {
    retrieveUser();
  }, [retrieveUser]);

  return loading ? (
    <div className="bg-dark">
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        <h1 className="text-white">Carregando dados...</h1>
      </Container>
    </div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute canAccess={!user} redirect="/app">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute canAccess={!user} redirect="/app">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute canAccess={!user} redirect="/app">
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app"
          element={
            <ProtectedRoute canAccess={!!user} redirect="/login">
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
