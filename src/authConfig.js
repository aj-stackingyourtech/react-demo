// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: "bbde614e-02c6-477b-8d42-8faa558c60e0",
        authority: "https://thirteendelta.b2clogin.com/thirteendelta.onmicrosoft.com/B2C_1_signupsignin",
        knownAuthorities: ["thirteendelta.b2clogin.com"],
        redirectUri: "https://yellow-sand-098426110.azurestaticapps.net/",
        //redirectUri: "http://localhost:3000/",
        postLogoutRedirectUri: "https://yellow-sand-098426110.azurestaticapps.net/"
        //postLogoutRedirectUri: "http://localhost:3000/"
    }
};

// Scopes you add here will be prompted for consent during login
export const loginRequest = {
    scopes: ["https://thirteendelta.onmicrosoft.com/bbde614e-02c6-477b-8d42-8faa558c60e0/Files.Read"]
};
