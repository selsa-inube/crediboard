import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdMenu } from "react-icons/md";
import {
  Button,
  Icon,
  Stack,
  Text,
  inube,
  useMediaQuery,
} from "@inube/design-system";
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

  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  const handleToggleRejectModal = () => {
    setShowRejectionModal(!showRejectionModal);
  };

  const handleSubmitRejectModal = () => {
    setShowRejectionModal(!showRejectionModal);
  };

  const navigation = useNavigate();

  return (
    <>
      <Stack width="-webkit-fill-available" direction="column">
        <Stack direction="column">
          <Stack justifyContent="space-between" margin="s0 s0 s250">
            {!isMobile ? (
              <Button
                spacing="compact"
                variant="none"
                iconBefore={<MdArrowBack />}
                onClick={() => navigation(-1)}
              >
                Volver
              </Button>
            ) : (
              <Stack alignItems="center">
                <Icon
                  icon={<MdArrowBack />}
                  appearance="primary"
                  size="32px"
                  spacing="none"
                  onClick={() => navigation(-1)}
                />
                <Text>Volver</Text>
              </Stack>
            )}
            {isMobile && (
              <Icon
                icon={<MdMenu />}
                appearance="dark"
                size="32px"
                spacing="none"
              />
            )}
          </Stack>
          {!isMobile && (
            <Stack
              justifyContent="end"
              gap={inube.spacing.s200}
              margin={!isMobile ? "s0 s0 s200 s0" : "s0"}
            >
              <Stack gap={inube.spacing.s400}>
                <Button onClick={handleToggleRejectModal}>
                  {configButtons.buttons.buttonOne.label}
                </Button>
                <Button>{configButtons.buttons.buttonTwo.label}</Button>
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
          )}
        </Stack>
        <Stack direction="column">{children}</Stack>
      </Stack>
      {showRejectionModal && (
        <TextAreaModal
          title="Rechazar"
          buttonText="Confirmar"
          inputLabel="Motivo del rechazo."
          inputPlaceholder="Describa el motivo del rechazo."
          onCloseModal={handleToggleRejectModal}
          onSubmit={handleSubmitRejectModal}
        />
      )}
    </>
  );
};
