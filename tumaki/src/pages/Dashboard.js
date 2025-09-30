import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import QuickStats from '../components/dashboard/QuickStats';
import GoalProgress from '../components/dashboard/GoalProgress';
import RecentActivity from '../components/dashboard/RecentActivity';
import MotivationalQuote from '../components/dashboard/MotivationalQuote';
import WeeklyOverview from '../components/dashboard/WeeklyOverview';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const WelcomeTitle = styled.h1`
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
`;

const WelcomeSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    todayStats: null,
    goals: [],
    recentEntries: [],
    weeklyProgress: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, goalsRes, entriesRes, progressRes] = await Promise.all([
        api.get('/progress/today'),
        api.get('/goals'),
        api.get('/journal/recent'),
        api.get('/progress/weekly')
      ]);

      setDashboardData({
        todayStats: statsRes.data,
        goals: goalsRes.data,
        recentEntries: entriesRes.data,
        weeklyProgress: progressRes.data
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <DashboardContainer>
      <Header>
        <WelcomeTitle>Welcome back, Adi!</WelcomeTitle>
        <WelcomeSubtitle>
          Here's your progress overview for today
        </WelcomeSubtitle>
      </Header>

      <MotivationalQuote />

      <GridLayout>
        <QuickStats stats={dashboardData.todayStats} />
        <GoalProgress goals={dashboardData.goals} />
      </GridLayout>

      <GridLayout>
        <WeeklyOverview data={dashboardData.weeklyProgress} />
        <RecentActivity entries={dashboardData.recentEntries} />
      </GridLayout>
    </DashboardContainer>
  );
};

export default Dashboard;
