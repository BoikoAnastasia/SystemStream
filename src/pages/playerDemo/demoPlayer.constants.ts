/** TEMP demo — удалить вместе с pages/playerDemo/ */

export {
  KEYBOARD_SHORTCUTS,
  LIVE_CATCHUP_THRESHOLD_SEC,
  LIVE_HLS_CONFIG,
  VOD_HLS_CONFIG,
} from '../../components/videoPlayer/videoPlayer.constants';

export const DEMO_STREAM_PRESETS = [
  {
    id: 'mux',
    label: 'Mux test (VOD)',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    mode: 'vod' as const,
  },
  {
    id: 'apple',
    label: 'Apple BipBop (VOD)',
    url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8',
    mode: 'vod' as const,
  },
  {
    id: 'local',
    label: 'Локальный live (относительный URL)',
    url: '/hls/live_2_36b63d22c5794873bcbfcc49cbb7fa30/master.m3u8',
    mode: 'live' as const,
  },
];
