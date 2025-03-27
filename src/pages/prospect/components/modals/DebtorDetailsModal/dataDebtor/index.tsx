import { useFormik } from "formik";
import { Stack } from "@inubekit/inubekit";

import { CardGray } from "@components/cards/CardGray";
import { IDebtorDetail } from "@pages/filingApplication/types";

import { dataDebtor } from "./config";

interface IDataDebtor {
  initialValues: IDebtorDetail;
}

export function DataDebtor(props: IDataDebtor) {
  const { initialValues } = props;

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    onSubmit: () => {},
  });

  return (
    <Stack direction="column" gap="12px">
      <CardGray
        label={dataDebtor.labelTypeDocument}
        data={formik.values.document}
      />
      <CardGray
        label={dataDebtor.labelNumberDocument}
        data={formik.values.documentNumber}
      />
      <CardGray label={dataDebtor.labelName} data={formik.values.name} />
      <CardGray
        label={dataDebtor.labelLastName}
        data={formik.values.lastName}
      />
      <CardGray
        label={dataDebtor.labelEmail}
        placeHolder={formik.values.email}
        apparencePlaceHolder="gray"
      />
      <CardGray label={dataDebtor.labelNumber} data={formik.values.number} />
      <CardGray label={dataDebtor.labelSex} data={formik.values.sex} />
      <CardGray label={dataDebtor.labelAge} data={formik.values.age} />
      <CardGray
        label={dataDebtor.labelRelation}
        data={formik.values.relation}
      />
    </Stack>
  );
}
