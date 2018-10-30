import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

export default ({ children }) => {
  return (
    <div>
      <Menu>
        <Menu.Menu position="right">
          <Button primary>Logout</Button>
        </Menu.Menu>
      </Menu>
      { /* child component will be rendered here */ }
      {children}
    </div>
  );
};
