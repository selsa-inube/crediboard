interface IAction {
  icon: React.ReactNode;
  appearance: keyof typeof IAppearances;
  label: string;
  onClick?: () => void;
}

export const IAppearances = {
  primary:"primary",
  success:"success",
  warning:"warning",
  danger:"danger",
  help:"help",
  dark:"dark",
  gray:"gray",
  light:"light",
 } as const;

export type { IAction };
