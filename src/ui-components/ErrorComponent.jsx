import { Typography } from "@material-ui/core";
import React, { Component } from "react";

/**
 * @summary Renders an error message
 * @param {object} [error] Contains key 'errorCode' to provide additional error detail
 */
export class ErrorComponent extends Component {


    render(){
        return <Typography variant="h6">An Error Occurred: {this.error.errorCode}</Typography>;
    }
}