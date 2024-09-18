import { MdOutlineChevronLeft , MdMenu } from "react-icons/md";
import { Button, Text, inube } from "@inube/design-system";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { configButtons } from "../config";
import { StyledHorizontalDivider } from "./styled";

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
    <Stack justifyContent="space-between" margin="16px 0px">
      {!isMobile ? (
        <Button
          spacing="compact"
          variant="outlined"
          iconBefore={<MdOutlineChevronLeft  />}
          onClick={navigation}
        >
          Volver
        </Button>
      ) : (
        <Stack alignItems="center">
          <Icon
            icon={<MdOutlineChevronLeft  />}
            appearance="primary"
            size="32px"
            spacing="none"
            onClick={navigation}
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
          onClick={actionButtons?.menuIcon}
        />
      )}
      {!isMobile && (
        <Stack
          justifyContent="end"
          gap={inube.spacing.s200}
          margin={!isMobile ? "s0 s0 s200 s0" : "s0"}
        >
          <Stack gap={inube.spacing.s200}>
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
          <Stack gap={inube.spacing.s200}>
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
