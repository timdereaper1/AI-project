import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

type SchemeInputProps = {
	disabled: boolean,
	onChange: Function,
	value: string | number
};

const SchemeInput: React.FunctionComponent<SchemeInputProps> = props => (
	<Input
		type="text"
		className="scheme-input"
		onChange={props.onChange}
		disabled={props.disabled}
		value={props.value}
	/>
);

SchemeInput.propTypes = {
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

SchemeInput.defaultProps = {
	disabled: false,
	value: 0
};

export default SchemeInput;
