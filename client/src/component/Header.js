import React, { Fragment } from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu, Button } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';

import Auth from '../modules/Auth';

export default ({ children }) => {
  return (
    <div style={{'height': '100vh'}}>
      {Auth.isUserAuthenticated() ?
        (<Menu>
          <Menu.Item position="left">
            <IndexLink to="/">Home</IndexLink>
          </Menu.Item>
          { Auth.getUser()==='client' ?
            (<Fragment>
              <Menu.Item position="left">
                <Link>Client</Link>
              </Menu.Item>
            </Fragment>) :
            (<Fragment>
              <Menu.Item position="left">
                <Link to="/infra-manager">Infra Manager</Link>
              </Menu.Item>
              <Menu.Item position="left">
                <Link to="/data-manager">Data Manager</Link>
              </Menu.Item>
            </Fragment>)
          }
          <Menu.Item position="right">
            <Link to="/logout"><Button primary>Logout</Button></Link>
          </Menu.Item>
        </Menu>) : null
      }
      <ToastContainer autoClose={2000}/>
      { /* child component will be rendered here */ }
      {children}
    </div>
  );
};
