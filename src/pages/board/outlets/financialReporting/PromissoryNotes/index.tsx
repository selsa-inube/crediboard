import { Stack, useMediaQuery } from "@inube/design-system";
import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  actionMobile,
  actionsFinanacialReporting,
  entriesFinanacialReporting,
  titlesFinanacialReporting,
} from "./config";
import { MdClose, MdOutlineSend, MdOutlineRemoveRedEye, MdRemove, MdCheck } from "react-icons/md";

export const PromissoryNotes = () => {
  const isMobile = useMediaQuery("(max-width: 720px)");

  const infoItems = [
    { icon: <MdCheck />, text: "Cumple", appearance: "success", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdClose />, text: "No Cumple", appearance: "danger", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdRemove />, text: "Sin Evaluar", appearance: "warning", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdOutlineSend />, text: "Reenviar", appearance: "primary", size: "24px" },
    { icon: <MdOutlineRemoveRedEye />, text: "Ver Imagen", appearance: "primary", size: "24px" },
  ];

  return (
    <Stack direction="column">
      <Fieldset title="Pagarés y Libranzas" heightFieldset="163px" hasTable>
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={entriesFinanacialReporting}
          actions={actionsFinanacialReporting}
          actionMobile={actionMobile}
          appearanceTable={{
            widthTd: !isMobile ? "100" : "20%",
            efectzebra: true,
            title: "primary",
            isStyleMobile: true,
          }}
          isFirstTable={true}
          infoItems={infoItems} 
        />
      </Fieldset>
    </Stack>
  );
};
