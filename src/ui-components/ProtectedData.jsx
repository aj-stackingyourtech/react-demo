import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MailIcon from '@material-ui/icons/Mail';
import LockOpenIcon from '@material-ui/icons/LockOpen';


/**
 * @summary Renders information about a specific user, used to demonstrate the ability to show data that only authenticated users can see.
 * @param {object} [responseData] Information about user, such as account.
 */
export class ProtectedData extends Component{



    /** renders the component **/
    render(){
    return (
        <List className="protectedData">
            <NameListItem name={this.responseData.account.name} />
            <MailListItem mail={this.responseData.account.username} />
            <AccessTokenExpiresListItem expiresOn={this.responseData.expiresOn} />
            <ScopesListItem scopes={this.responseData.scopes} />
        </List>
    );
    }
};

const NameListItem = ({name}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <PersonIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Name" secondary={name}/>
    </ListItem>
);

const AccessTokenExpiresListItem = ({expiresOn}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <ScheduleIcon />
            </Avatar>
        </ListItemAvatar>
{/*<ListItemText primary="Access Token Expires At" secondary={expiresOn.toString()}/>*/}
    </ListItem>
);

const MailListItem = ({mail}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <MailIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Username" secondary={mail}/>
    </ListItem>
);

const ScopesListItem = ({scopes}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <LockOpenIcon />
            </Avatar>
        </ListItemAvatar>
        <List>
            {scopes.map((scope, index) => (
                index === 0 ? <ListItemText primary="Scopes" secondary={scope} key={scope}/> : <ListItemText secondary={scope} />
            ))}
        </List>
    </ListItem>
);
