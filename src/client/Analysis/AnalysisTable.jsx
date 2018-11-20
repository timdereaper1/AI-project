import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

interface AnalysisTableProps {
	values: Array<{ key: string, index: number, value: number, abbr?: string, desc?: string }>;
	extend?: boolean;
	endValue?: number;
}

const AnalysisTable: React.FunctionComponent<AnalysisTableProps> = props => (
	<Table basic="very">
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Name</Table.HeaderCell>
				{props.extend && (
					<React.Fragment>
						<Table.HeaderCell>Abbreviation</Table.HeaderCell>
						{/* <Table.HeaderCell>Description</Table.HeaderCell> */}
					</React.Fragment>
				)}
				<Table.HeaderCell>Value</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{props.values
				.map(val => (
					<Table.Row key={val.index}>
						<Table.Cell>{val.key}</Table.Cell>
						{props.extend && (
							<React.Fragment>
								<Table.Cell>{val.abbr}</Table.Cell>
								{/* <Table.Cell>{val.desc}</Table.Cell> */}
							</React.Fragment>
						)}
						<Table.Cell>{val.value}</Table.Cell>
					</Table.Row>
				))
				.slice(0, props.endValue || props.values.length)}
		</Table.Body>
	</Table>
);

AnalysisTable.propTypes = {
	values: PropTypes.arrayOf(PropTypes.object),
	extend: PropTypes.bool,
	endValue: PropTypes.number
};

AnalysisTable.defaultProps = {
	values: null,
	extend: false,
	endValue: null
};

export default AnalysisTable;
