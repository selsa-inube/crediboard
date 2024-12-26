import { createPortal } from "react-dom";
import { MdClear, MdOutlineEmail } from "react-icons/md";
import {
    Blanket,
    Button,
    Stack,
    Text,
    inube,
    useMediaQuery,
} from "@inube/design-system";
import { Icon } from "@inubekit/icon";

import {
    StyledContainerClose,
    StyledModal,
    StyledContainerTitle,
} from "./styles";
import { Textfield } from "@inubekit/textfield";
import { Grid } from "@inubekit/grid";


interface FormValues {
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
    field7: string;
    field8: string;
    field9: string;
}
export interface IOptionButtons {
    label: string;
    variant: "filled" | "outlined" | "none";
    icon?: React.ReactNode;
    fullwidth?: boolean;
    onClick?: () => void;
}

export interface IAddBorrowedProps {
    title: string;
    handleClose: () => void;
    onSubmit?: () => void;
    buttonLabel: string;
    portalId?: string;
    formValues: FormValues;
}

export const AddBorrower = (props: IAddBorrowedProps) => {
    const { title, handleClose, onSubmit, buttonLabel, portalId, formValues } = props;

    const node = document.getElementById(portalId ?? "portal");
    if (!node) {
        throw new Error(
            "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
        );
    }

    const isMobile = useMediaQuery("(max-width: 700px)");

    return createPortal(
        <Blanket>
            <StyledModal $smallScreen={isMobile}>
                <StyledContainerTitle>
                    <Text type="headline" size="small">
                        {title}
                    </Text>
                    <StyledContainerClose onClick={handleClose}>
                        <Stack alignItems="center" gap={inube.spacing.s100}>
                            <Text>Cerrar</Text>
                            <Icon
                                icon={<MdClear />}
                                size="24px"
                                cursorHover
                                appearance="dark"
                            />
                        </Stack>
                    </StyledContainerClose>
                </StyledContainerTitle>
                <Grid templateColumns="repeat(2, 1fr)">
                    <Stack>
                        <Textfield
                            id="field1"
                            value={formValues.field1}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                        <Textfield
                            id="field2"
                            value={formValues.field2}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                        <Textfield
                            id="field1"
                            value={formValues.field1}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                        <Textfield
                            id="field1"
                            value={formValues.field1}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                        <Textfield
                            id="field1"
                            value={formValues.field1}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                    </Stack>
                    <Stack>
                        <Textfield
                            id="field1"
                            value={formValues.field1}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                        <Textfield
                            id="field1"
                            value={formValues.field1}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                        <Textfield
                            id="field1"
                            value={formValues.field1}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                        <Textfield
                            id="field1"
                            value={formValues.field1}
                            label="Tipo de Documento"
                            iconBefore={
                                <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                            }
                            placeholder="Seleccione una opción"
                            disabled
                            fullwidth
                        />
                    </Stack>
                </Grid>
                <Stack justifyContent="flex-end" margin="s200 s0">
                    <Button onClick={onSubmit ?? handleClose}>{buttonLabel}</Button>
                </Stack>

            </StyledModal>
        </Blanket>,
        node
    );
};
