import { Todo } from "../types";
import constate from "constate";
import { useState } from "react";

const [TodoProvider, useTodo] = constate(() => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return {
    todos,
    setTodos,
  };
});

export { TodoProvider };

export default useTodo;
