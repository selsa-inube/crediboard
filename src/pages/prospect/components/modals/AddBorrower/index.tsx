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
import { useEffect, useRef, useState } from "react";
import { Select } from "@inubekit/select";
import { Divider } from "@inubekit/divider";
import { useFormik } from "formik";
import * as Yup from "yup";
export interface IAddBorrowedProps {
    initialValues: {
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
    optionsFamily: { id: string; label: string; value: string }[];
    optionsSex: { id: string; label: string; value: string }[];
    options: { id: string; label: string; value: string }[];
    portalId?: string;
    handleClose?: () => void;
    onSubmit?: () => void;
    onFormValid: (isValid: boolean) => void;
    title: string;
    handleOnChange: (values: {
        names: string;
        email: string;
        document: string;
        lastNames: string;
        phone: string;
        age: string;
    }) => void;
}

export const AddBorrower = (props: IAddBorrowedProps) => {
    const { title, handleClose, onSubmit, handleOnChange, onFormValid, portalId, initialValues, options, optionsSex, optionsFamily } = props;
    const [form, setForm] = useState({ name: "" });

    const onChange = (name: string, newValue: string) => {
        setForm({ ...form, [name]: newValue });
    };

    const validationSchema = Yup.object({

        document: Yup.string().required("Número de documento requerido"),
        names: Yup.string().required("Nombre requerido"),
        lastNames: Yup.string().required("Apellidos requeridos"),
        email: Yup.string().email("Correo no válido").required("Correo requerido"),
        phone: Yup.string().required("Número de teléfono requerido"),
        age: Yup.number()
            .min(0, "Debe ser mayor o igual a 0")
            .required("Edad requerida"),
    });


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: () => { },
    });

    const prevValues = useRef(formik.values);

    useEffect(() => {
        onFormValid(formik.isValid);
    }, [formik.isValid, onFormValid]);

    useEffect(() => {
        if (
            prevValues.current.document !== formik.values.document ||
            prevValues.current.names !== formik.values.names ||
            prevValues.current.lastNames !== formik.values.lastNames ||
            prevValues.current.email !== formik.values.email ||
            prevValues.current.phone !== formik.values.phone ||
            prevValues.current.age !== formik.values.age
        ) {
            handleOnChange(formik.values);
            prevValues.current = formik.values;
        }
    }, [formik.values, handleOnChange]);



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
                <Divider />
                <Grid
                    templateColumns="repeat(2,1fr)"
                    gap="20px"
                    height="auto"
                    width="auto"
                    autoRows="auto"
                >
                    <Select
                        id="id"
                        label="Tipo de documento"
                        name="name"
                        options={options}
                        placeholder="Seleccione una opción"
                        size="wide"
                        value={form.name}
                        onChange={onChange}
                    />
                    <Textfield
                        id="field2"
                        name="documentNumber"
                        label="Numeo de documento"
                        placeholder="Ej 1010477949"
                        fullwidth
                        onChange={handleClose}
                    />
                    <Textfield
                        id="field3"

                        label="Nombre"
                        placeholder="Ej: Daniel Rodrigo"
                        fullwidth
                    />
                    <Textfield
                        id="field4"

                        label="apellidos"
                        placeholder="Ej: Rodriguez Velandia"
                        fullwidth
                    />
                    <Textfield
                        id="field5"

                        label="correo"
                        placeholder="micorreo@mail.com"
                        fullwidth
                    />

                    <Textfield
                        id="field6"

                        label="Numer de telefono"
                        placeholder="3102330109"
                        fullwidth
                    />
                    <Select
                        id="id"
                        label="Sexo biológico"
                        name="name"
                        options={optionsSex}
                        placeholder="Seleccione una opción"
                        size="wide"
                        value={form.name}
                        onChange={onChange}
                    />
                    <Textfield
                        id="field8"

                        label="edad"
                        placeholder="Seleccione una opción"
                        fullwidth
                    />
                    <Select
                        id="id"
                        label="Parentesco"
                        name="name"
                        options={optionsFamily}
                        placeholder="Seleccione una opción"
                        size="wide"
                        value={form.name}
                        onChange={onChange}
                    />
                </Grid>
                <Stack justifyContent="flex-end" padding="30px 0px">
                    <Button
                        children="Cancelar"
                        appearance={"gray"}

                        onClick={handleClose}
                    />
                    <Button children="Siguiente"
                        appearance={"gray"}

                        onClick={onSubmit}
                    />
                </Stack>

            </StyledModal>
        </Blanket >,
        node
    );
};