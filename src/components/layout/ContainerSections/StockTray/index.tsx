import { useState } from "react";
import { MdOutlineChevronLeft, MdMenu, MdOutlineInfo } from "react-icons/md";
import { Stack, Icon, Button, Text } from "@inubekit/inubekit";
import { BaseModal } from "@components/modals/baseModal";

import { StyledHorizontalDivider, StyledPrint } from "./styled";
import { configButtons, titlesModal } from "../config";

interface IActionButtons {
  buttons: {
    buttonReject: {
      OnClick: () => void;
    };
    buttonCancel: {
      OnClick: () => void;
    };
    buttonPrint: {
      OnClick: () => void;
    };
  };
  buttonsOutlined: {
    buttonAttach: {
      OnClick: () => void;
    };
    buttonViewAttachments: {
      OnClick: () => void;
    };
    buttonWarranty: {
      OnClick: () => void;
    };
  };
  menuIcon: () => void;
}

interface IStockTrayProps {
  navigation: () => void;
  isMobile?: boolean;
  actionButtons?: IActionButtons;
  hasPermitRejection?: boolean;
}

export const StockTray = (props: IStockTrayProps) => {
  const { navigation, isMobile, actionButtons, hasPermitRejection } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfo = () => {
    setIsModalOpen(true);
  };

  return (
    <Stack
      justifyContent="space-between"
      alignItems="start"
      margin={isMobile ? "0px 0px 16px" : "0px 0px 16px"}
    >
      <StyledPrint>
        <Button
          spacing="compact"
          variant="outlined"
          iconBefore={<MdOutlineChevronLeft />}
          onClick={navigation}
        >
          Volver
        </Button>
      </StyledPrint>
      {isMobile && (
        <Icon
          icon={<MdMenu />}
          appearance="dark"
          size="32px"
          spacing="narrow"
          onClick={actionButtons?.menuIcon}
        />
      )}

      {!isMobile && (
        <StyledPrint>
          <Stack
            justifyContent="end"
            gap="16px"
            margin={!isMobile ? "0px 0px 16px 0px" : "0px"}
          >
            <Stack gap="16px">
              <Stack gap="2px" alignItems="center">
                <Button
                  spacing="compact"
                  disabled={hasPermitRejection ? false : true}
                  onClick={actionButtons?.buttons?.buttonReject?.OnClick}
                >
                  {configButtons.buttons.buttonReject.label}
                </Button>
                {!hasPermitRejection && (
                  <Icon
                    icon={<MdOutlineInfo />}
                    appearance="primary"
                    size="16px"
                    cursorHover
                    onClick={handleInfo}
                  />
                )}
              </Stack>
              <Button
                spacing="compact"
                onClick={actionButtons?.buttons?.buttonCancel.OnClick}
              >
                {configButtons.buttons.buttonCancel.label}
              </Button>
              <Button
                spacing="compact"
                onClick={actionButtons?.buttons.buttonPrint.OnClick}
              >
                {configButtons.buttons.buttonPrint.label}
              </Button>
            </Stack>
            <StyledHorizontalDivider />
            <Stack gap="16px">
              <Button
                spacing="compact"
                variant="outlined"
                onClick={actionButtons?.buttonsOutlined?.buttonAttach.OnClick}
              >
                {configButtons.buttonsOutlined.buttonAttach.label}
              </Button>

              <Button
                spacing="compact"
                variant="outlined"
                onClick={
                  actionButtons?.buttonsOutlined.buttonViewAttachments.OnClick
                }
              >
                {configButtons.buttonsOutlined.buttonViewAttachments.label}
              </Button>
              <StyledHorizontalDivider />
              <Button
                spacing="compact"
                variant="outlined"
                onClick={actionButtons?.buttonsOutlined.buttonWarranty.OnClick}
              >
                {configButtons.buttonsOutlined.buttonWarranty.label}
              </Button>
            </Stack>
          </Stack>
        </StyledPrint>
      )}
      {isModalOpen && (
        <>
          <BaseModal
            title={titlesModal.title}
            nextButton={titlesModal.textButtonNext}
            handleNext={() => setIsModalOpen(false)}
            handleClose={() => setIsModalOpen(false)}
            width={isMobile ? "290px" : "400px"}
          >
            <Stack gap="16px" direction="column">
              <Text weight="bold" size="large">
                {titlesModal.subTitle}
              </Text>
              <Text weight="normal" size="medium" appearance="gray">
                {titlesModal.description}
              </Text>
            </Stack>
          </BaseModal>
        </>
      )}
    </Stack>
  );
};
