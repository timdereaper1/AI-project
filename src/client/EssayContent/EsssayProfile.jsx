import React from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';
import './css/profile.css';
import image1 from '../_shared/assets/imgs/11.jpg';

interface EssayProfileProps {
	details: Array<{ name: string }>;
}

const EssayProfile: React.FunctionComponent<EssayProfileProps> = props => (
	<div className="essay-profile">
		<img src={image1} alt="" className="img" />
		<div className="card">
			<Header size="medium">Grading Scale</Header>
			<List divided animated>
				{props.details && // eslint-disable-line operator-linebreak
					props.details.map((detail, _i) => (
						/* eslint-disable-next-line react/no-array-index-key */
						<List.Item key={_i}>
							<List.Content>{detail.name}</List.Content>
						</List.Item>
					))}
			</List>
		</div>
	</div>
);

EssayProfile.propTypes = {
	details: PropTypes.arrayOf(PropTypes.object)
};

EssayProfile.defaultProps = {
	details: null
};

export default EssayProfile;
