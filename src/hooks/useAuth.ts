import { User } from "../types";
import constate from "constate";
import { useState } from "react";

const [AuthProvider, useAuth] = constate(() => {
  const [user, setUser] = useState<User>();

  return {
    user,
    setUser,
  };
});

export { AuthProvider };

export default useAuth;
