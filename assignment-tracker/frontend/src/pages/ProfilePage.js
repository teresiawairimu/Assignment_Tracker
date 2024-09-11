import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../components/form/inputs/TextInput';
import FormLayout from '../components/form/layout/FormLayout';
import SubmitButton from '../components/form/buttons/SubmitButton';
import { useAuth } from '../contexts/AuthContext';
import { getUserById, updateUser } from '../services/userService';
import { deleteUser } from '../services/userService';


const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required')
    });

const ProfilePage = () => {
    const [profileErrors, setProfileErrors] = useState([]);
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors }, setValue} = useForm({
        resolver: yupResolver(schema),
    });

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

    const handleEdit = () => {
        setIsEditing(true);
    }

    const onSubmit = async (data) => {
        if (!currentUser) return;
        try {
            const idToken = await currentUser.getIdToken();
            const updatedUserData = { username: data.username, email: data.email };
            const updatedUser = await updateUser(currentUser.uid, updatedUserData, idToken);
            setUserData(updatedUser);
            setIsEditing(false);
            setProfileErrors([]);
        } catch (error) {
            setProfileErrors([error.message]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCancel = () => {
        setIsEditing(false);
        reset(userData);
    };

    const handleDelete = async () => {
        if (!currentUser) return;
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                setIsLoading(true);
                const idToken = await currentUser.getIdToken();
                await deleteUser(currentUser.uid, idToken);
            // Redirect to login page
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
        <FormLayout title="Profile">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    label="Username"
                    name="username"
                    register={register}
                    placeholder="Enter your username"
                    disabled={!isEditing}
                    error={errors.username}
                />
                <TextInput
                    label="Email"
                    name="email"
                    register={register}
                    placeholder="Enter your email"
                    disabled={!isEditing}
                    error={errors.email}
                />
                {isEditing ? (
                    <div>
                        <SubmitButton
                            label="Save"
                        />
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <button type="button" onClick={handleEdit}>Edit</button>
                        <button type="button" onClick={handleDelete}>Delete</button>
                    </div>
                )}
                {profileErrors && <p>{profileErrors}</p>}
            </form>
        </FormLayout>
    );

}

export default ProfilePage;