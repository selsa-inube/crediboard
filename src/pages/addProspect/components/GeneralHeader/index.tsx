import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Button } from "@inubekit/button";

import { StyledContainerGeneralHeader, StyledPerfil } from "./styles";

export interface IGeneralHeaderProps {
    name: string;
    state?: string;
    iconstate?: React.JSX.Element;
    iconbutton?: React.JSX.Element;
    iconconfig?: React.JSX.Element;
    imgPerfil: string;
    buttonText?: string;
    isMobile?: boolean;
}

export function GeneralHeader(props: IGeneralHeaderProps) {
    const { imgPerfil = "", name = "", state = "", iconstate, iconbutton, iconconfig, buttonText, } = props;

    return (
        <StyledContainerGeneralHeader>
            <Stack
                justifyContent="space-between"
                alignItems="center"
                padding="12px"
            >
                <Stack gap="12px">
                    <StyledPerfil src={imgPerfil} alt="imagen perfil" />
                    <Stack direction="column" >
                        <Text type="label"
                            size="medium"
                            appearance="dark"
                            weight="bold"
                        >
                            {name}
                        </Text>
                        <Icon
                            size="12px"
                            icon={iconstate}
                            appearance="danger"
                            spacing="narrow"
                        />
                    </Stack>
                    <Text type="body" size="small" appearance="danger"
                    >
                        {state}
                    </Text>

                    <Stack alignItems="center">
                        <Icon
                            appearance="primary"
                            icon={iconbutton}
                            cursorHover={true}
                            spacing="narrow"
                            variant="outlined"
                            shape="rectangle"
                            size="22px"
                        />
                    </Stack>
                </Stack>
                <Stack justifyContent="space-between" alignItems="end">
                    <Button
                        children={buttonText}
                        iconBefore={iconconfig}
                        variant="outlined"
                        appearance="primary"
                        spacing="compact"
                    />
                    <Text type="title" size="medium" weight="bold" appearance="gray">

                    </Text>
                </Stack>
            </Stack>
        </StyledContainerGeneralHeader >
    );
}
