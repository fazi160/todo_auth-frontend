import React, { useEffect } from "react";
import $ from 'jquery';

import { useSelector, useDispatch } from "react-redux";
import {
  setTodos,
  setSelectedTodo,
  setShowModal,
  setCreateModal,
  setUserData,
} from "../../reducers/todoSlice";
import axios from "axios";
import { baseUrl } from "../../api/api";
import { getLocal } from "../../helpers/auth";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import TodoCreate from "../Todo/TodoCreate"; // Import the TodoCreate component
import TodoEdit from "../Todo/TodoEdit"; // Import the TodoEdit component
import TodoList from "../Todo/TodoList"; // Import the TodoList component

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getLocal();
  const decoded = jwtDecode(token);

  const userData = useSelector((state) => state.todos.userData);
  const todos = useSelector((state) => state.todos.todos);
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);
  const showModal = useSelector((state) => state.todos.showModal);
  const createModal = useSelector((state) => state.todos.createModal);

  const getUser = async () => {
    try {
      const userResponse = await axios.get(`${baseUrl}user-detail/${decoded.user_id}/`);
      dispatch(setUserData(userResponse.data));
    } catch (error) {
      handleApiError(error, "Error fetching user data");
    }
  };

  const getTodos = async () => {
    try {
      const todoResponse = await axios.get(`${baseUrl}todotodos/?user=${decoded.user_id}`);
      dispatch(setTodos(todoResponse.data));
    } catch (error) {
      handleApiError(error, "Error fetching todos");
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`${baseUrl}todotodos/${todoId}/`);
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      dispatch(setTodos(updatedTodos));
    } catch (error) {
      handleApiError(error, "Error deleting todo");
    }
  };

  const handleCreateTodo = () => {
    // Dispatch an action to open the create modal
    dispatch(setCreateModal(true));
  };

  const openEditModal = (todo) => {
    dispatch(setSelectedTodo(todo));
    dispatch(setShowModal(true));
  };

  const closeEditModal = () => {
    dispatch(setSelectedTodo(null));
    dispatch(setShowModal(false));
  };

  const handleApiError = (error, customMessage) => {
    if (error.response && error.response.status === 403) {
      console.error("Permission Denied: You don't have permission to perform this action.");
    } else {
      console.error(`${customMessage}:`, error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getUser();
      getTodos();
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="maindiv">
      <div className="content-container">
        <div className="top-bar">
          <h4>Welcome, {userData ? userData.username : "no name"}</h4>
          <button onClick={logout} className="btn btn-primary">
            Logout
          </button>
        </div>
  
        {/* Render TodoList component */}
        <TodoList todos={todos} />
  
        {/* Render TodoEdit component if showModal is true */}
        {showModal && selectedTodo && (
          <Modal show={showModal} onHide={closeEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TodoEdit todo={selectedTodo} />
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={closeEditModal}>
                Close
              </Button>
            </Modal.Footer> */}
          </Modal>
        )}
  
        {/* Render TodoCreate modal */}
        <Modal show={createModal} onHide={() => dispatch(setCreateModal(false))}>
          <Modal.Header closeButton>
            <Modal.Title>Create Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TodoCreate />
          </Modal.Body>
        </Modal>
  
        {/* Render Create Todo button at the bottom */}
        <div className="create-todo-button-container" style={{marginLeft:"200px"}}>
          <button onClick={handleCreateTodo} className="btn btn-primary">
            Create Todo
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default Home;
