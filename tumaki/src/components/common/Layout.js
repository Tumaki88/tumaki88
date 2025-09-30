import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: var(--background);
  /* Create grid pattern background */
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  padding: var(--spacing-lg);
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Layout = () => (
  <LayoutContainer>
    <Sidebar />
    <MainContent>
      <Outlet />
    </MainContent>
  </LayoutContainer>
);

export default Layout;
