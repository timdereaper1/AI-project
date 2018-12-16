import React from 'react';
import { Header } from 'semantic-ui-react';
import './css/appheader.css';

export const AppHeader = () => (
	<Header size="huge" textAlign="center" className="main-app-header">
		Automated Monograph Accessor
		<Header.Subheader>New and Improved Automated Essay Marker</Header.Subheader>
	</Header>
);
