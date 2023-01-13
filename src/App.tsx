import React from "react";
import { AuthProvider } from "./hooks/useAuth";
import Router from "./router";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { TodoProvider } from "./hooks/useTodo";

export const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;
`;

// TODO: Crie um hook useStorage para facilitar o uso do localStorage
// TODO: Caso não saiba criar um hook troque todos os localStorage por StorageService

const App = () => {
  return (
    <AppContainer>
      <AuthProvider>
        <TodoProvider>
          <Router />
          <ToastContainer />
        </TodoProvider>
      </AuthProvider>
    </AppContainer>
  );
};

export default App;
