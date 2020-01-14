import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {auth} from "../../firebase/firebase.utils";
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from "../../redux/cart/cart-selectors";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> :
                <Link to='/signIn'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            !hidden ? <CartDropdown/> : null
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
