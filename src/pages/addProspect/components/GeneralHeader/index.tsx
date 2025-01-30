import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Button } from "@inubekit/button";
// import { useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";
// import { appearanceConfig } from "./config";
import { StyledContainerGeneralHeader, StyledPerfil } from "./styles";

export interface IGeneralHeaderProps {
    profileImageUrl: string;
    name: string;
    descriptionStatus?: string;
    iconState?: React.JSX.Element;
    iconSettings?: React.JSX.Element;
    iconButton?: React.JSX.Element;
    buttonText?: string;
    isMobile?: boolean;
    showButton?: boolean;
    onClickIcon?: () => void;
    onClickButton?: () => void;
}

export function GeneralHeader(props: IGeneralHeaderProps) {
    const isMobile = useMediaQuery("(max-width: 460px)");
    const {
        profileImageUrl,
        name,
        descriptionStatus,
        iconState,
        iconSettings,
        iconButton,
        buttonText,
        showButton,
        onClickIcon,
        onClickButton,
    } = props;
    return (
        <StyledContainerGeneralHeader>
            <Stack
                justifyContent="space-between"
                alignItems={isMobile ? "flex-start" : "center"}
                padding="6px "
                direction={!isMobile ? "row" : "column"}
            >
                <Stack gap="12px" alignItems="center">
                    <StyledPerfil src={profileImageUrl} alt="imagen perfil" />
                    <Stack direction="column" justifyContent="space-around">
                        <Text type="label"
                            size="medium"
                            appearance="dark"
                            weight="bold"
                        >
                            {name}
                        </Text>
                        <Stack direction="row" alignItems="center" gap="6px">

                            <Icon
                                size="12px"
                                icon={iconState}
                                appearance="danger"
                                spacing="narrow"
                            />
                            <Text type="label" size="small" appearance="danger" weight="normal">
                                {descriptionStatus}
                            </Text>

                        </Stack>
                    </Stack>
                    {showButton && (
                        <Icon
                            onClick={onClickIcon}
                            appearance="primary"
                            icon={iconSettings}
                            cursorHover
                            spacing="narrow"
                            variant="outlined"
                            shape="rectangle"
                            size="22px"

                        />
                    )}
                </Stack>
                {showButton && (
                    <Stack justifyContent="space-between" alignItems="end" padding={isMobile ? "6px 0 0 0" : "0 6px"} width={isMobile ? "100%" : "auto"}>
                        <Button
                            children={buttonText}
                            onClick={onClickButton}
                            iconBefore={iconButton}
                            variant="outlined"
                            appearance="primary"
                            spacing="compact"
                            fullwidth={isMobile}
                        />
                    </Stack>
                )}

            </Stack>
        </StyledContainerGeneralHeader >
    );
}
