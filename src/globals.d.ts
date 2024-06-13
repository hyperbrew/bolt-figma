export type Message = {
  event: string;
  data?: any;
  callback?: string;
};

export interface PluginMessageEvent {
  pluginMessage: Message;
  pluginId?: string;
}

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.svg";
