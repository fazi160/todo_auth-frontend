import React, { useEffect, useState } from "react";
import { baseUrl } from '../../api/api';
import { useNavigate } from "react-router-dom";
import { getLocal } from '../../helpers/auth'
import jwtDecode from "jwt-decode";
import Menubar from "../Navbar/navbar";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Boostrap
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

function Profile() {
    const history = useNavigate()
    const [user, setUser] = useState([])
    const token = getLocal();
    const decoded = jwtDecode(token)
    const [profile_img, setImage] = useState()
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    async function getUser() {
        const user = await axios.get(`${baseUrl}user-detail/${decoded.user_id}/`)
        setUser(user.data)
    }

    const UserUpdate = async (e) => {
      console.log("UserUpdate called");
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(username, email, password);
        const formData = new FormData(); // Create a FormData object

        // Append the profile image to the FormData
        if (profile_img) {
            formData.append('profile_image', profile_img);
        }

        // Append other fields to the FormData
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        if (password === '') {
            alert('Type old Password or New Password');
            return;
        }

        const url = `${baseUrl}user-detail/${decoded.user_id}/`;

        try {
            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct content type for form data
                },
            });

            if (response.status === 400) {
                alert(response.status);
            } else {
                // Close the modal
                setShowModal(false);
                // Refresh user data
                getUser();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!token) {
            history('/')
        }
        getUser()
    }, [])

    return (
      <div className="vh-100" style={{ backgroundColor: 'white' }}>
          <Menubar heading={'Profile'} />
          <MDBContainer>
              <MDBRow className="justify-content-center">
                  <MDBCol md="9" lg="7" xl="5" className="mt-5">
                      <MDBCard style={{ borderRadius: '15px' }}>
                          <MDBCardBody className="p-4">
                              <div className="d-flex text-black">
                                  <div className="flex-shrink-0">
                                      <MDBCardImage
                                          style={{ width: '180px', borderRadius: '10px' }}
                                          src={user.profile_image ? user.profile_image : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'}
                                          alt='Generic placeholder image'
                                          fluid />
                                  </div>
                                  <div className="flex-grow-1 ms-5 mt-5">
                                      <MDBCardTitle>{user.username}</MDBCardTitle>
                                      <MDBCardText>{user.email}</MDBCardText>
                                      <MDBCardText>Developer</MDBCardText>
                                  </div>
                              </div>
                              <button
                                  type="button"
                                  className="btn btn-warning m-2 ms-5"
                                  onClick={() => setShowModal(true)} // Open modal
                              >
                                  <i className="fas fa-edit"></i>
                              </button>
  
                              {/* Modal */}
                              <Modal show={showModal} onHide={() => setShowModal(false)}>
                                  <Modal.Header closeButton>
                                      <Modal.Title>Edit User</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                      <div style={{ height: '100px' }} className="mb-3 d-flex justify-content-left">
                                          <div style={{ width: '100px' }} className='h-100'>
                                              {profile_img ?
                                                  <img className='w-100' src={URL.createObjectURL(profile_img)} alt="Profile" />
                                                  :
                                                  <img className='w-100' src={user.profile_image ? user.profile_image : ""} alt="Profile" />
                                              }
                                          </div>
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="profile-img" className="col-form-label">Profile image</label>
                                          <input type="file" className="form-control" id="profile-img"
                                              onChange={(e) => {
                                                  if (e.target.files[0] != null)
                                                      setImage(e.target.files[0]);
                                              }}
                                          />
                                      </div>
                                      <Form onSubmit={UserUpdate}>
                                        <Form.Group className="py-2">
                                            <Form.Control type="text" id="username" name="username" placeholder="Username" defaultValue={user.username} />
                                        </Form.Group>
                                        <Form.Group className="py-2">
                                            <Form.Control type="email" id="email" name="email" placeholder="Email" defaultValue={user.email} />
                                        </Form.Group>
                                        <Form.Group className="py-2">
                                            <Form.Control type="password" id="password" name="password" placeholder="Password" autoComplete="current-password" />
                                        </Form.Group>
                                    </Form>

                                  </Modal.Body>
                                  <Modal.Footer>
                                      <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                                      <Button variant="primary" onClick={UserUpdate}>Update</Button>
                                  </Modal.Footer>
                              </Modal>
                          </MDBCardBody>
                      </MDBCard>
                  </MDBCol>
              </MDBRow>
          </MDBContainer>
      </div>
  )
  
}

export default Profile;
