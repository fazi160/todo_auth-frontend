import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTodo, setShowModal, setTodos } from "../../reducers/todoSlice";
import axios from "axios";
import { baseUrl } from "../../api/api";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const userData = useSelector((state) => state.todos.userData);

  const openEditModal = (todo) => {
    dispatch(setSelectedTodo(todo));
    dispatch(setShowModal(true));
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      // Send a request to delete the todo by its ID
      await axios.delete(`${baseUrl}todotodos/${todoId}/`);
      // Update the todos list in the Redux store by filtering out the deleted todo
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      dispatch(setTodos(updatedTodos));
    } catch (error) {
      // Handle errors
      console.error("Error deleting todo:", error);
    }
  };

  // Filter the todos based on the user ID if userData is available
  const userTodos = userData ? todos.filter((todo) => todo.user === userData.id) : [];

  return (
    <div>
      <h5>Your Todos:</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.completed ? "Completed" : "Not Completed"}</td>
              <td>
                <button className="btn btn-primary" onClick={() => openEditModal(todo)}>
                  Edit
                </button>{" "}
                <button className="btn btn-danger" onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
