import { useContext, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
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
import { dataSubmitApplication } from "@pages/SubmitCreditApplication/config/config";
import { currencyFormat, getMonthsElapsed } from "@utils/formatData/currency";
import { ruleConfig } from "@pages/SubmitCreditApplication/config/configRules";
import { evaluateRule } from "@pages/SubmitCreditApplication/evaluateRule";
import { postBusinessUnitRules } from "@services/businessUnitRules";
import { CustomerContext } from "@context/CustomerContext";
import { AppContext } from "@context/AppContext";

import { getPropertyValue, getTotalFinancialObligations } from "../../util";
import { StyledContainer } from "./styles";

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
  const { customerData } = useContext(CustomerContext);
  const { businessUnitSigla } = useContext(AppContext);
  const [valueRule, setValueRule] = useState<string[] | null>(null);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const formik = useFormik({
    initialValues: { ...initialValues, borrowers: dataDebtorDetail },
    validateOnMount: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    handleOnChange(formik.values);
  }, [formik.values, handleOnChange]);

  useEffect(() => {
    const clientInfo = customerData?.generalAttributeClientNaturalPersons?.[0];
    const creditProduct = data?.credit_products?.[0];

    if (!clientInfo || !creditProduct) return;

    const dataRules = {
      LineOfCredit: creditProduct.line_of_credit_abbreviated_name,
      ClientType: clientInfo.associateType?.substring(0, 1) || "",
      LoanAmount: data.requested_amount,
      PrimaryIncomeType: "",
      AffiliateSeniority: getMonthsElapsed(
        customerData.generalAssociateAttributes?.[0]?.affiliateSeniorityDate,
        0
      ),
    };

    const rule = ruleConfig["ValidationCoBorrowwe"]?.(dataRules);

    if (!rule) return;

    (async () => {
      const values = await evaluateRule(
        rule,
        (businessUnitPublicCode, data) =>
          postBusinessUnitRules(businessUnitPublicCode, data),
        "value",
        businessUnitPublicCode
      );

      const extractedValues = Array.isArray(values)
        ? values
            .map((v) => (typeof v === "string" ? v : v?.value))
            .filter((val): val is string => typeof val === "string")
        : [];

      setValueRule(extractedValues);
    })();
  }, [customerData, data, businessUnitPublicCode]);

  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedBorrower, setSelectedBorrower] = useState<any>(null);

  return (
    <Fieldset>
      <Stack direction="column" gap="20px">
        <Stack justifyContent="end" margin="0 8px">
          <Button onClick={() => setIsModalAdd(true)} iconBefore={<MdAdd />}>
            {valueRule?.includes("Codeudor")
              ? dataSubmitApplication.coBorrowers.borrowerLabel
              : dataSubmitApplication.borrowers.borrowerLabel}
          </Button>
        </Stack>
        <StyledContainer>
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
                  title={
                    dataSubmitApplication.borrowers.borrowerLabel +
                    ` ${index + 1}`
                  }
                  name={getPropertyValue(item.borrower_properties, "name")}
                  lastName={getPropertyValue(
                    item.borrower_properties,
                    "surname"
                  )}
                  email={
                    getPropertyValue(item.borrower_properties, "email") || ""
                  }
                  income={currencyFormat(
                    getPropertyValue(
                      item.borrower_properties,
                      "PeriodicSalary"
                    ),
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
              title={
                valueRule?.includes("Codeudor")
                  ? dataSubmitApplication.coBorrowers.borrowerLabel
                  : dataSubmitApplication.borrowers.borrowerLabel
              }
              isMobile={isMobile}
            />
            {isModalAdd && (
              <DebtorAddModal
                onSubmit={() => setIsModalAdd(false)}
                handleClose={() => setIsModalAdd(false)}
                title={
                  valueRule?.includes("Codeudor")
                    ? dataSubmitApplication.coBorrowers.borrowerLabel
                    : dataSubmitApplication.borrowers.borrowerLabel
                }
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
        </StyledContainer>
      </Stack>
    </Fieldset>
  );
}
