import React from 'react';
import PropTypes from 'prop-types';
import { Table, Header } from 'semantic-ui-react';
import { Overall } from './_helpers';
import './css/listview.css';

interface OverviewListViewProps {
	data: Array<Overall>;
}

export const OverviewListView: React.FunctionComponent<OverviewListViewProps> = props => (
	<Table basic="very" selectable celled className="ovw-table">
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell style={styles.col}>#</Table.HeaderCell>
				<Table.HeaderCell style={styles.title}>Title</Table.HeaderCell>
				<Table.HeaderCell style={styles.users}>Users</Table.HeaderCell>
				<Table.HeaderCell style={styles.users}>Max Score</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{props.data.map((val, _i) => (
				<Table.Row key={val.id}>
					<Table.Cell style={styles.col}>{_i + 1}</Table.Cell>
					<Table.Cell style={styles.title}>
						<Header size="small" className="essay-title">
							{val.title}
							<Header.Subheader>{val.desc}</Header.Subheader>
						</Header>
					</Table.Cell>
					<Table.Cell style={styles.users}>{val.users}</Table.Cell>
					<Table.Cell style={styles.users}>{val.score}</Table.Cell>
				</Table.Row>
			))}
		</Table.Body>
	</Table>
);

const styles: { [key: string]: React.CSSProperties } = {
	col: {
		width: '2.5rem',
		paddingLeft: '0.885rem',
		paddingRight: '0.885rem'
	},
	title: {
		paddingLeft: '0.95rem',
		paddingRight: '0.95rem'
	},
	users: {
		width: '6.5rem'
	}
};

OverviewListView.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			users: PropTypes.number,
			score: PropTypes.number
		})
	).isRequired
};
