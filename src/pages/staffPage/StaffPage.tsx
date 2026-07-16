import { FC, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import { settingLayout } from '../../layout/SettingLayout';
import { ContainerBox } from '../../components/StylesComponents';
import { fetchStaffMe } from '../../api/reportsApi';
import { StaffReportsSection } from './sections/StaffReportsSection';
import { STAFF_DEFAULT_SECTION, StaffSection, getStaffNavItems, isStaffSection } from './staff.constants';
import {
  StyledDashboardContainer,
  StyledDashboardContent,
  StyledDashboardHero,
  StyledDashboardNavDescription,
  StyledDashboardNavItem,
  StyledDashboardNavList,
  StyledDashboardNavTitle,
  StyledDashboardPanel,
  StyledDashboardSidebar,
} from '../dashboardPage/StyledDashboardPage';

type StaffShellProps = {
  activeSection: StaffSection;
};

const StaffShell = ({ activeSection }: StaffShellProps) => {
  const navigate = useNavigate();
  const navItems = useMemo(() => getStaffNavItems(), []);

  return (
    <ContainerBox>
      <StyledDashboardContainer className="container">
        <StyledDashboardSidebar>
          <StyledDashboardHero>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GavelOutlinedIcon sx={{ color: '#8e7bff', fontSize: 22 }} />
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Staff</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
              Платформенная модерация и доверие. Канальная модерация остаётся в панели стрима.
            </Typography>
          </StyledDashboardHero>

          <StyledDashboardNavList>
            {navItems.map((item) => (
              <StyledDashboardNavItem
                key={item.value}
                active={item.value === activeSection}
                onClick={() => navigate(item.path)}
              >
                <StyledDashboardNavTitle>{item.title}</StyledDashboardNavTitle>
                <StyledDashboardNavDescription>{item.description}</StyledDashboardNavDescription>
              </StyledDashboardNavItem>
            ))}
          </StyledDashboardNavList>
        </StyledDashboardSidebar>

        <StyledDashboardContent>
          <StyledDashboardPanel>{activeSection === 'reports' && <StaffReportsSection />}</StyledDashboardPanel>
        </StyledDashboardContent>
      </StyledDashboardContainer>
    </ContainerBox>
  );
};

const resolveStaffSection = (section?: string): StaffSection | null => {
  if (!section) return null;
  return isStaffSection(section) ? section : null;
};

export const StaffPage: FC = settingLayout(() => {
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();
  const activeSection = resolveStaffSection(section);
  const [access, setAccess] = useState<'loading' | 'ok' | 'denied'>('loading');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchStaffMe();
      if (cancelled) return;
      if (!result.success || !result.permissions.canModeratePlatform) {
        setAccess('denied');
        return;
      }
      setAccess('ok');
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!section) {
      navigate(`/staff/${STAFF_DEFAULT_SECTION}`, { replace: true });
      return;
    }
    if (!activeSection) {
      navigate(`/staff/${STAFF_DEFAULT_SECTION}`, { replace: true });
    }
  }, [section, activeSection, navigate]);

  if (access === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={28} sx={{ color: '#8e7bff' }} />
      </Box>
    );
  }

  if (access === 'denied') {
    return <Navigate to="/" replace />;
  }

  if (!section) {
    return <Navigate to={`/staff/${STAFF_DEFAULT_SECTION}`} replace />;
  }

  if (!activeSection) return <></>;

  return <StaffShell activeSection={activeSection} />;
});
