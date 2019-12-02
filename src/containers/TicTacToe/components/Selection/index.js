import React from 'react';
import PropTypes from 'prop-types';

const Selection = ({ options, handleOnSelect }) => (
    <select onChange={handleOnSelect}>
        {
            options.map((option) => (
                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            ))
        }
    </select>
);

Selection.propTypes = {
    options: PropTypes.array,
    handleOnSelect: PropTypes.func
};

export default Selection;