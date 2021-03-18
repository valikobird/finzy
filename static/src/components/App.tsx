import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

function App(): React.ReactElement {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && (
                <React.Fragment>
                    <Profile />
                    <LogoutButton />
                </React.Fragment>
            )}
        </div>
    );
}

export default App;
