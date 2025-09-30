import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FiGrid, FiBookOpen, FiTarget, FiBarChart2 } from 'react-icons/fi';

const Nav = styled.nav`
  background: var(--card-bg);
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
`;

const NavLinks = styled.div`
  display: flex;
  gap: var(--spacing-lg);
`;

const StyledNavLink = styled(NavLink)`
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);

  &.active {
    background: var(--primary-light);
    color: var(--primary);
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>Tumaki</Logo>
      <NavLinks>
        <StyledNavLink to="/dashboard"><FiGrid /> Dashboard</StyledNavLink>
        <StyledNavLink to="/journal"><FiBookOpen /> Journal</StyledNavLink>
        <StyledNavLink to="/goals"><FiTarget /> Goals</StyledNavLink>
        <StyledNavLink to="/reports"><FiBarChart2 /> Reports</StyledNavLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
