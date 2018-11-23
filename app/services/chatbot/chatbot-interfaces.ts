import {
  MediaShareService,
  IMediaShareData,
  IMediaShareBan,
} from 'services/widgets/settings/media-share';

// state
export interface IChatbotApiServiceState {
  // v1
  apiToken: string;
  socketToken: string;
  globallyEnabled: boolean;
  defaultCommandsResponse: IDafaultCommandsResponse;
  customCommandsResponse: ICustomCommandsResponse;
  timersResponse: ITimersResponse;
  commandVariablesResponse: ICommandVariablesResponse;
  chatAlertsResponse: IChatAlertsResponse;
  capsProtectionResponse: ICapsProtectionResponse;
  symbolProtectionResponse: ISymbolProtectionResponse;
  linkProtectionResponse: ILinkProtectionResponse;
  wordProtectionResponse: IWordProtectionResponse;

  // v2
  quotesResponse: IQuotesResponse;
  quotePreferencesResponse: IQuotePreferencesResponse;
  queuePreferencesResponse: IQueuePreferencesResponse;
  queueStateResponse: IQueueStateResponse;
  queueEntriesResponse: IQueueEntriesResponse;
  queuePickedResponse: IQueuePickedResponse;
  songRequestPreferencesResponse: ISongRequestPreferencesResponse;
  songRequestResponse: ISongRequestResponse;
}

export interface IChatbotCommonServiceState {
  toasted: any;
  customCommandToUpdate: ICustomCommand;
  defaultCommandToUpdate: IDefaultCommand;
  timerToUpdate: IChatbotTimer;
  quoteToUpdate: IQuote;
  modBannerVisible: boolean;
}

// responses
export interface IChatbotAuthResponse {
  api_token: string;
}

export interface IChatbotSocketAuthResponse {
  socket_token: string;
}

export interface IChatbotErrorResponse {
  error?: 'Duplicate' | 'Bad Request';
}

export interface IChatbotStatusResponse {
  worker: IChatbotWorkerStatus;
  clients: IChatbotClientsStatus;
}

export interface IChatbotAPIPostResponse {
  success: boolean;
}

export interface IChatbotAPIPutResponse {
  success: boolean;
}

export interface IChatbotAPIDeleteResponse {
  success: boolean;
}

export interface IDafaultCommandsResponse {
  [id: string]: IDafaultCommandsSlug;
}

export interface ICustomCommandsResponse {
  pagination: IChatbotPagination;
  data: ICustomCommandsData;
}

export interface ICommandVariablesResponse {
  [id: number]: ICommandVariable;
}

export interface ITimersResponse {
  pagination: IChatbotPagination;
  data: ITimersData;
}

export interface IChatAlertsResponse {
  settings: IChatAlertsData;
  enabled: boolean;
}

export interface ICapsProtectionResponse {
  settings: ICapsProtectionData;
  enabled: boolean;
}

export interface ISymbolProtectionResponse {
  settings: ISymbolProtectionData;
  enabled: boolean;
}

export interface ILinkProtectionResponse {
  settings: ILinkProtectionData;
  enabled: boolean;
}

export interface IWordProtectionResponse {
  settings: IWordProtectionData;
  enabled: boolean;
}

export interface IQuotesResponse {
  pagination: IChatbotPagination;
  data: IQuotesData;
}

export interface IQuotePreferencesResponse {
  settings: IQuotePreferencesData;
  enabled: boolean;
}

export interface IQueuePreferencesResponse {
  settings: IQueuePreferencesData;
  enabled: boolean;
}

export interface IQueueStateResponse {
  status: 'Open' | 'Closed';
  title?: string;
}

export interface IQueueEntriesResponse {
  pagination: IChatbotPagination;
  data: IQueuedUser[];
}

export interface IQueuePickedResponse {
  pagination: IChatbotPagination;
  data: IQueuedUser[];
}

// this is from media share
export interface ISongRequestPreferencesResponse {
  banned_media: IMediaShareBan[];
  settings: {
    advanced_settings: {
      auto_play: boolean;
    };
  };
}

export interface ISongRequestResponse {
  enabled: boolean;
  settings: ISongRequestData;
}

// shared
export interface IChatbotPermission {
  level: number;
  info?: IChatbotPermissionInfo;
}

export interface IChatbotPermissionInfo {
  [id: string]: any;
}

export interface IChatbotCooldown {
  global: number;
  user: number;
}

export interface IChatbotAliases {
  [id: number]: string;
}

export interface IChatbotPagination {
  current: number;
  total: number;
}

export interface IChatbotPunishment {
  duration: number;
  type: string;
}

export interface IChatbotPermit {
  duration: number;
}

export interface IChatbotExcluded extends IChatbotPermission {}

// status
export interface IChatbotWorkerStatus {
  status: string;
  type: string;
}
export interface IChatbotClientsStatus {
  status: string;
  services: string[];
}

// default commands
export interface IDefaultCommand {
  command: string;
  description: string;
  aliases: IChatbotAliases;
  response_type?: string;
  success_response?: string;
  failed_response?: string;
  response?: string;
  static_permission?: IChatbotPermission;
  permission?: IChatbotPermission;
  enabled?: boolean;
  enabled_response?: string;
  disabled_response?: string;
  slugName?: string;
  commandName?: string;
  duration_response?: string;
  rating_response?: string;
  views_response?: string;
  banned_response?: string;
  music_response?: string;
  max_response?: string;
  full_response?: string;
}

export interface IDafaultCommandsSlug {
  [id: string]: IDefaultCommand;
}

