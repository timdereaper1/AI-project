import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import './css/scheme.css';

const GradingScheme: React.FunctionComponent<{}> = props => (
	<div className="scheme">
		<Header size="large" className="scheme-title">
			Grading Scheme
		</Header>
		<p className="text">
			The grading scheme AMA use to grade essays. Edit, add or delete a scheme.
		</p>
		<p className="text">
			Note when a scheme has been deleted, the system automatically updates ensuring that the
			range difference between adjacent scheme is 1
		</p>
		<div className="table-wrap">
			<Table basic="very" className="scheme-table" textAlign="center" padded>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Minimum</Table.HeaderCell>
						<Table.HeaderCell>Maximum</Table.HeaderCell>
						<Table.HeaderCell>Grade</Table.HeaderCell>
						<Table.HeaderCell />
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>80</Table.Cell>
						<Table.Cell>100</Table.Cell>
						<Table.Cell>A</Table.Cell>
						<Table.Cell>button</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>80</Table.Cell>
						<Table.Cell>100</Table.Cell>
						<Table.Cell>A</Table.Cell>
						<Table.Cell>button</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</div>
	</div>
);

export default GradingScheme;
