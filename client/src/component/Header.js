import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

export default () => {
  return (
    <Menu>
      <Menu.Menu position="right">
        <Button primary>Logout</Button>
      </Menu.Menu>
    </Menu>
  );
};
