import React from 'react';

const FormLayout = ({children, title}) => {
    return (
        <div className="form-container">
            {title && <h1 className="form-title">{title}</h1>}
            <div className="form-content">
                {children}
            </div>
        </div>
    );
}

export default FormLayout;