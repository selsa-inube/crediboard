import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdAddCircleOutline,
  MdArrowBack,
  MdDeleteOutline,
  MdMenu,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { Button, Icon, Stack, Text, inube } from "@inube/design-system";

import { IOptionButtons, Listmodal } from "@components/modals/Listmodal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { configButtons, configDataAttachments } from "./config";
import {
  StyledContainerToCenter,
  StyledHorizontalDivider,
  StyledItem,
} from "./styles";

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
  isMobile?: boolean;
  onOpenCancelModal?: () => void;
}

interface IListdataProps {
  data: { id: string; name: string }[];
  icon?: React.ReactNode;
}

const optionButtons: IOptionButtons = {
  label: "Adjuntar archivo",
  variant: "none",
  icon: <MdAddCircleOutline />,
  fullwidth: false,
  onClick: () => console.log("Adjuntar archivo"),
};

const Listdata = (props: IListdataProps) => {
  const { data, icon } = props;

  return (
    <ul
      style={{
        paddingInlineStart: "2px",
        marginBlock: "8px",
      }}
    >
      {data.map((element) => (
        <StyledItem key={element.id}>
          <Text>{element.name}</Text>
          <Icon
            icon={icon}
            appearance="dark"
            spacing="none"
            size="24px"
            cursorHover
          />
        </StyledItem>
      ))}
    </ul>
  );
};

export const ContainerSections = (props: IContainerSectionsProps) => {
  const { children, isMobile, onOpenCancelModal } = props; 

  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [attachDocuments, setAttachDocuments] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  const navigation = useNavigate();

  return (
    <>
      <StyledContainerToCenter>
        <Stack
          width={isMobile ? "-webkit-fill-available" : "min(100%,1440px)"}
          direction="column"
        >
          <Stack direction="column">
            <Stack justifyContent="space-between" margin="s0">
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
                  <Button
                    onClick={() => setShowRejectionModal(!showRejectionModal)}
                  >
                    {configButtons.buttons.buttonOne.label}
                  </Button>

                  <Button onClick={onOpenCancelModal}>
                    {configButtons.buttons.buttonTwo.label}
                  </Button>
                  <Button>{configButtons.buttons.buttonTree.label}</Button>
                </Stack>
                <StyledHorizontalDivider />
                <Stack gap={inube.spacing.s200}>
                  <Button
                    variant="outlined"
                    onClick={() => setShowAttachments(true)}
                  >
                    {configButtons.buttonsOutlined.buttonOne.label}
                  </Button>
                  {showAttachments && (
                    <Listmodal
                      title="Adjuntar"
                      content={
                        <Listdata
                          data={configDataAttachments}
                          icon={<MdDeleteOutline />}
                        />
                      }
                      handleClose={() => setShowAttachments(false)}
                      optionButtons={optionButtons}
                    />
                  )}
                  <Button
                    variant="outlined"
                    onClick={() => setAttachDocuments(true)}
                  >
                    {configButtons.buttonsOutlined.buttonTwo.label}
                  </Button>
                  {attachDocuments && (
                    <Listmodal
                      title="Ver Adjuntos"
                      content={
                        <Listdata
                          data={configDataAttachments}
                          icon={<MdOutlineRemoveRedEye />}
                        />
                      }
                      handleClose={() => setAttachDocuments(false)}
                    />
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
          <Stack direction="column">{children}</Stack>
        </Stack>
      </StyledContainerToCenter>
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
    </>
  );
};
