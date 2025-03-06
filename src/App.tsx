import React, { JSX } from 'react';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';


const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID || '',
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        redirectUri: 'http://localhost:3000'
    }
};

const pca = new PublicClientApplication(msalConfig);

function SignInButton(): JSX.Element {
    const { instance } = useMsal();
    const handleLogin = () => {
        instance.loginPopup().catch((e: Error) => console.error(e));
    };
    return <button onClick={handleLogin}>Sign In</button>;
}

function SignOutButton(): JSX.Element {
    const { instance } = useMsal();
    const handleLogout = () => {
        instance.logoutPopup();
    };
    return <button onClick={handleLogout}>Sign Out</button>;
}

function App(): JSX.Element {
    return (
        <div>
            <AuthenticatedTemplate>
                <h2>Welcome, you are logged in!</h2>
                <SignOutButton />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <h2>Please sign in</h2>
                <SignInButton />
            </UnauthenticatedTemplate>
        </div>
    );
}

export default function Main(): JSX.Element {
    return (
        <MsalProvider instance={pca}>
            <App />
        </MsalProvider>
    );
}

