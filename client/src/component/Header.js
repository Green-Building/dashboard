import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu, Button } from 'semantic-ui-react';

export default ({ children }) => {
  return (
    <div>
      <Menu>
        <Menu.Item position="left">
          <IndexLink to="/">Home</IndexLink>
        </Menu.Item>
        <Menu.Item position="left">
          <Link to="/infra-manager">Infra Manager</Link>
        </Menu.Item>
        <Menu.Item position="left">
          <Link to="/data-manager">Data Manager</Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Button primary>Logout</Button>
        </Menu.Item>
      </Menu>
      { /* child component will be rendered here */ }
      {children}
    </div>
  );
};
