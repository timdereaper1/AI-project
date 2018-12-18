import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

type Props = {
	disabled?: boolean,
	onChange: Function,
	value?: string | number,
	name: string,
	index: number
};

const SchemeInput = (props: Props) => (
	<Input
		type="text"
		className="scheme-input"
		onChange={({ target: { value } }) => {
			props.onChange(props.index, props.name, value);
		}}
		disabled={props.disabled}
		value={props.value}
	/>
);

SchemeInput.propTypes = {
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	index: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired
};

SchemeInput.defaultProps = {
	disabled: false,
	value: 0
};

export default SchemeInput;
