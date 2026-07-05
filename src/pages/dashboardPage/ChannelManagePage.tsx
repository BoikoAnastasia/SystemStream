import { FC, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { settingLayout } from '../../layout/SettingLayout';
import { useAppSelector } from '../../hooks/redux';
import { useStreamTeamAccess } from '../../hooks/useStreamTeam';
import { DASHBOARD_DEFAULT_SECTION } from './dashboard.constants';
import { DashboardShell, resolveDashboardSection } from './DashboardShell';

const ROLE_LABELS: Record<string, string> = {
  Moderator: 'Модератор',
  Assistant: 'Ассистент',
};

export const ChannelManagePage: FC = settingLayout(() => {
  const navigate = useNavigate();
  const { nickname, section } = useParams<{ nickname: string; section?: string }>();
  const { data: profile } = useAppSelector((state) => state.user);
  const activeSection = resolveDashboardSection(section);
  const channelNickname = nickname?.trim() ?? '';
  const { access, isLoading } = useStreamTeamAccess(channelNickname);

  useEffect(() => {
    if (!section || !channelNickname) return;
    if (!activeSection) {
      navigate(`/${channelNickname}/manage/${DASHBOARD_DEFAULT_SECTION}`, { replace: true });
    }
  }, [section, activeSection, channelNickname, navigate]);

  useEffect(() => {
    if (isLoading || !channelNickname) return;

    if (!access?.canManageChat) {
      navigate(`/${channelNickname}`, { replace: true });
      return;
    }

    if (access.role === 'Assistant' && activeSection && activeSection !== 'chat') {
      navigate(`/${channelNickname}/manage/chat`, { replace: true });
    }
  }, [isLoading, access, channelNickname, activeSection, navigate]);

  if (!channelNickname) {
    return <Navigate to="/" replace />;
  }

  if (profile?.nickname === channelNickname) {
    return <Navigate to={`/dashboard/${section || DASHBOARD_DEFAULT_SECTION}`} replace />;
  }

  if (!section) {
    return <Navigate to={`/${channelNickname}/manage/${DASHBOARD_DEFAULT_SECTION}`} replace />;
  }

  if (!activeSection) {
    return <></>;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#8e7bff' }} />
      </Box>
    );
  }

  if (!access?.canManageChat) {
    return <></>;
  }

  return (
    <DashboardShell
      mode="delegated"
      channelNickname={channelNickname}
      activeSection={activeSection}
      roleLabel={access.role ? (ROLE_LABELS[access.role] ?? access.role) : undefined}
      canManageStream={access.canManageStream}
      canManageTeam={access.canManageTeam}
    />
  );
});
