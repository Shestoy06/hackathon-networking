import {ObjectId} from "@/utils/types/objectId.type.ts";

export enum TaskType {
  FRIENDS = 'friends',
  FRIENDS_COUNT = 'friends_count',
  YOUTUBE = 'youtube',
  TELEGRAM = 'telegram',
  TWITTER = 'twitter',
  PREMIUM = 'premium',
  TELEGRAM_WALLET = 'telegram_wallet',
  TELEGRAM_TRANSACTION = 'telegram_transaction',
  COLLAB_BOT = 'collab_bot',
  COLLAB_TELEGRAM = 'collab_telegram',
  COLLAB_YOUTUBE = 'collab_youtube',
  COLLAB_DOWNLOAD = 'collab_download',
}

export enum TaskStatus {
  INCOMPLETE = 'incomplete',
  CLAIMED = 'claimed',
}

export interface BaseTask {
  id: ObjectId;
  title: string;
  reward: number;
  type: TaskType;
  status: TaskStatus;
}

export interface FriendsTask extends BaseTask {
  type: TaskType.FRIENDS
  countToComplete: number;
}

export interface FriendsCountTask extends BaseTask {
  type: TaskType.FRIENDS_COUNT
  count: number;
  countToComplete: number;
  endDate: Date;
}

export interface YoutubeTask extends BaseTask {
  type: TaskType.YOUTUBE;
  link: string;
}

export interface TelegramTask extends BaseTask {
  type: TaskType.TELEGRAM;
  link: string;
}

export interface TwitterTask extends BaseTask {
  type: TaskType.TWITTER;
  link: string;
}

export interface PremiumTask extends BaseTask {
  type: TaskType.PREMIUM;
}

export interface TelegramWalletTask extends BaseTask {
  type: TaskType.TELEGRAM_WALLET;
}

export interface TelegramTransactionTask extends BaseTask {
  type: TaskType.TELEGRAM_TRANSACTION;
}

export interface CollabTask extends BaseTask {
  link: string;
  iconUrl: string;
  description: string;
  collabId: string;
  count: number;
  countToComplete: number;
}

export interface CollabBotTask extends CollabTask {
  type: TaskType.COLLAB_BOT;
}

export interface CollabTelegramTask extends CollabTask {
  type: TaskType.COLLAB_TELEGRAM;
}

export interface CollabYoutubeTask extends CollabTask {
  type: TaskType.COLLAB_YOUTUBE;
}

export interface CollabDownloadTask extends CollabTask {
  type: TaskType.COLLAB_DOWNLOAD;
}

type Task =
  FriendsTask |
  FriendsCountTask |
  YoutubeTask |
  TelegramTask |
  TwitterTask |
  PremiumTask |
  TelegramWalletTask |
  TelegramTransactionTask |
  CollabBotTask |
  CollabTelegramTask |
  CollabYoutubeTask |
  CollabDownloadTask;

export default Task;