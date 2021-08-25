import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import Typography from "@material-ui/core/Typography";

// LogRocket
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';


LogRocket.init('jcg6ee/azure-react-demo-dev');
setupLogRocketReact(LogRocket);


const WelcomeName = () => {
    const { accounts } = useMsal();
    const [name, setName] = useState(null);

    useEffect(() => {
        if (accounts.length > 0) {
            setName(accounts[0].name.split(" ")[0]);
        }
    }, [accounts]);

    if (name) {
        // This is an example script - don't forget to change it!
        LogRocket.identify(name, {
            name: name,
            email: accounts[0].email,

            // Add your own custom user variables here, ie:
            subscriptionType: 'pro'
        });

        return <Typography variant="h6">Welcome, {name}</Typography>;
    } else {
        return null;
    }
};

export default WelcomeName;