import { useState } from "react";
import { MdAdd } from "react-icons/md";
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
import { mockGuaranteeBorrower } from "@mocks/guarantee/offeredguarantee.mock";

import { borrowerData } from "./config";
import { useParams } from "react-router-dom";
import { choiceBorrowers } from "@mocks/filing-application/choice-borrowers/choiceborrowers.mock";
import { dataFillingApplication } from "@pages/filingApplication/config/config";

interface borrowersProps {
  isMobile: boolean;
  initialValues: {
    name: string;
    lastName: string;
    email: string;
    income: number;
    obligations: number;
  };
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: {
    name: string;
    lastName: string;
    email: string;
    income: number;
    obligations: number;
  }) => void;
}
export function Borrowers(props: borrowersProps) {
  const { isMobile } = props;

  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);

  const { id } = useParams();
  const userId = parseInt(id || "0", 10);
  const userChoice =
    choiceBorrowers.find((choice) => choice.id === userId)?.choice ||
    "borrowers";

  const data =
    dataFillingApplication[
      userChoice === "borrowers" ? "borrowers" : "coBorrowers"
    ];

  return (
    <Fieldset>
      <Stack direction="column" padding="2px 10px" gap="20px">
        <Stack justifyContent="end">
          <Button onClick={() => setIsModalAdd(true)} iconBefore={<MdAdd />}>
            {data.addButton}
          </Button>
        </Stack>
        <Grid
          templateColumns={
            isMobile
              ? "1fr"
              : `repeat(${mockGuaranteeBorrower.length + 1}, 317px)`
          }
          autoRows="auto"
          gap="20px"
        >
          {mockGuaranteeBorrower.map((item, index) => (
            <CardBorrower
              key={index}
              title={borrowerData.borrower + ` ${index + 1}`}
              name={item.name}
              lastName={item.lastName}
              email={item.email}
              income={item.income}
              obligations={item.obligations}
              isMobile={isMobile}
              handleView={() => setIsModalView(true)}
              handleEdit={() => setIsModalEdit(true)}
              handleDelete={() => setIsModalDelete(true)}
            />
          ))}
          <NewCardBorrower
            onClick={() => setIsModalAdd(true)}
            isMobile={isMobile}
          />
          {isModalAdd && (
            <DebtorAddModal
              onSubmit={() => setIsModalAdd(false)}
              handleClose={() => setIsModalAdd(false)}
            />
          )}
          {isModalView && (
            <DebtorDetailsModal
              handleClose={() => setIsModalView(false)}
              isMobile={isMobile}
            />
          )}
          {isModalDelete && (
            <DeleteModal handleClose={() => setIsModalDelete(false)} />
          )}
          {isModalEdit && (
            <DebtorEditModal
              handleClose={() => setIsModalEdit(false)}
              isMobile={isMobile}
            />
          )}
        </Grid>
      </Stack>
    </Fieldset>
  );
}
