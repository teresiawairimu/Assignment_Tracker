import React from 'react';

const TextInput = ({ label, name, type = 'text', register, error, ...rest}) => (
    <div>
        <label>{label}</label>
        <input {...register(name)} type={type} {...rest} />
        {error && <p>{error.message}</p>}
    </div>
    
);

export default TextInput;