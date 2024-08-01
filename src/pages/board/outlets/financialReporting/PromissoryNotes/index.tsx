import { Stack, useMediaQuery } from "@inube/design-system";
import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  actionMobile,
  actionsFinanacialReporting,
  entriesFinanacialReporting,
  titlesFinanacialReporting,
} from "./config";
import { infoItems } from "./config";
import { StyledContainer } from "./styles"

export const PromissoryNotes = () => {
  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <Stack direction="column">
      <StyledContainer>
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
      </StyledContainer>
    </Stack>
  );
};
