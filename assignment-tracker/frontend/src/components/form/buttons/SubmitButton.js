import React from 'react';

const SubmitButton = ({label, ...rest}) => (
    <button type="submit" {...rest}>{label}</button>
);

export default SubmitButton;