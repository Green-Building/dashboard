import React, { Fragment } from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu, Button } from 'semantic-ui-react';

import Auth from '../modules/Auth';

export default ({ children }) => {
  return (
    <div>
      {Auth.isUserAuthenticated() ?
        (<Menu>
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
            <Link to="/logout"><Button primary>Logout</Button></Link>
          </Menu.Item>
        </Menu>) : null
      }
      { /* child component will be rendered here */ }
      {children}
    </div>
  );
};
