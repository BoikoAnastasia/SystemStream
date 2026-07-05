import { FC, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { settingLayout } from '../../layout/SettingLayout';
import { useAppSelector } from '../../hooks/redux';
import { DASHBOARD_DEFAULT_SECTION } from './dashboard.constants';
import { DashboardShell, resolveDashboardSection } from './DashboardShell';

export const DashboardPage: FC = settingLayout(() => {
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();
  const { data: profile } = useAppSelector((state) => state.user);
  const activeSection = resolveDashboardSection(section);

  useEffect(() => {
    if (!section) return;
    if (!activeSection) {
      navigate(`/dashboard/${DASHBOARD_DEFAULT_SECTION}`, { replace: true });
    }
  }, [section, activeSection, navigate]);

  if (!section) {
    return <Navigate to={`/dashboard/${DASHBOARD_DEFAULT_SECTION}`} replace />;
  }

  if (!activeSection || !profile?.nickname) {
    return <></>;
  }

  return (
    <DashboardShell mode="own" channelNickname={profile.nickname} activeSection={activeSection} roleLabel="Стример" />
  );
});
