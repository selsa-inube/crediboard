import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdMenu, MdOutlineRemoveRedEye } from "react-icons/md";
import { Button, Icon, Stack, Text, inube, useMediaQuery } from "@inube/design-system";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { Listmodal } from "@components/modals/Listmodal";

import { configButtons, configDataAttachments } from "./config";
import {
  StyledHorizontalDivider,
  StyledItem,
  StyledContainerToCenter,
  StyledMenu,
  StyledMenuItem,
  StyledMenuHeader,
  StyledCloseIcon
} from "./styles";

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
}

interface IListdataProps {
  data: { id: string; name: string }[];
}

const Listdata = (props: IListdataProps) => {
  const { data } = props;

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
            icon={<MdOutlineRemoveRedEye />}
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
  const { children } = props;

  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [attachDocuments, setAttachDocuments] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  const navigation = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                  onClick={handleMenuToggle}
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
                  <Button
                    variant="outlined"
                    onClick={() => setAttachDocuments(true)}
                  >
                    {configButtons.buttonsOutlined.buttonTwo.label}
                  </Button>
                  {attachDocuments && (
                    <Listmodal
                      title="Ver Adjuntos"
                      content={<Listdata data={configDataAttachments} />}
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
      {isMobile && isMenuOpen && (
        <StyledMenu>
          <StyledMenuHeader>
            <Text>Menú</Text>
            <StyledCloseIcon onClick={handleMenuToggle}>
              &#x2716;
            </StyledCloseIcon>
          </StyledMenuHeader>
          <StyledMenuItem onClick={() => setShowRejectionModal(!showRejectionModal)}>
            Rechazar
          </StyledMenuItem>
          <StyledMenuItem onClick={() => setShowCancelModal(!showCancelModal)}>
            Anular
          </StyledMenuItem>
          <StyledMenuItem>
            Imprimir
          </StyledMenuItem>
          <StyledMenuItem>
            Adjuntar
          </StyledMenuItem>
          <StyledMenuItem onClick={() => setAttachDocuments(true)}>
            Ver Adjuntos
          </StyledMenuItem>
        </StyledMenu>
      )}
      {attachDocuments && (
        <Listmodal
          title="Ver Adjuntos"
          content={<Listdata data={configDataAttachments} />}
          handleClose={() => setAttachDocuments(false)}
        />
      )}
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
