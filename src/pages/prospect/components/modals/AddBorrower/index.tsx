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
import { useEffect, useState } from "react";



export interface IOptionButtons {
    label: string;
    variant: "filled" | "outlined" | "none";
    icon?: React.ReactNode;
    fullwidth?: boolean;
    onClick?: () => void;
}
export interface IAddBorrowedProps {
    form: {
        tipeOfDocument: string;
        names: string;
        email: string;
        biologicalSex: string;
        relationship: string;
        document: string;
        lastNames: string;
        phone: string;
        age: string;
    };
    onChange: (name: string, newValue: string) => void;
    options: { id: string; label: string; value: string }[];
    portalId?: string;
    handleClose?: () => void;
    onSubmit?: () => void;
    title: string;
}

export const AddBorrower = (props: IAddBorrowedProps) => {
    const { title, handleClose, onSubmit, portalId, form } = props;

    const [isFormComplete, setIsFormComplete] = useState(false);
    useEffect(() => {
        const allFieldsFilled = [
            form.tipeOfDocument,
            form.names,
            form.email,
            form.biologicalSex,
            form.relationship,
            form.document,
            form.lastNames,
            form.phone,
            form.age,
        ].every((field) => field !== undefined && field !== "");

        setIsFormComplete(allFieldsFilled);
    }, [form]);



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
                <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap="28px"
                    templateRows="auto"
                    justifyItems="start"
                    alignItems="start"
                    justifyContent="flex-start"
                    alignContent="flex-start"
                    margin="0px"
                    padding="0px"
                    height="auto"
                    width="auto"
                >

                    <Textfield
                        id="field1"
                        value={form.tipeOfDocument}
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
                        value={form.names}
                        label="nombre"
                        iconBefore={
                            <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                        }
                        placeholder="Seleccione una opción"
                        disabled
                        fullwidth
                    />
                    <Textfield
                        id="field1"
                        value={form.email}
                        label="correo"
                        iconBefore={
                            <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                        }
                        placeholder="Seleccione una opción"
                        disabled
                        fullwidth
                    />
                    <Textfield
                        id="field1"
                        value={form.biologicalSex}
                        label="sexo"
                        iconBefore={
                            <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                        }
                        placeholder="Seleccione una opción"
                        disabled
                        fullwidth
                    />
                    <Textfield
                        id="field1"
                        value={form.relationship}
                        label="parentesco"
                        iconBefore={
                            <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                        }
                        placeholder="Seleccione una opción"
                        disabled
                        fullwidth
                    />
                    <Textfield
                        id="field1"
                        value={form.document}
                        label="numero de documento"
                        iconBefore={
                            <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                        }
                        placeholder="Seleccione una opción"
                        disabled
                        fullwidth
                    />
                    <Textfield
                        id="field1"
                        value={form.lastNames}
                        label="apellidos"
                        iconBefore={
                            <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                        }
                        placeholder="Seleccione una opción"
                        disabled
                        fullwidth
                    />
                    <Textfield
                        id="field1"
                        value={form.phone}
                        label="celular"
                        iconBefore={
                            <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                        }
                        placeholder="Seleccione una opción"
                        disabled
                        fullwidth
                    />
                    <Textfield
                        id="field1"
                        value={form.age}
                        label="edad"
                        iconBefore={
                            <MdOutlineEmail color={inube.color.stroke.dark.regular} />
                        }
                        placeholder="Seleccione una opción"
                        disabled
                        fullwidth
                    />
                </Grid>
                <Stack justifyContent="flex-end" margin="s200 s0" gap="20px">
                    <Button
                        children="Cancelar"
                        appearance={isFormComplete ? "primary" : "gray"}
                        disabled={!isFormComplete}
                        onClick={handleClose}
                    />
                    <Button children="Siguiente"
                        appearance={isFormComplete ? "primary" : "gray"}
                        disabled={!isFormComplete}
                        onClick={onSubmit}
                    />
                </Stack>

            </StyledModal>
        </Blanket>,
        node
    );
};
