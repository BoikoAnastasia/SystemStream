import { IProfile, ISocialLink } from '../types/share';
import { normalizeSocialLinks } from '../constants/socialPlatforms';

export const mapSocialLinksFromApi = (raw: unknown): ISocialLink[] => {
  if (!Array.isArray(raw)) return [];
  return normalizeSocialLinks(
    raw.map((item: Record<string, unknown>) => ({
      platform: String(item.platform ?? item.Platform ?? ''),
      url: String(item.url ?? item.Url ?? ''),
    }))
  );
};

export const mapUserProfileFromApi = (data: Record<string, unknown>): IProfile => {
  const profile = data as unknown as IProfile;
  return {
    ...profile,
    socialLinks: mapSocialLinksFromApi(data.socialLinks ?? data.SocialLinks),
  };
};
