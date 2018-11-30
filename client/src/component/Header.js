import React, { Component, Fragment, Suspense } from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu, Button } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import DefaultHeader from '../pages/dashboard/DefaultHeader';
import DefaultAside from '../pages/dashboard/DefaultAside';
import DefaultFooter from '../pages/dashboard/DefaultFooter';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

import Auth from '../modules/Auth';

export default class Header extends Component  {

  render() {
    const { children } = this.props;
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <ToastContainer autoClose={2000}/>
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            {/*<AppSidebarNav navConfig={navigation} {...this.props} />*/}
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/*<AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid>
              <Suspense >
                {children}
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense >
            <DefaultFooter />
          </Suspense>
        </AppFooter>
        {/*
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
          */}
      </div>
    );
  }
};
