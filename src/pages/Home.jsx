import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import React, { Component } from "react";

/**
 * @summary Home page component.  Will render either an AuthenticatedTemplate or UnauthenticatedTemplate based on whether the user is logged in.
 */
export class Home extends Component {

    /** Renders the page **/
    render(){
    return (
		<>
			<AuthenticatedTemplate>
				<Button component={RouterLink} to="/protected" variant="contained" color="primary">Request Access Token</Button>
			</AuthenticatedTemplate>

			<UnauthenticatedTemplate>
				<Typography variant="h6">
					<center>Please sign-in to acquire access tokens.</center>
				</Typography>
			</UnauthenticatedTemplate>
		</>
	);
    }
}