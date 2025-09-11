import Button from '@mui/material/Button';
import { SvgIconComponent } from '@mui/icons-material';

export const ButtonCustome = ({
  text,
  variant,
  size,
  icon: Icon,
  bg,
  onClick,
}: {
  text?: string | null;
  variant?: string | null;
  size?: string | null;
  bg?: string | null;
  icon?: SvgIconComponent;
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant === 'contained' ? 'contained' : 'text'}
      size={size === 'medium' ? 'medium' : 'small'}
      sx={[
        (theme) => ({
          textTransform: 'none',
          padding: '0 16px',
          height: '40px',
          borderRadius: '20px',
          fontWeight: 'bold',
          color: 'var(--background-block)',
          backgroundColor: bg ? bg : 'var(--primary)',
        }),
      ]}
    >
      {Icon && <Icon sx={{ fill: 'var(--white)' }} />}
      {text}
    </Button>
  );
};
