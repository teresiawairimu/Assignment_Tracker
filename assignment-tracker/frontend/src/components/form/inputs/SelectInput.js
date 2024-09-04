import React from 'react';
    
const SelectInput = ({ name, label, options, ...rest }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} ref={ref} {...rest}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;