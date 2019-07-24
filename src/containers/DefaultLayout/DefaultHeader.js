import React, { Component } from 'react';
import { DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';

import tdiLogo from '../../assets/img/brand/tdi_logo.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
class DefaultHeader extends Component {
  logOut = () => {
    localStorage.clear();
    window.location.href = `http://rsc9-auth.koreasouth.cloudapp.azure.com/logout`;
    //window.location.reload();
};
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <a href="/" class="navbar-brand">관리자</a>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown>
            <DropdownToggle nav>
              <img src={tdiLogo} className="img-avatar" alt="admin" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto', height: 'auto' }}>
              <div className="dropdown-header text-center">
                  <strong>관리자 님</strong>
              </div>
              <button className="dropdown-item" onClick={this.logOut}>
                  <i className="fa fa-lock"></i>
                  Logout
              </button>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
