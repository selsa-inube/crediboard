import { MdOutlineSentimentNeutral, MdThumbUpOffAlt } from "react-icons/md";

export const generalMessage = {
  success: {
    id: 1,
    icon: <MdThumbUpOffAlt size={18} />,
    title: "Cambios guardados con éxito!",
    description: "Hemos guardado los cambios correctamente",
    appearance: "success",
  },
  failed: {
    id: 2,
    icon: <MdOutlineSentimentNeutral size={18} />,
    title: "Algo salio mal!",
    description: "Tuvimos problemas para guardar cambios",
    appearance: "danger",
  },
};
