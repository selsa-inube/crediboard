import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Grid } from "@inubekit/grid";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";

import { CardBorrower } from "@components/cards/CardBorrower";
import { NewCardBorrower } from "@components/cards/CardBorrower/newCard";
import { Fieldset } from "@components/data/Fieldset";
import { DeleteModal } from "@components/modals/DeleteModal";
import { DebtorAddModal } from "@pages/prospect/components/modals/DebtorAddModal";
import { DebtorDetailsModal } from "@pages/prospect/components/modals/DebtorDetailsModal";
import { DebtorEditModal } from "@pages/prospect/components/modals/DebtorEditModal";
import { dataFillingApplication } from "@pages/SubmitCreditApplication/config/config";
import { choiceBorrowers } from "@mocks/filing-application/choice-borrowers/choiceborrowers.mock";
import { currencyFormat } from "@utils/formatData/currency";

import { getPropertyValue, getTotalFinancialObligations } from "../../util";

interface borrowersProps {
  isMobile: boolean;
  onFormValid: (isValid: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChange: (values: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
export function Borrowers(props: borrowersProps) {
  const { handleOnChange, initialValues, isMobile, data } = props;

  const dataDebtorDetail = Array.isArray(data.borrowers) ? data.borrowers : [];

  const formik = useFormik({
    initialValues: { ...initialValues, borrowers: dataDebtorDetail },
    validateOnMount: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    handleOnChange(formik.values);
  }, [formik.values, handleOnChange]);

  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedBorrower, setSelectedBorrower] = useState<any>(null);

  const { id } = useParams();
  const userId = parseInt(id || "0", 10);
  const userChoice =
    choiceBorrowers.find((choice) => choice.id === userId)?.choice ||
    "borrowers";

  const dataOption =
    dataFillingApplication[
      userChoice === "borrowers" ? "borrowers" : "coBorrowers"
    ];

  return (
    <Fieldset>
      <Stack direction="column" padding="2px 10px" gap="20px">
        <Stack justifyContent="end">
          <Button onClick={() => setIsModalAdd(true)} iconBefore={<MdAdd />}>
            {dataOption.addButton}
          </Button>
        </Stack>
        <Grid
          templateColumns={
            isMobile ? "1fr" : `repeat(${dataDebtorDetail.length + 1}, 317px)`
          }
          autoRows="auto"
          gap="20px"
        >
          {dataDebtorDetail.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any, index: number) => (
              <CardBorrower
                key={index}
                title={dataOption.borrowerLabel + ` ${index + 1}`}
                name={getPropertyValue(item.borrower_properties, "name")}
                lastName={getPropertyValue(item.borrower_properties, "surname")}
                email={
                  getPropertyValue(item.borrower_properties, "email") || ""
                }
                income={currencyFormat(
                  getPropertyValue(item.borrower_properties, "PeriodicSalary"),
                  false
                )}
                obligations={currencyFormat(
                  getTotalFinancialObligations(item.borrower_properties),
                  false
                )}
                handleView={() => {
                  setSelectedBorrower(item);
                  setIsModalView(true);
                }}
                isMobile={isMobile}
                handleEdit={() => {
                  setSelectedBorrower(item);
                  setIsModalEdit(true);
                }}
                handleDelete={() => setIsModalDelete(true)}
              />
            )
          )}
          <NewCardBorrower
            onClick={() => setIsModalAdd(true)}
            title={dataOption.borrowerLabel}
            isMobile={isMobile}
          />
          {isModalAdd && (
            <DebtorAddModal
              onSubmit={() => setIsModalAdd(false)}
              handleClose={() => setIsModalAdd(false)}
              title={dataOption.addButton}
            />
          )}
          {isModalView && selectedBorrower && (
            <DebtorDetailsModal
              handleClose={() => setIsModalView(false)}
              isMobile={isMobile}
              initialValues={selectedBorrower}
            />
          )}
          {isModalDelete && (
            <DeleteModal handleClose={() => setIsModalDelete(false)} />
          )}
          {isModalEdit && selectedBorrower && (
            <DebtorEditModal
              handleClose={() => setIsModalEdit(false)}
              isMobile={isMobile}
              initialValues={selectedBorrower}
            />
          )}
        </Grid>
      </Stack>
    </Fieldset>
  );
}
