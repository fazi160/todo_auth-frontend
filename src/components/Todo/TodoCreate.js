import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateModal, createTodo } from "../../reducers/todoSlice";
import axios from "axios";
import { baseUrl } from "../../api/api";

function TodoCreate() {
  console.log("Todo Create");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.todos.userData);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    completed: false,
    user: userData ? userData.id : null,
  });

  const handleCreateTodo = async () => {
    try {
      if (!userData) {
        console.error("User data is not available.");
        return;
      }

      const response = await axios.post(`${baseUrl}todotodos/`, newTodo);

      dispatch(createTodo(response.data));
      dispatch(setCreateModal(false));
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            checked={newTodo.completed}
            onChange={(e) =>
              setNewTodo({ ...newTodo, completed: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCreateTodo}
        >
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default TodoCreate;
