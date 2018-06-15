import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import classNames from 'classnames';

const FormDropDown = ({
  input,
  meta: { touched, error },
  className,
  placeholder,
  style,
  onFieldChange,
  searchable,
  compact,
  options,
  selectOnBlur
}) => {
  return (
    <Dropdown
      className={classNames(className, { error: touched && error })}
      placeholder={placeholder || 'Select'}
      style={style}
      value={input.value}
      selection
      search={searchable}
      compact={compact}
      options={options}
      selectOnBlur={selectOnBlur}
      onChange={(e, { value }) => {
        input.onChange(value);

        if (onFieldChange) onFieldChange(value);
      }}
    />
  );
};

FormDropDown.propTypes = {
  options: PropTypes.array.isRequired,
  onFieldChange: PropTypes.func,
  searchable: PropTypes.bool,
  compact: PropTypes.bool,
  selectOnBlur: PropTypes.bool
};

FormDropDown.defaultProps = {
  onFieldChange: null,
  searchable: false,
  compact: false,
  selectOnBlur: false
};

export default FormDropDown;
