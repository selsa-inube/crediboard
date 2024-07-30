import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdMenu } from "react-icons/md";
import { Button, Text, inube } from "@inube/design-system";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

import { configButtons } from "./config";
import { StyledContainerToCenter, StyledHorizontalDivider } from "./styles";

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
}

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
  isMobile?: boolean;
  actionButtons?: IActionButtons;
}

export const ContainerSections = (props: IContainerSectionsProps) => {
  const { children, isMobile, actionButtons } = props;

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
                    onClick={actionButtons?.buttons?.buttonReject?.OnClick}
                  >
                    {configButtons.buttons.buttonReject.label}
                  </Button>

                  <Button
                    onClick={actionButtons?.buttons?.buttonCancel.OnClick}
                  >
                    {configButtons.buttons.buttonCancel.label}
                  </Button>
                  <Button onClick={actionButtons?.buttons.buttonPrint.OnClick}>
                    {configButtons.buttons.buttonPrint.label}
                  </Button>
                </Stack>
                <StyledHorizontalDivider />
                <Stack gap={inube.spacing.s200}>
                  <Button
                    variant="outlined"
                    onClick={
                      actionButtons?.buttonsOutlined?.buttonAttach.OnClick
                    }
                  >
                    {configButtons.buttonsOutlined.buttonAttach.label}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={
                      actionButtons?.buttonsOutlined.buttonViewAttachments
                        .OnClick
                    }
                  >
                    {configButtons.buttonsOutlined.buttonViewAttachments.label}
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
          <Stack direction="column">{children}</Stack>
        </Stack>
      </StyledContainerToCenter>
    </>
  );
};
