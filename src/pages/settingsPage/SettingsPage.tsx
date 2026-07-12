import { FC, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { settingLayout } from '../../layout/SettingLayout';
import { SETTINGS_DEFAULT_SECTION, resolveSettingsSection } from './settings.constants';
import { SettingsShell } from './SettingsShell';

export const SettingsPage: FC = settingLayout(() => {
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();
  const activeSection = resolveSettingsSection(section);

  useEffect(() => {
    const legacy = localStorage.getItem('settings-selected');
    if (legacy === 'stream') {
      localStorage.removeItem('settings-selected');
      navigate('/dashboard/stream', { replace: true });
      return;
    }
    if (legacy && !section) {
      localStorage.removeItem('settings-selected');
    }
  }, [navigate, section]);

  useEffect(() => {
    if (!section) return;
    if (!activeSection) {
      navigate(`/settings/${SETTINGS_DEFAULT_SECTION}`, { replace: true });
    }
  }, [section, activeSection, navigate]);

  if (!section) {
    return <Navigate to={`/settings/${SETTINGS_DEFAULT_SECTION}`} replace />;
  }

  if (!activeSection) {
    return <></>;
  }

  return <SettingsShell activeSection={activeSection} />;
});
