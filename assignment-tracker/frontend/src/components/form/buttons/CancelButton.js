import React from 'react';

const CancelButton = ({onClick, ...rest}) => (
    <button type="submit" onClick={onClick} {...rest}>Cancel</button>
);

export default CancelButton;