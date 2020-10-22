import React from 'react';
import styled from 'react-emotion';
import { isLoggedInVar } from '../cache';
import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

const LogoutButton: React.FC<any> = () => {
  return (
    <StyledButton onClick={() => {
      isLoggedInVar(false);
      localStorage.clear();
    }}>
      <ExitIcon />
      Logout
    </StyledButton>
  );
}

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0
});

export default LogoutButton;