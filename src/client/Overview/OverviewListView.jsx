import React from 'react';
import PropTypes from 'prop-types';
import { Table, Header } from 'semantic-ui-react';
import { Overall } from './_helpers';
import './css/listview.css';

interface OverviewListViewProps {
	data: Array<Overall>;
	onSelect: Function;
}

export const OverviewListView: React.FunctionComponent<OverviewListViewProps> = props => (
	<div className="ovw-wrap">
		<Header className="ovw-title" size="large">
			Written Essays
		</Header>
		<p className="desc">
			A list of written essays by other people. Click on an essay to see the leaderboard.
		</p>
		<Table basic="very" selectable celled className="ovw-table">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell style={styles.col}>#</Table.HeaderCell>
					<Table.HeaderCell style={styles.title}>Title</Table.HeaderCell>
					<Table.HeaderCell style={styles.users} textAlign="center">
						Written
					</Table.HeaderCell>
					<Table.HeaderCell style={styles.users} textAlign="center">
						Score
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{props.data.map((val, _i) => (
					<Table.Row key={val.id} onClick={() => props.onSelect(val)}>
						<Table.Cell style={styles.col}>{_i + 1}</Table.Cell>
						<Table.Cell style={styles.title}>
							<Header size="medium" className="essay-title">
								{val.title}
								<Header.Subheader>{val.desc}</Header.Subheader>
							</Header>
						</Table.Cell>
						<Table.Cell style={styles.users} textAlign="center">
							{val.users}
						</Table.Cell>
						<Table.Cell style={styles.users} textAlign="center">
							{val.score}
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	</div>
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
		width: '7.5rem'
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
	).isRequired,
	onSelect: PropTypes.func.isRequired
};
