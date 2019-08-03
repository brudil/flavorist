import React, { useContext } from 'react';
import { COLORS } from '../style/constants';
import { SidebarContainer } from './SidebarContainer';
import { auth, UserContext } from '../context/authentication';
import { Link } from '@reach/router';
import { useLogout } from '../hooks/logout';

const LoggedIn: React.FC<{ auth: UserContext }> = ({ auth }) => {
  const logout = useLogout();

  return (
    <SidebarContainer>
      <img
        css={{
          borderRadius: '50%',
        }}
        width={28}
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        alt="Profile of James"
      />
      <span
        css={{
          fontSize: '1.1rem',
          fontWeight: 600,
        }}
      >
        {auth.user && (auth.user.username || auth.user.username)}
      </span>
      <button onClick={logout}>Logout</button>
    </SidebarContainer>
  );
};

const Anonymous: React.FC = () => (
  <SidebarContainer>
    <Link
      to="/login"
      css={{
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#fff',
        textDecoration: 'none',
      }}
    >
      Log in / Join
    </Link>
  </SidebarContainer>
);

export const SidebarProfile: React.FC = () => {
  const authData = useContext(auth);

  return (
    <div
      css={{
        background: COLORS.AccentLight,
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: 220,
      }}
    >
      {authData.user !== null ? <LoggedIn auth={authData} /> : <Anonymous />}
    </div>
  );
};
