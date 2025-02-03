import { forwardRef } from "react";
import { MdClear, } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { currencyFormat } from "@utils/formatData/currency";
import { ModalConfig } from "./Config";
import { StyledContainerClose, StyledModal, StyledContainer, StyledInput } from "./styles";

interface ConsolidatedCreditsInterfaceProps {
    loading: boolean;
    error: boolean;
    handleClose: () => void;
    title: string;
    selectedText: string;
    expiredValue: number;
    investmentCode: number;
    collectedValue: number;
    nextExpiration: number;
    isMobile?: boolean;

}

export const ConsolidatedCreditsInterface = forwardRef<
    HTMLDivElement,
    ConsolidatedCreditsInterfaceProps
>((props, ref) => {
    const {
        loading,
        handleClose,
        title,
        collectedValue,
        isMobile,
        expiredValue,
        investmentCode,
    } = props;

    const paymentOptions = [
        {
            label: ModalConfig.investmentCode.label,
            value: investmentCode,
        },
        {
            label: ModalConfig.expiredValue.label,
            value: expiredValue,
        },
    ];

    return (
        <StyledModal ref={ref}>
            <Stack justifyContent="space-between">
                <Text type="headline" size="small" appearance="dark">
                    {title}
                </Text>
                <StyledContainerClose onClick={handleClose}>
                    <Stack alignItems="center" gap="5px">
                        <Text>{ModalConfig.closeButton.text}</Text>
                        <Icon
                            icon={<MdClear />}
                            size="24px"
                            cursorHover
                            appearance="dark"
                        />
                    </Stack>
                </StyledContainerClose>
            </Stack>

            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="column">
                    <Text
                        appearance="primary"
                        weight="bold"
                        type="headline"
                        size="large"
                    >
                        ${loading ? "Cargando..." : currencyFormat(collectedValue, false)}
                    </Text>
                    <Text type="body" appearance="gray" size="small" textAlign="center">
                        {ModalConfig.collectedValue}
                    </Text>

                </Stack>
                <Button
                    onClick={() => { }}
                    variant="outlined"
                    appearance="primary"
                    spacing="wide"
                >
                    {ModalConfig.buttons.edit}
                </Button>

            </Stack>

            <Divider dashed />
            <Text type="body" appearance="gray" size="small" weight="bold">
                {ModalConfig.selectedText.label}
            </Text>

            <StyledContainer $isMobile={isMobile}>
                <Stack
                    direction="column"
                    padding={isMobile ? "16px 10px" : "16px 20px"}
                    gap="16px"
                    width="256px"
                >
                    <Text type="label" size="large" weight="bold" appearance="dark">
                        {ModalConfig.creditInvestment.label}
                    </Text>
                    <Divider dashed />
                    <Stack direction="column" gap="8px">
                        {paymentOptions.map((option, index) => (
                            <StyledInput
                                key={index}
                            >
                                <Stack alignItems="center" justifyContent="space-between">
                                    <Stack>

                                        <Stack direction="column">
                                            <Text type="label" size="medium" weight="bold">
                                                {option.label}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                    <Text type="body" size="small" appearance="gray">
                                        {currencyFormat(option.value)}
                                    </Text>
                                </Stack>
                            </StyledInput>
                        ))}
                    </Stack>
                </Stack>
            </StyledContainer>

            <Divider />
            <Stack gap="20px" justifyContent="end">

                <Button
                    onClick={handleClose}
                    variant="outlined"
                    appearance="gray"
                >
                    {ModalConfig.buttons.close}
                </Button>
                <Button
                    onClick={() => { }}
                    variant="filled"
                    disabled
                    spacing="wide"
                    appearance="primary"
                >
                    {ModalConfig.buttons.keep}
                </Button>
            </Stack>
        </StyledModal>
    );
});
