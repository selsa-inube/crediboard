import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

interface IAppearance {
  appearance:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
}

interface IIconConfig extends IAppearance {
  icon: JSX.Element;
}

export const icons: IIconConfig[] = [
  {
    icon: <MdOutlineEdit />,
    appearance: "dark",
  },
  {
    icon: <MdDeleteOutline />,
    appearance: "danger",
  },
];
