import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";
import { Fragment } from "react";

const Authentication = () => {
	return (
		<Fragment>
			<h1>Sign In Page</h1>
			<div className='container'>
				<SignInForm className='sign-in' />
				<SignUpForm className='sign-up' />
			</div>
		</Fragment>
	);
};

export default Authentication;
