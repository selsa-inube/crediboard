import { useState } from "react";
import { FormikValues } from "formik";
import { MdAdd, MdOutlineAdd } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

import { TableExtraDebtors } from "@pages/prospect/components/TableExtraDebtors";
import { ExtraDebtorModal } from "@components/modals/extraDebtorModal";

export function ExtraDebtors() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const initialValues: FormikValues = {
    documentType: "",
    documentNumber: "",
    names: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  };

  return (
    <Stack direction="column">
      <Stack justifyContent="end" margin="15px 0px">
        <Button
          children="Agregar deudor extra"
          iconBefore={
            <Icon
              icon={<MdOutlineAdd />}
              appearance="light"
              size="18px"
              spacing="narrow"
            />
          }
          onClick={() => setIsOpenModal(true)}
        />
      </Stack>
      <TableExtraDebtors />
      {isOpenModal && (
        <ExtraDebtorModal
          title="Agregar deudor extra"
          initialValues={initialValues}
          onCloseModal={() => setIsOpenModal(false)}
          onConfirm={() => console.log("ok")}
          confirmButtonText="Agregar"
          iconBefore={<MdAdd />}
        />
      )}
    </Stack>
  );
}
