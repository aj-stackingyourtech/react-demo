import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Material-UI imports
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { theme } from "./styles/theme";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";

// Sample app imports
import { PageLayout } from "./ui-components/PageLayout";
import { Home } from "./pages/Home";
import { Protected } from "./pages/Protected";
import React, { Component } from "react";

/**
 * @summary Constructor takes in properties to initialize the app and create the state object
 * @param {object} [props] Should contain a property 'pca' that's as PublicClientApplication() object
 * @property {PublicClientApplication} [pca] The MSAL-based object handling authentication
 * @property {Object} [state] Object representing the state machine of the application
 * */
class App extends Component{

    /**
     * @summary Constructor takes in properties to initialize the app and create the state object
     * @param {object} props
     * @property {PublicClientApplication} [pca] The MSAL-based object handling authentication
     * @property {Object} [state] Object representing the state machine of the application
     *
     **/
    constructor(props){
        super(props);
        console.log("This is the PCA:");
        console.log(props);
        console.log("This.props");
        console.log(this.props);
        this.state = {
            count: 0
        };
    }

    /**
     * @summary Renders the component
     *
     *
     **/
    render(){
        console.log("Render() ... ");
        console.log(this.props);
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<MsalProvider instance={this.props.pca}>
					<PageLayout>
						<Grid container justify="center">
							<Pages />
						</Grid>
					</PageLayout>
				</MsalProvider>
			</ThemeProvider>
		</Router>
	);
    }
}

/**
 * @summary Container for the Route and basic paths of the app.  Currently contains two routes: home and '/protected' which requires authetnication
 *
 **/
class Pages extends Component {

    /** Renders the given page based on the route in the URI **/
    render() {
        return(
            < Switch >
            < Route
        path = "/protected" >
            < Protected / >
            < / Route >
            < Route
        path = "/" >
            < Home / >
            < / Route >
            < / Switch >
    );

    }
}


export default App;
