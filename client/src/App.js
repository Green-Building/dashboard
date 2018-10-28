import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>Column 10</Grid.Column>

            <Grid.Column width={6}>
              <Button primary>Button</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
