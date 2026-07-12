import { ReactNode } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { ISocialLink } from '../types/share';

export type SocialPlatformId =
  | 'telegram'
  | 'youtube'
  | 'twitch'
  | 'discord'
  | 'vk'
  | 'instagram'
  | 'twitter'
  | 'facebook'
  | 'tiktok'
  | 'steam';

export type SocialPlatformDef = {
  id: SocialPlatformId;
  label: string;
  placeholder: string;
  urlHint: string;
  aliases: string[];
};

export const SOCIAL_PLATFORMS: SocialPlatformDef[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    placeholder: 'https://t.me/username',
    urlHint: 'Ссылка на канал или профиль в Telegram',
    aliases: ['telegram', 'телеграм', 'tg', 'telegr'],
  },
  {
    id: 'youtube',
    label: 'YouTube',
    placeholder: 'https://youtube.com/@channel',
    urlHint: 'Канал или ролик на YouTube',
    aliases: ['youtube', 'ютуб', 'you tube'],
  },
  {
    id: 'twitch',
    label: 'Twitch',
    placeholder: 'https://twitch.tv/username',
    urlHint: 'Страница канала на Twitch',
    aliases: ['twitch', 'твич'],
  },
  {
    id: 'discord',
    label: 'Discord',
    placeholder: 'https://discord.gg/invite',
    urlHint: 'Инвайт или профиль Discord',
    aliases: ['discord', 'дискорд'],
  },
  {
    id: 'vk',
    label: 'VK',
    placeholder: 'https://vk.com/username',
    urlHint: 'Страница или группа ВКонтакте',
    aliases: ['vk', 'vkontakte', 'вконтакте', 'вк'],
  },
  {
    id: 'instagram',
    label: 'Instagram',
    placeholder: 'https://instagram.com/username',
    urlHint: 'Профиль в Instagram',
    aliases: ['instagram', 'insta', 'инстаграм', 'инста'],
  },
  {
    id: 'twitter',
    label: 'X (Twitter)',
    placeholder: 'https://x.com/username',
    urlHint: 'Профиль в X / Twitter',
    aliases: ['twitter', 'x', 'твиттер', 'x (twitter)'],
  },
  {
    id: 'facebook',
    label: 'Facebook',
    placeholder: 'https://facebook.com/page',
    urlHint: 'Страница или профиль Facebook',
    aliases: ['facebook', 'fb', 'фейсбук'],
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    placeholder: 'https://tiktok.com/@username',
    urlHint: 'Профиль в TikTok',
    aliases: ['tiktok', 'тикток'],
  },
  {
    id: 'steam',
    label: 'Steam',
    placeholder: 'https://steamcommunity.com/id/username',
    urlHint: 'Профиль Steam',
    aliases: ['steam', 'стим'],
  },
];

export const MAX_SOCIAL_LINKS = 5;

const TelegramIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M9.78 15.03 9.6 19.8c.41 0 .59-.18.8-.4l1.92-1.84 3.98 2.92c.73.4 1.25.19 1.43-.67l2.62-12.3h.01c.23-1.07-.39-1.49-1.1-1.23L2.74 9.38c-1.04.4-1.02.98-.18 1.24l4.47 1.39L18.9 6.1c.56-.37 1.07-.16.65.22"
    />
  </SvgIcon>
);

const TwitchIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M4 3 2 6.5v13h5v3h3l3-3h4l6-6V3H4zm15 10-3 3h-5l-3 3v-3H6V5h13v8zm-3-8h-2v5h2V5zm-3 0h-2v5h2V5z"
    />
  </SvgIcon>
);

const DiscordIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M18.9 5.5A15.5 15.5 0 0 0 14.9 4l-.2.4a17.8 17.8 0 0 1 4.3 1.1l-.1-.1a14 14 0 0 0-4.1-1.4 16.5 16.5 0 0 0-8.6 0 14 14 0 0 0-4.1 1.4l-.1.1A17.8 17.8 0 0 1 9.3 4L9.1 4a15.5 15.5 0 0 0-4 1.5C2.5 9.6 1.9 13.6 2.2 17.5a15.6 15.6 0 0 0 4.8 2.4l1.1-1.7a10.2 10.2 0 0 1-2.5-1.2l.6-.5a11.4 11.4 0 0 0 9.6 0l.6.5a10.2 10.2 0 0 1-2.5 1.2l1.1 1.7a15.6 15.6 0 0 0 4.8-2.4c.5-4.8-.2-8.8-2.7-12zm-6.4 10.2c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1 2 1 2 2.1-.9 2.1-2 2.1zm6.6 0c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1 2 1 2 2.1-.9 2.1-2 2.1z"
    />
  </SvgIcon>
);

const VkIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm2.07 14.1h-1.45c-.55 0-.72-.44-1.71-1.44-.86-.83-1.24-.95-1.45-.95-.3 0-.38.09-.38.49v1.31c0 .35-.11.56-1.04.56-1.54 0-3.25-.93-4.45-2.67-1.07-1.53-1.5-3.2-1.5-3.54 0-.21.09-.41.52-.41h1.45c.37 0 .51.17.65.57.72 2.08 1.92 3.91 2.42 3.91.18 0 .27-.09.27-.55V10.1c-.06-.99-.58-1.07-.58-1.43 0-.17.14-.34.37-.34h2.29c.31 0 .42.17.42.54v2.9c0 .31.14.42.23.42.18 0 .34-.11.68-.45 1.04-1.17 1.8-2.98 1.8-2.98.1-.21.27-.41.64-.41h1.45c.44 0 .54.23.44.54-.18.85-1.96 3.37-1.96 3.37-.16.26-.21.37 0 .65.16.21.66.65 1 1.05.62.71 1.1 1.3 1.23 1.71.14.41-.07.62-.48.62z"
    />
  </SvgIcon>
);

const TikTokIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.5 3h-2.7v11.1a2.6 2.6 0 1 1-2.6-2.6c.2 0 .5 0 .7.1V9.1a5.3 5.3 0 1 0 5.3 5.3V8.4c1 .7 2.2 1.1 3.5 1.1V7c-1.5 0-2.9-.6-4-1.7V3z"
    />
  </SvgIcon>
);

const SteamIcon = (props: SvgIconProps) => <SportsEsportsIcon {...props} />;

const PLATFORM_ICONS: Record<SocialPlatformId, (props: SvgIconProps) => ReactNode> = {
  telegram: (props) => <TelegramIcon {...props} />,
  youtube: (props) => <YouTubeIcon {...props} />,
  twitch: (props) => <TwitchIcon {...props} />,
  discord: (props) => <DiscordIcon {...props} />,
  vk: (props) => <VkIcon {...props} />,
  instagram: (props) => <InstagramIcon {...props} />,
  twitter: (props) => <TwitterIcon {...props} />,
  facebook: (props) => <FacebookIcon {...props} />,
  tiktok: (props) => <TikTokIcon {...props} />,
  steam: (props) => <SteamIcon {...props} />,
};

export const resolvePlatformId = (platform: string): SocialPlatformId | null => {
  const normalized = platform.trim().toLowerCase();
  for (const def of SOCIAL_PLATFORMS) {
    if (def.id === normalized || def.aliases.includes(normalized)) {
      return def.id;
    }
  }
  return null;
};

export const getPlatformDef = (platform: string): SocialPlatformDef | null => {
  const id = resolvePlatformId(platform);
  return id ? (SOCIAL_PLATFORMS.find((p) => p.id === id) ?? null) : null;
};

export const getPlatformLabel = (platform: string): string => {
  const def = getPlatformDef(platform);
  return def?.label ?? platform;
};

export const isKnownPlatform = (platform: string): boolean => resolvePlatformId(platform) !== null;

export const normalizeSocialLink = (link: ISocialLink): ISocialLink => {
  const id = resolvePlatformId(link.platform);
  if (id) {
    return { platform: id, url: link.url.trim() };
  }
  return {
    platform: link.platform.trim().slice(0, 50),
    url: link.url.trim(),
  };
};

export const normalizeSocialLinks = (links: ISocialLink[] | null | undefined): ISocialLink[] =>
  (links ?? [])
    .filter((link) => link.url?.trim())
    .map(normalizeSocialLink)
    .reduce<ISocialLink[]>((acc, link) => {
      if (acc.some((item) => item.platform === link.platform)) return acc;
      acc.push(link);
      return acc;
    }, []);

export const SocialPlatformIcon = ({
  platform,
  fontSize = 20,
  sx,
}: {
  platform: string;
  fontSize?: number;
  sx?: SvgIconProps['sx'];
}) => {
  const id = resolvePlatformId(platform);
  const iconProps: SvgIconProps = { sx: { fontSize, ...sx } };

  if (id && PLATFORM_ICONS[id]) {
    return <>{PLATFORM_ICONS[id](iconProps)}</>;
  }

  return <LinkOutlinedIcon sx={{ fontSize, ...sx }} />;
};
