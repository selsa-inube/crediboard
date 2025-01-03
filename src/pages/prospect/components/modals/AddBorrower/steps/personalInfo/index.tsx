import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import {
  Blanket,
  Button,
  Stack,
  Text,
  useMediaQuery,
} from "@inube/design-system";
import { Icon } from "@inubekit/icon";
import { Select } from "@inubekit/select";
import { Divider } from "@inubekit/divider";
import { Textfield } from "@inubekit/textfield";
import { Grid } from "@inubekit/grid";

import {
  StyledContainerClose,
  StyledModal,
  StyledContainerTitle,
} from "./styles";

import { IAddBorrowedProps, FormState } from "./type";

export const AddBorrower = (props: IAddBorrowedProps) => {
  const {
    title,
    handleClose,
    onSubmit,
    onConfirm,
    portalId = "portal",
    initialValues,
    optionsDocument,
    optionsSex,
    optionsFamily,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const [form, setForm] = useState<FormState>({
    tipeOfDocument: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sex: "",
    age: "",
    relation: "",
  });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  const handleNumberChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const isMobile = useMediaQuery("(max-width: 700px)");

  const validationSchema = Yup.object({
    TipeOfDocument: Yup.string().required("Campo requerido"),
    documentNumber: Yup.number().required("Número de documento requerido"),
    firstName: Yup.string().required("Nombre requerido"),
    lastName: Yup.string().required("Apellidos requeridos"),
    email: Yup.string().email("Correo no válido").required("Correo requerido"),
    phone: Yup.number().required("Número de teléfono requerido"),
    sex: Yup.string().required("Campo requerido"),
    age: Yup.number()
      .min(0, "Debe ser mayor o igual a 0")
      .required("Edad requerida"),
    relation: Yup.string().required("Campo requerido"),
  });

  return createPortal(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => onConfirm()}
    >
      {(formik) => (
        <Blanket>
          <StyledModal $smallScreen={isMobile}>
            <StyledContainerTitle>
              <Text type="headline" size="small">
                {title}
              </Text>
              <StyledContainerClose onClick={handleClose}>
                <Stack alignItems="center" gap="10px">
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
                id="tipeOfDocument"
                label="Tipo de documento"
                name="tipeOfDocument"
                onChange={onChange}
                onBlur={formik.handleBlur}
                options={optionsDocument}
                placeholder="Seleccione una opción"
                size="wide"
                value={form["tipeOfDocument"]}
                fullwidth
              />
              <Textfield
                id="documentNumber"
                label="Numeo de documento"
                placeholder="Ej 1010477949"
                fullwidth
                type="tel"
                onChange={(e) =>
                  handleNumberChange("documentNumber", e.target.value)
                }
                value={form.documentNumber}
                size="wide"
              />
              <Textfield
                id="firstName"
                label="Nombre"
                placeholder="Ej: Daniel Rodrigo"
                fullwidth
                type="text"
                onChange={(e) =>
                  handleNumberChange("firstName", e.target.value)
                }
                value={form.firstName}
                size="wide"
              />
              <Textfield
                id="lastName"
                label="apellidos"
                placeholder="Ej: Rodriguez Velandia"
                fullwidth
                onChange={(e) => handleNumberChange("lastName", e.target.value)}
                type="text"
                value={form.lastName}
                size="wide"
              />
              <Textfield
                id="email"
                label="correo"
                placeholder="micorreo@mail.com"
                fullwidth
                type="email"
                onChange={(e) => handleNumberChange("email", e.target.value)}
                value={form.email}
                size="wide"
              />

              <Textfield
                id="phone"
                label="Numer de telefono"
                placeholder="3102330109"
                fullwidth
                type="tel"
                onChange={(e) => handleNumberChange("phone", e.target.value)}
                value={form.phone}
                size="wide"
              />
              <Select
                id="sex"
                label="Sexo biológico"
                name="sex"
                options={optionsSex}
                placeholder="Seleccione una opción"
                size="wide"
                value={form["sex"]}
                onChange={onChange}
                onBlur={formik.handleBlur}
              />
              <Textfield
                id="age"
                label="edad"
                placeholder="Seleccione una opción"
                fullwidth
                type="number"
                onChange={(e) => handleNumberChange("age", e.target.value)}
                value={form.age}
                size="wide"
              />
              <Select
                id="relation"
                label="Parentesco"
                name="relation"
                options={optionsFamily}
                placeholder="Seleccione una opción"
                size="wide"
                value={form["relation"]}
                onChange={onChange}
              />
            </Grid>
            <Stack justifyContent="flex-end" padding="30px 0px">
              <Button
                children="Cancelar"
                appearance={"gray"}
                onClick={handleClose}
              />
              <Button
                children="Siguiente"
                appearance={"gray"}
                onClick={onSubmit}
              />
            </Stack>
          </StyledModal>
        </Blanket>
      )}
    </Formik>,
    node
  );
};