// custom commands
export interface ICustomCommandsData {
  [id: number]: ICustomCommand;
}

export interface ICustomCommand {
  id?: string;
  user_id?: number;
  command: string;
  permission: IChatbotPermission;
  response: string;
  response_type?: string;
  cooldowns: IChatbotCooldown;
  aliases: IChatbotAliases;
  platforms: number;
  enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

// command variables
export interface ICommandVariable {
  variable: string;
  description: string;
  example: string;
  result: string;
  tags: string[];
}

// timers
export interface ITimersData {
  [id: number]: IChatbotTimer;
}

export interface IChatbotTimer {
  id?: string;
  user_id?: number;
  name: string;
  interval: number;
  chat_lines: number;
  message: string;
  platforms: number;
  enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

// modules
export interface IChatbotModule {
  title: string;
  description: string;
  backgroundUrl: string;
  enabled: boolean;
  onToggleEnabled: Function;
  onExpand: Function;
  comingSoon?: boolean;
}

// chat alerts
export interface IChatAlertsData {
  [id: string]: {
    [id: string]: IAlertType;
  };
}

export interface IAlertType {
  enabled: boolean;
  messages: IAlertMessage[];
}

export interface IAlertMessage {
  message: string;
  amount?: number;
  is_gifted?: boolean;
  tier?: string;
}

// protections
export interface IProtectionGeneral {
  punishment?: IChatbotPunishment;
  permit?: IChatbotPermit;
  excluded: IChatbotExcluded;
  message: string;
}

export interface IProtectionAdvanced {
  minimum?: number;
  maximum?: number;
  percent?: number;
}

export interface IProtectionList<type> {
  [id: number]: type;
}

// caps protection data
export interface ICapsProtectionData {
  general: IProtectionGeneral;
  advanced: IProtectionAdvanced;
}

// symbol protection data
export interface ISymbolProtectionData {
  general: IProtectionGeneral;
  advanced: IProtectionAdvanced;
}
// link protection data
export interface ILinkProtectionData {
  commands: ILinkProtectionCommands;
  general: IProtectionGeneral;
  whitelist: IProtectionList<string>;
  blacklist: IProtectionList<string>;
}

export interface ILinkProtectionCommands {
  [id: string]: ILinkProtectionCommand;
}

export interface ILinkProtectionCommand {
  command: string;
  description: string;
  response: string;
  response_type: string;
  aliases: IChatbotAliases;
}

// words protection data
export interface IWordProtectionData {
  general: IProtectionGeneral;
  blacklist: IProtectionList<IWordProtectionBlackListItem>;
}

export interface IWordProtectionBlackListItem {
  text: string;
  is_regex: boolean;
  punishment: IChatbotPunishment;
}

// quotes
export interface IQuotesData {
  [id: number]: IQuote;
}

export interface IQuote {
  id?: number;
  message: string;
  game: string;
  added_by: string;
  custom_id?: number;
  updated_at?: string;
  created_at?: string;
}

export interface IQuotePreferencesData {
  commands: IDafaultCommandsSlug;
  general: IQuotePreferencesGeneralSettings;
}

export interface IQuotePreferencesGeneralSettings {
  date_format: string;
}

// queue
export interface IQueuePreferencesData {
  commands: IDafaultCommandsSlug;
  general: IQueuePreferencesGeneralSettings;
}

export interface IQueuePreferencesGeneralSettings {
  maximum: number;
  messages: {
    picked: string;
  };
}

export interface IQueuedUser {
  id: number;
  user_id: number;
  viewer_id: string;
  name: string;
  platform: string;
  roles: number[];
  note: string;
  updated_at?: string;
  created_at?: string;
}

// song requests
export interface ISongRequestData {
  commands: IDafaultCommandsSlug;
  general: ISongRequestGeneral;
}

export interface ISongRequestGeneral {
  limit: number;
  max_duration: number;
  max_requests_per_user: number;
  skip_votes: number;
  filter_level: number;
  music_only: boolean;
}

// dictionaries
export enum ChatbotAutopermitEnums {
  'None' = 0,
  'Subscriber Only' = 1 << 1,
}

export enum ChatbotPermissionsEnums {
  'None' = 0,
  'Everyone' = 1,
  'Subscriber Only' = 1 << 1,
  'Moderator Only' = 1 << 5,
  'Streamer Only' = 1 << 7,
  'Subscribers & Moderators Only' = (1 << 1) | (1 << 5),
}

export enum ChatbotPunishments {
  Purge = 'Purge',
  Timeout = 'Timeout',
  Ban = 'Ban',
}

export enum ChatbotResponseTypes {
  Chat = 'Chat',
  Whisper = 'Whisper',
}

export type ChatbotAlertType =
  | 'tip'
  | 'follow'
  | 'host'
  | 'raid'
  | 'sub'
  | 'bits'
  | 'sub_mystery_gift';

export type ChatbotSocketRoom = 'queue' | 'giveaway';

export const ChatbotClients = ['Twitch', 'Mixer', 'Youtube'];

export type ChatbotSettingSlug =
  | 'chat-notifications'
  | 'caps-protection'
  | 'symbol-protection'
  | 'link-protection'
  | 'words-protection';

// modals (inside child window)
export const NEW_ALERT_MODAL_ID = 'new-alert';
export const NEW_LINK_PROTECTION_LIST_MODAL_ID = 'new-link-protection-list';
export const NEW_WORD_PROTECTION_LIST_MODAL_ID = 'new-word-protection-list';
