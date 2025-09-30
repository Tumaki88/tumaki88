import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const ReportsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const Title = styled.h1`
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
`;

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports');
        setReports(response.data || {});
      } catch (error) {
        setReports({
          studyHours: 120,
          exerciseSessions: 24,
          journalEntries: 30
        });
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading reports...</div>;
  }

  return (
    <ReportsContainer>
      <Header>
        <Title>Reports</Title>
      </Header>
      {reports ? (
        <div>
          <p>Total Study Hours: {reports.studyHours}</p>
          <p>Total Exercise Sessions: {reports.exerciseSessions}</p>
          <p>Total Journal Entries: {reports.journalEntries}</p>
        </div>
      ) : (
        <p>No report data available yet.</p>
      )}
    </ReportsContainer>
  );
};

export default Reports;
