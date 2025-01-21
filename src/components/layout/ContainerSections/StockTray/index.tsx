import { MdOutlineChevronLeft, MdMenu } from "react-icons/md";

import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

import { StyledHorizontalDivider } from "./styled";
import { configButtons } from "../config";

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
  };
  menuIcon: () => void;
}

interface IStockTrayProps {
  isMobile?: boolean;
  actionButtons?: IActionButtons;
  navigation: () => void;
}

export const StockTray = (props: IStockTrayProps) => {
  const { isMobile, actionButtons, navigation } = props;

  return (
    <Stack
      justifyContent="space-between"
      alignItems="start"
      margin={isMobile ? "0px 0px 16px" : "0px 0px 16px"}
    >
      <Button
        spacing="compact"
        variant="outlined"
        iconBefore={<MdOutlineChevronLeft />}
        onClick={navigation}
      >
        Volver
      </Button>

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
        <Stack
          justifyContent="end"
          gap="16px"
          margin={!isMobile ? "0px 0px 16px 0px" : "0px"}
        >
          <Stack gap="16px">
            <Button
              spacing="compact"
              onClick={actionButtons?.buttons?.buttonReject?.OnClick}
            >
              {configButtons.buttons.buttonReject.label}
            </Button>

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
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
