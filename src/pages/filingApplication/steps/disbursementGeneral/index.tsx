import { Tabs } from "@inubekit/tabs";
import { Stack } from "@inubekit/stack";
import { Fieldset } from "@components/data/Fieldset";

import { disbursementln } from "./disbursementWithInternalAccount/config";
import { DisbursementWithInternalAccount } from "./disbursementWithInternalAccount/index";
import { IDisbursementGeneral } from "../../types";

interface IDisbursementGeneralProps {
    isMobile: boolean;
    initialValues: IDisbursementGeneral;
    onFormValid: (isValid: boolean) => void;
    handleOnChange: (values: IDisbursementGeneral) => void;
    isSelected: string;
    handleTabChange: (id: string) => void;
}

export function DisbursementGeneral(props: IDisbursementGeneralProps) {
    const { isMobile, initialValues, onFormValid, handleOnChange, isSelected, handleTabChange } = props;

    return (
        <Fieldset>
            <Stack
                direction="column"
                padding={isMobile ? "4px 10px" : "10px 16px"}
                gap="20px"
            >
                <Stack direction="column">
                    <Tabs
                        tabs={Object.values(disbursementln)}
                        selectedTab={isSelected}
                        onChange={handleTabChange}
                    />
                    {isSelected === disbursementln.internal.id && (
                        <DisbursementWithInternalAccount isMobile={isMobile}
                            onFormValid={onFormValid}
                            initialValues={initialValues}
                            handleOnChange={handleOnChange} />
                    )}

                    {isSelected === disbursementln.external.id && (
                        null
                    )}
                    {isSelected === disbursementln.external.id && (
                        null
                    )}
                    {isSelected === disbursementln.management.id && (
                        null
                    )}
                    {isSelected === disbursementln.cash.id && (
                        null
                    )}
                </Stack>
            </Stack>
        </Fieldset>
    );
}
