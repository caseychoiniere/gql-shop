import React from 'react';
import { connect } from 'react-redux';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import {
	auth,
	createUserProfileDocument,
} from './firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user-selectors';
import { setCurrentUser } from './redux/user/user-actions';

import './App.css';

import CheckoutPage from './pages/checkout/checkout';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Header from './components/header/header';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(
			async userAuth => {
				if (userAuth) {
					const userRef = await createUserProfileDocument(
						userAuth,
					);
					userRef.onSnapshot(snapShot => {
						setCurrentUser({
							id: snapShot.id,
							...snapShot.data(),
						});
					});
				}
				setCurrentUser(userAuth);
			},
		);
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		const { currentUser } = this.props;
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route
						exact
						path="/checkout"
						component={CheckoutPage}
					/>
					<Route
						exact
						path="/signin"
						render={() =>
							currentUser ? (
								<Redirect to="/" />
							) : (
								<SignInAndSignUpPage />
							)
						}
					/>
				</Switch>
			</div>
		);
	}
}

const mapDispatchToProps = {
	setCurrentUser,
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
