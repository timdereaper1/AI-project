import React from 'react';
import PropTypes from 'prop-types';
import { Header, Table, Button, Icon } from 'semantic-ui-react';
import './css/scheme.css';
import SchemeInput from './SchemeInput';
import { Scheme } from './_helpers';

type GradingSchemeProps = {
	scheme: Array<Scheme>,
	onSchemeChange: Function,
	onSchemeDelete: Function,
	onSchemeAdd: Function,
	onSaveScheme: Function,
	isSaved: boolean,
	onCreateScheme: Function
};

const GradingScheme: React.FunctionComponent<GradingSchemeProps> = props => (
	<div className="scheme">
		<Header size="large" textAlign="center" className="scheme-title">
			Grading Scheme
		</Header>
		{props.scheme && (
			<div className="table-wrap">
				<Table basic="very" className="scheme-table" textAlign="center" padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Minimum</Table.HeaderCell>
							<Table.HeaderCell>Maximum</Table.HeaderCell>
							<Table.HeaderCell>Grade</Table.HeaderCell>
							<Table.HeaderCell style={{ width: '6.5rem' }} />
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{props.scheme.map((sche, _i, elems) => (
							/* eslint-disable-next-line react/no-array-index-key */
							<Table.Row key={_i}>
								<Table.Cell>
									<SchemeInput
										value={sche.min}
										name="min"
										index={_i}
										onChange={props.onSchemeChange}
									/>
								</Table.Cell>
								<Table.Cell>
									<SchemeInput
										value={sche.max}
										name="max"
										index={_i}
										onChange={props.onSchemeChange}
									/>
								</Table.Cell>
								<Table.Cell>
									<SchemeInput
										value={sche.grade}
										name="grade"
										index={_i}
										onChange={props.onSchemeChange}
									/>
								</Table.Cell>
								<Table.Cell>
									{_i === elems.length - 1 && (
										<React.Fragment>
											<Button
												icon
												circular
												color="green"
												className="actionbtn add-btn"
												onClick={props.onSchemeAdd}
											>
												<Icon name="plus" />
											</Button>
											<Button
												icon
												circular
												color="red"
												className="actionbtn del-btn"
												onClick={() => props.onSchemeDelete(_i)}
											>
												<Icon name="times" />
											</Button>
										</React.Fragment>
									)}
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		)}
		<p className="text">
			The grading scheme AMA use to grade essays. Edit, add or delete a scheme.
		</p>
		<p className="text">
			Note when a scheme has been deleted, the system automatically updates ensuring that the
			range difference between adjacent scheme is 1
		</p>
		<div style={{ textAlign: 'right' }}>
			{(!props.scheme || props.scheme.length === 0) && (
				<Button className="save-btn create" onClick={props.onCreateScheme}>
					Add Scheme
				</Button>
			)}
			<Button className="save-btn" disabled={props.isSaved} onClick={props.onSaveScheme}>
				Save
			</Button>
		</div>
	</div>
);

GradingScheme.propTypes = {
	scheme: PropTypes.arrayOf(
		PropTypes.shape({
			max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			grade: PropTypes.string
		})
	),
	onSchemeChange: PropTypes.func.isRequired,
	onSchemeAdd: PropTypes.func.isRequired,
	onSchemeDelete: PropTypes.func.isRequired,
	onSaveScheme: PropTypes.func.isRequired,
	isSaved: PropTypes.bool.isRequired,
	onCreateScheme: PropTypes.func.isRequired
};

GradingScheme.defaultProps = {
	scheme: null
};

export default GradingScheme;
