import { useState } from "react";
import { Grid } from "@inubekit/grid";
import { Button } from "@inubekit/button";

import { Fieldset } from "@components/data/Fieldset";
import { NewBorrowerModal } from "@pages/prospect/components/cardNewBorrower";
import { AddBorrower } from "@pages/prospect/components/modals/AddBorrower";

import { borrowerData, dataBorrower } from "./config";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fieldset>
      <Button onClick={() => setIsModalOpen(true)}>
        {dataBorrower.button}
      </Button>
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
            title={dataBorrower.borrower + ` ${index + 1}`}
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
