import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { Button, Stack, inube } from "@inube/design-system";
import { useState } from "react";

import { TextAreaModal } from "@components/modals/TextAreaModal";

import { configButtons } from "./config";
import { StyledHorizontalDivider } from "./styles";

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
}

export const ContainerSections = (props: IContainerSectionsProps) => {
  const { children } = props;
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const navigation = useNavigate();

  return (
    <>
      <Stack width="-webkit-fill-available" direction="column">
        <Stack direction="column">
          <Stack justifyContent="start" margin="s0 s0 s250">
            <Button
              spacing="compact"
              variant="none"
              iconBefore={<MdArrowBack />}
              onClick={() => navigation(-1)}
            >
              Volver
            </Button>
          </Stack>
          <Stack justifyContent="end" gap={inube.spacing.s200}>
            <Stack gap={inube.spacing.s400}>
              <Button onClick={() => setShowRejectionModal(!showRejectionModal)}>
                {configButtons.buttons.buttonOne.label}
              </Button>
              <Button onClick={() => setShowCancelModal(!showCancelModal)}>
                {configButtons.buttons.buttonTwo.label}
              </Button>
              <Button>{configButtons.buttons.buttonTree.label}</Button>
            </Stack>
            <StyledHorizontalDivider />
            <Stack gap={inube.spacing.s200}>
              <Button variant="outlined">
                {configButtons.buttonsOutlined.buttonOne.label}
              </Button>
              <Button variant="outlined">
                {configButtons.buttonsOutlined.buttonTwo.label}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="column">{children}</Stack>
      </Stack>
      {showRejectionModal && (
        <TextAreaModal
          title="Rechazar"
          buttonText="Confirmar"
          inputLabel="Motivo del rechazo."
          inputPlaceholder="Describa el motivo del rechazo."
          onCloseModal={() => setShowRejectionModal(!showRejectionModal)}
          onSubmit={() => setShowRejectionModal(!showRejectionModal)}
        />
      )}
      {showCancelModal && (
        <TextAreaModal
          title="Anular"
          buttonText="Confirmar"
          inputLabel="Motivo de la anulacion."
          inputPlaceholder="Describa el motivo de la anulacion."
          onCloseModal={() => setShowCancelModal(!showCancelModal)}
          onSubmit={() => setShowCancelModal(!showCancelModal)}
        />
      )}
    </>
  );
};
