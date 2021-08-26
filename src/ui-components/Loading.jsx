import { Typography } from "@material-ui/core";
import React, { Component } from "react";

/**
 * @summary Displays feedback to user that the authentication process is loading
 */
export class Loading extends Component {

    /** Renders the component **/
    render(){
        return <Typography variant="h6">Authentication in progress...</Typography>
    }
}