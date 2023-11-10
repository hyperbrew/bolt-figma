interface Message {
  func: string;
  data?: any;
  callback?: string;
}

interface PluginMessageEvent {
  data: {
    pluginMessage: Message;
  };
}
