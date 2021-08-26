import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// MSAL imports
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

// LogRocket

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
LogRocket.init('jcg6ee/azure-react-demo-dev');
setupLogRocketReact(LogRocket);

const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.render(
<React.StrictMode>
<App pca={new PublicClientApplication(msalConfig)} />

</React.StrictMode>,
	document.getElementById('root')
);
