import React from 'react';

const ErrorMessage = ({
    registrationErrors = [], 
    loginErrors = [], 
    assignmentErrors = [], 
    categoryErrors = [], 
    profileErrors = []
}) => {
return (
    <div className="Error-messages">
    {registrationErrors.length > 0 && (
         <div className="error-section">
         {registrationErrors.map((error, index) => (
            <div key={`registration-error-${index}`} className="error-item">
                {error}
            </div>
         ))}
        </div>
    )}

    {loginErrors.length > 0 && (
        <div className="error-section">
          {loginErrors.map((error, index) => (
            <div key={`login-error-${index}`} className="error-item">
              {error}
            </div>
          ))}
        </div>
      )}

      {assignmentErrors.length > 0 && (
        <div className="error-section">
          {assignmentErrors.map((error, index) => (
            <div key={`assignment-error-${index}`} className="error-item">
              {error}
            </div>
          ))}
        </div>
      )}

      {categoryErrors.length > 0 && (
        <div className="error-section">
          {categoryErrors.map((error, index) => (
            <div key={`category-error-${index}`} className="error-item">
              {error}
            </div>
          ))}
        </div>
      )}

      {profileErrors.length > 0 && (
        <div className="error-section">
          {profileErrors.map((error, index) => (
            <div key={`profile-error-${index}`} className="error-item">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
);
};

export default ErrorMessage;