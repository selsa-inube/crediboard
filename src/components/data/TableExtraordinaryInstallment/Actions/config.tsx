import {
    MdDeleteOutline,
    MdOutlineEdit,
    MdOutlineRemoveRedEye,
} from "react-icons/md";
import { IAction } from "./type";

export const Actions = (onClickDetails:() => void, onClickEdit:() => void , onClickEliminate: () => void): IAction[] => {
  return [
    {
      icon: <MdOutlineRemoveRedEye />,
      appearance: "dark",
      label: "Ver detalles",
      onClick: onClickDetails,
    },
    {
      icon: <MdOutlineEdit />,
      appearance: "primary",
      label: "Editar",
      onClick: onClickEdit,
    },
    {
      icon: <MdDeleteOutline />,
      appearance: "danger",
      label: "Eliminar",
      onClick: onClickEliminate,
    },
  ];
}