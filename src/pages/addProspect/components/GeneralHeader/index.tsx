import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Button } from "@inubekit/button";
import { useState } from "react";
import { StyledContainerGeneralHeader, StyledPerfil } from "./styles";

export interface IGeneralHeaderProps {
    profileImageUrl: string;
    name: string;
    state?: string;
    iconstate?: React.JSX.Element;
    iconbutton?: React.JSX.Element;
    iconbonding?: React.JSX.Element;
    buttonText?: string;
    isMobile?: boolean;
    onClickIcon?: () => void;
    onClickButton?: () => void;
}

export function GeneralHeader(props: IGeneralHeaderProps) {
    const { profileImageUrl,
        name,
        state,
        iconstate,
        iconbutton,
        iconbonding,
        buttonText,
        onClickIcon,
        onClickButton
    } = props;
    const [showButton] = useState(false);
    return (
        <StyledContainerGeneralHeader>
            <Stack
                justifyContent="space-between"
                alignItems="center"
                padding="6px "
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
                                icon={iconstate}
                                appearance="danger"
                                spacing="narrow"
                            />
                            <Text type="label" size="small" appearance="danger">
                                {state}
                            </Text>

                        </Stack>
                    </Stack>
                    {showButton && (
                        <Icon
                            onClick={onClickIcon}
                            appearance="primary"
                            icon={iconbutton}
                            cursorHover
                            spacing="narrow"
                            variant="outlined"
                            shape="rectangle"
                            size="22px"
                        />
                    )}
                </Stack>
                {showButton && (
                    <Stack justifyContent="space-between" alignItems="end" padding="0px 6px">
                        <Button
                            children={buttonText}
                            onClick={onClickButton}
                            iconBefore={iconbonding}
                            variant="outlined"
                            appearance="primary"
                            spacing="compact"
                        />
                    </Stack>
                )}

            </Stack>
        </StyledContainerGeneralHeader >
    );
}
