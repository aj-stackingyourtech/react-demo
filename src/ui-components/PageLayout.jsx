import Typography from "@material-ui/core/Typography";
import NavBar from "./NavBar";

import React, { Component } from "react";

/**
 * @summary Wrapper class for the entire site
 * @param {object} [props] The 'children' property of this represents the content of the current page
 */
export class PageLayout extends Component{


    /** renders the page **/
    render(){
    return (
        <>
            <NavBar />
            <Typography variant="h5">
                <center>Welcome to the Microsoft Authentication Library For React B2C Sample</center>
            </Typography>
            <br/>
            <br/>
            {this.props.children}
        </>
    );
    }
};