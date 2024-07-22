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

import MenuComponent from '@components/modals/MenuComponent/MenuComponent';

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
  isMobile?: boolean;
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
    <ul style={{ paddingInlineStart: "2px", marginBlock: "8px" }}>
      {data.map((element) => (
        <StyledItem key={element.id}>
          <Text>{element.name}</Text>
          <Icon icon={icon} appearance="dark" spacing="none" size="24px" cursorHover />
        </StyledItem>
      ))}
    </ul>
  );
};

export const ContainerSections: React.FC<IContainerSectionsProps> = ({ children, isMobile }) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [attachDocuments, setAttachDocuments] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                  <Button onClick={() => setShowRejectionModal(true)}>
                    {configButtons.buttons.buttonOne.label}
                  </Button>

                  <Button onClick={() => setShowCancelModal(true)}>
                    {configButtons.buttons.buttonTwo.label}
                  </Button>
                  <Button>{configButtons.buttons.buttonTree.label}</Button>
                </Stack>
                <StyledHorizontalDivider />
                <Stack gap={inube.spacing.s200}>
                  <Button variant="outlined" onClick={() => setAttachDocuments(true)}>
                    {configButtons.buttonsOutlined.buttonOne.label}
                  </Button>
                  <Button variant="outlined" onClick={() => setShowAttachments(true)}>
                    {configButtons.buttonsOutlined.buttonTwo.label}
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
          <Stack direction="column">{children}</Stack>
        </Stack>
      </StyledContainerToCenter>
      {isMobile && isMenuOpen && (
        <MenuComponent
          onClose={handleMenuToggle}
          onReject={() => setShowRejectionModal(true)}
          onCancel={() => setShowCancelModal(true)}
          onAttach={() => setAttachDocuments(true)}
          onViewAttachments={() => setShowAttachments(true)}
        />
      )}
      {showAttachments && (
        <Listmodal
          title="Ver Adjuntos"
          content={<Listdata data={configDataAttachments} icon={<MdOutlineRemoveRedEye />} />}
          handleClose={() => setShowAttachments(false)}
        />
      )}
      {attachDocuments && (
        <Listmodal
          title="Adjuntar"
          content={<Listdata data={configDataAttachments} icon={<MdDeleteOutline />} />}
          handleClose={() => setAttachDocuments(false)}
          optionButtons={optionButtons}
        />
      )}
      {showRejectionModal && (
        <TextAreaModal
          title="Rechazar"
          buttonText="Confirmar"
          inputLabel="Motivo del rechazo."
          inputPlaceholder="Describa el motivo del rechazo."
          onCloseModal={() => setShowRejectionModal(false)}
          onSubmit={() => setShowRejectionModal(false)}
        />
      )}
      {showCancelModal && (
        <TextAreaModal
          title="Anular"
          buttonText="Confirmar"
          inputLabel="Motivo de la anulación."
          inputPlaceholder="Describa el motivo de la anulación."
          onCloseModal={() => setShowCancelModal(false)}
          onSubmit={() => setShowCancelModal(false)}
        />
      )}
    </>
  );
};
