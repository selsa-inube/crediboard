interface IUserMessage {
  visible: boolean;
  data?: IMessage;
}

interface IMessage {
  show?: boolean;
  title: string;
  description: string;
  icon: JSX.Element;
  appearance: "primary" | "danger" | "warning" | "success" | "help" | "light" | "gray" | "dark";
}

enum EMessageType {
  SUCCESS = "success",
  FAILED = "failed",
  DELETE = "delete",
  ACTIVATION = "activation",
  DEACTIVATION = "deactivation",
}

enum EAppearance {
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "Warning",
  DANGER = "danger",
  HELP = "help",
  DARK = "dark",
  GRAY = "gray",
  LIGHT = "light",
}

interface IMessageState {
  visible: boolean;
  data?: IMessage;
  type?: EMessageType;
}

export type { IUserMessage, IMessage, IMessageState };

export { EMessageType, EAppearance };
