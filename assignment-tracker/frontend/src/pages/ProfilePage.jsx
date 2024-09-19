import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { getUserById, updateUser, deleteUser } from '../services/userService';

/**
 * Validate the form fields of a user profile
 * username be a string and required
 * email be a string, a valid email address and required
 * 
 * @type {Yup.ObjectSchema} Validation schema for username and email
 */

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required')
});


/**
 * The profile page component that allows users to view and update their profile
 * @component
 * @returns {JSX.Element} The rendered ProfilePage component
 * 
*/
const ProfilePage = () => {
  const [profileErrors, setProfileErrors] = useState([]);
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Initializes form control and validation with Yup resolver
   * 
   * @typedef {Object} useFormReturn
   * @property {function} register - Register input elements with the form
   * @property {function} handleSubmit - Handle form submission
   * @property {Object} formState - State of the form
   * @property {Object} formState.errors - Errors in the form fields
   * @property {function} setValue - Set the value of a form field
   * @param {Object} resolver - Yup resolver for the form
   * @returns {useFormReturn} Form control and validation functions 
   */
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * Fetches user data from the database and sets the form values
   * @async
   * function fetchUserData
   * @returns {Promise<void>} Sets the user data and form values
   */
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      try {
        setIsLoading(true);
        const idToken = await currentUser.getIdToken();
        const data = await getUserById(currentUser.uid, idToken);
        setUserData(data);
        setValue('username', data.username);
        setValue('email', data.email);
      } catch (error) {
        setProfileErrors([error.message]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [currentUser, setValue]);


  /**
   * Updates the user profile with the new data
   * @async
   * @function onSubmit
   * @param {Object} data - Form data to update the user profile
   * @returns {Promise<void>} Updates the user profile and displays a success message
   * 
  */
  const onSubmit = async (data) => {
    if (!currentUser) return;
    try {
      setIsLoading(true);
      const idToken = await currentUser.getIdToken();
      const updatedUserData = { username: data.username, email: data.email };
      const updatedUser = await updateUser(currentUser.uid, updatedUserData, idToken);
      setUserData(updatedUser);
      setProfileErrors([]);
      alert('Profile updated successfully!');
    } catch (error) {
      setProfileErrors([error.message]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Deletes the user account and navigates to the login page
   * @async
   * @function handleDelete
   * @returns {Promise<void>} Deletes the user account and navigates to the login page
  */
  const handleDelete = async () => {
    if (!currentUser) return;
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        const idToken = await currentUser.getIdToken();
        await deleteUser(currentUser.uid, idToken);
        navigate('/login');
      } catch (error) {
        setProfileErrors([error.message]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-3">Profile</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            {...register("username")}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="mt-4">
          <Button variant="primary" type="submit" className="me-2">Save Changes</Button>
          <Button variant="danger" type="button" onClick={handleDelete}>Delete Account</Button>
        </div>

        {profileErrors.length > 0 && (
          <Alert variant="danger" className="mt-3">
            {profileErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default ProfilePage;





