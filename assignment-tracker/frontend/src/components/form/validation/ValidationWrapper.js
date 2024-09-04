import React, { useState } from 'react';

const validationWrapper = ({type, required, pattern, minLength, onError, ...textInputProps}) => {
    const [value, setValue] = useState('');
    const [newErrors, setErrors] = useState([]);
    const validate = () => {
        const newErrors = [];
        if (required && !value) {
            newErrors.push('This field is required');
        }
        if (pattern && !new RegExp(pattern).test(value)) {
            newErrors.push('Invalid format');
        }
        if (minLength && value.length < minLength) {
            newErrors.push(`Must be at least ${minLength} characters long`)
        }
        setErrors(newErrors);
        if (onError) {
            onError(newErrors);
        }
    }
    return (
       <div>
        <TextInput
        type={type}
        value={value}
        onChange={(e) => {
            setValue(e.target.value);
            validate();
        }}
        {...textInputProps}
        />
       </div>
    );
};

export default validationWrapper;