import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class App extends Component<{}> {
    render(): React.ReactNode {
        return (
            <div>
                <Button primary>button</Button>
            </div>
        );
    }
}
