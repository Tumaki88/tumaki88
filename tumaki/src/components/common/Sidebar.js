import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FiMessageCircle, FiBookOpen, FiSettings } from 'react-icons/fi';

const SidebarContainer = styled.aside`
  width: 260px;
  background: var(--sidebar-bg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md);
  letter-spacing: 1px;
  display: flex;
  align-items: center;
`;

const LogoHighlight = styled.span`
  color: var(--primary-light);
  margin-left: 2px;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-lg);
`;

const StyledNavLink = styled(NavLink)`
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  transition: all 0.2s ease;
  font-weight: 500;

  &.active {
    background: rgba(127, 92, 255, 0.15);
    color: var(--primary-light);
  }

  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.05);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding: var(--spacing-md);
  font-size: 0.85rem;
  color: var(--text-secondary);
  opacity: 0.7;
  text-align: center;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>
        Tumaki<LogoHighlight>AI</LogoHighlight>
      </Logo>
      <NavLinks>
        <StyledNavLink to="/" end>
          <FiMessageCircle /> Chat
        </StyledNavLink>
        <StyledNavLink to="/memories">
          <FiBookOpen /> Memories
        </StyledNavLink>
      </NavLinks>
      <Footer>
        © {new Date().getFullYear()} Tumaki AI Assistant
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar;