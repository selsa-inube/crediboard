import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@inubekit/grid";
import { Button } from "@inubekit/button";

import { Fieldset } from "@components/data/Fieldset";
import { NewBorrowerModal } from "@pages/prospect/components/cardNewBorrower";
import { AddBorrower } from "@pages/prospect/components/modals/AddBorrower";
import { dataFillingApplication } from "@pages/filingApplication/config/config";
import { choiceBorrowers } from "@mocks/filing-application/choice-borrowers/choiceborrowers.mock";

import { borrowerData } from "./config";

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

  const { id } = useParams();
  const userId = parseInt(id || "0", 10);
  const userChoice =
    choiceBorrowers.find((choice) => choice.id === userId)?.choice ||
    "borrowers";

  const data =
    dataFillingApplication[
      userChoice === "borrowers" ? "borrowers" : "coBorrowers"
    ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fieldset>
      <Button onClick={() => setIsModalOpen(true)}>{data.addButton}</Button>
      <Grid
        templateColumns={
          isMobile ? "1fr" : `repeat(${borrowerData.length + 1}, 317px)`
        }
        autoRows="auto"
        padding={isMobile ? "4px 10px" : "10px 16px"}
        gap="20px"
      >
        {borrowerData.map((item, index) => (
          <NewBorrowerModal
            key={index}
            title={`${data.borrowerLabel} ${index + 1}`}
            name={item.name}
            lastName={item.lastName}
            email={item.email}
            income={item.income}
            obligations={item.obligations}
          />
        ))}
        <NewBorrowerModal hasData />
        {isModalOpen && (
          <AddBorrower
            onSubmit={() => setIsModalOpen(false)}
            onCloseModal={() => setIsModalOpen(false)}
          />
        )}
      </Grid>
    </Fieldset>
  );
}
