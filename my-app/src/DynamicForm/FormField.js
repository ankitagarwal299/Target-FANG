import React from 'react';

const FormField = ({ field, value, error, handleChange }) => {
    const { name, label, type, options } = field;
    
    const renderInput = () => {
        switch (type) {
            case 'text':
            case 'password':
            case 'email':
            case 'date':
            case 'number':
                return <input name={name} type={type} value={value} onChange={handleChange} />;
            case 'select':
                return (
                    <select name={name} value={value} onChange={handleChange}>
                        <option value="">Select</option>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'checkbox':
                return options.map(option => (
                    <label key={option}>
                        <input
                            name={name}
                            type="checkbox"
                            value={option}
                            checked={value.includes(option)}
                            onChange={handleChange}
                        />
                        {option}
                    </label>
                ));
            case 'radio':
                return options.map(option => (
                    <label key={option}>
                        <input
                            name={name}
                            type="radio"
                            value={option}
                            checked={value === option}
                            onChange={handleChange}
                        />
                        {option}
                    </label>
                ));
            case 'textarea':
                return <textarea name={name} value={value} onChange={handleChange} />;
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <label>{label}</label>
            {renderInput()}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default FormField;
