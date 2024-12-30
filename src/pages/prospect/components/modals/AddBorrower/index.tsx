import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
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
import { Select } from "@inubekit/select";
import { Divider } from "@inubekit/divider";

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

    options: { id: string; label: string; value: string }[];
    portalId?: string;
    handleClose?: () => void;
    onSubmit?: () => void;
    title: string;
}

export const AddBorrower = (props: IAddBorrowedProps) => {
    const { title, handleClose, onSubmit, portalId, form, options } = props;
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [forms, setForm] = useState({ name: "" });

    const onChange = (name: string, newValue: string) => {
        setForm({ ...forms, [name]: newValue });
    };
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
                <Divider></Divider>
                <Grid
                    templateColumns="repeat(2,1fr)"
                    gap="20px"
                    height="auto"
                    width="auto"
                    autoRows="auto"
                >
                    <Select
                        id="id"
                        label="Label"
                        name="name"
                        options={options}
                        placeholder="Seleccione una opción"
                        size="wide"
                        value={forms.name}
                        onChange={onChange}
                    />
                    <Textfield
                        id="field2"
                        name="documentNumber"
                        label="Numeo de documento"
                        placeholder="Ej 1010477949"
                        fullwidth
                    />
                    <Textfield
                        id="field3"
                        value={form.names}
                        label="Nombre"
                        placeholder="Ej: Daniel Rodrigo"
                        fullwidth
                    />
                    <Textfield
                        id="field4"
                        value={form.lastNames}
                        label="apellidos"
                        placeholder="Ej: Rodriguez Velandia"
                        fullwidth
                    />
                    <Textfield
                        id="field5"
                        value={form.email}
                        label="correo"
                        placeholder="micorreo@mail.com"
                        fullwidth
                    />

                    <Textfield
                        id="field6"
                        value={form.phone}
                        label="Numer de telefono"
                        placeholder="3102330109"
                        fullwidth
                    />
                    <Textfield
                        id="field7"
                        value={form.biologicalSex}
                        label="Sexo"
                        placeholder="Seleccione una opción"
                        fullwidth
                    />
                    <Textfield
                        id="field8"
                        value={form.age}
                        label="edad"
                        placeholder="Seleccione una opción"
                        fullwidth
                    />
                    <Textfield
                        id="field9"
                        value={form.relationship}
                        label="relacion"
                        placeholder="Seleccione una opción"
                        fullwidth
                    />
                </Grid>
                <Stack justifyContent="flex-end" padding="30px 0px">
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
        </Blanket >,
        node
    );
};
