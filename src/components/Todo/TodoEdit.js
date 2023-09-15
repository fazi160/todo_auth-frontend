import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedTodo, setShowModal, updateTodo } from "../../reducers/todoSlice";
import axios from "axios";
import { baseUrl } from "../../api/api";

function TodoEdit({ todo }) {
  const dispatch = useDispatch();
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleEditFormSubmit = async () => {
    try {
      // Update the todo
      await axios.put(`${baseUrl}todotodos/${editedTodo.id}/`, editedTodo);

      // Dispatch the updateTodo action to update the todos list
      dispatch(updateTodo(editedTodo));

      // Close the edit modal
      dispatch(setSelectedTodo(null));
      dispatch(setShowModal(false));
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
            value={editedTodo.title}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, title: e.target.value })
            }
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
            value={editedTodo.description}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, description: e.target.value })
            }
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            checked={editedTodo.completed}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, completed: e.target.checked })
            }
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEditFormSubmit}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch(setShowModal(false))}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoEdit;
