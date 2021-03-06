import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../Firebase/firebase.js';
import CartIcon from '../CartIcon/CartIcon.js';
import CartDropdown from '../CartDropdown/CartDropdown.js';
import { selectCurrentUser } from '../../Redux/user/user-selectors.js';
import { selectCartHidden } from '../../Redux/cart/cart-selectors.js';

import { ReactComponent as Logo } from '../../Assets/crown.svg';

import './Header.scss';

class Header extends React.Component {

  render() {
    const { currentUser, hidden } = this.props;
    return (
      <div className="header">
        <Link className="logo-container" to="/" >
          <Logo className="logo"/>
        </Link>
        <div className="options">
          <Link className="option" to="/shop">SHOP</Link>
          <Link className="option" to="/contact">CONTACT</Link>
          {
            currentUser ?
            <div className="option" onClick={() => auth.signOut()}>SIGNOUT</div>
            :
            <Link className="option" to="/signin">SIGNIN</Link>
          }
          <CartIcon/>
        </div>
        { hidden ? null : <CartDropdown/>}
      </div>  
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);