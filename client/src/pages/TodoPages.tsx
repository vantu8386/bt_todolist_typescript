import React from "react";
import TodoForm from "../component/TodoForm";
import TodoList from "../component/TodoList";

const TodoPages: React.FC = () => {
  return (
    <div className="w-1/2 m-auto">
      <TodoForm />
      {/* <TodoList /> */}
    </div>
  );
};

export default TodoPages;
