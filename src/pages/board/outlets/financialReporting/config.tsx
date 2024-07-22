import { MdAddCircleOutline } from "react-icons/md";

import { IOptionButtons } from "@components/modals/Listmodal";

export const optionButtons: IOptionButtons = {
  label: "Adjuntar archivo",
  variant: "none",
  icon: <MdAddCircleOutline />,
  fullwidth: false,
  onClick: () => console.log("Adjuntar archivo"),
};
