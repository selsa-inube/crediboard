import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "@inubekit/checkbox";
import { Divider } from "@inubekit/divider";
import { Toggle } from "@inubekit/toggle";
import { Select } from "@inubekit/select";
import { Stack } from "@inubekit/stack";
import { Textarea } from "@inubekit/textarea";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";

import { optionTodisburseMoney } from "@src/mocks/filing-application/disbursement-general/disbursementgeneral.mock";
import {
    handleChangeWithCurrency,
    validateCurrencyField,
} from "@utils/formatData/currency";

import { IDisbursementGeneral } from "../../../types";
import { disbursementGeneral } from "./config";

interface IDisbursementGeneralProps {
    isMobile: boolean;
    initialValues: IDisbursementGeneral;
    onFormValid: (isValid: boolean) => void;
    handleOnChange: (values: IDisbursementGeneral) => void;
}

export function DisbursementWithInternalAccount(props: IDisbursementGeneralProps) {
    const { isMobile, initialValues, onFormValid, handleOnChange } = props;

    const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
    const [isFeatureIndeterminate, setIsFeatureIndeterminate] = useState(false);
    const [toggleChecked, setToggleChecked] = useState(false);

    const validationSchema = Yup.object({
        state: Yup.string().required(),
        amount: Yup.number().required(),
        description: Yup.string().required(),
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
            prevValues.current.state !== formik.values.state ||
            prevValues.current.amount !== formik.values.amount ||
            prevValues.current.description !== formik.values.description
        ) {
            handleOnChange(formik.values);
            prevValues.current = formik.values;
        }
    }, [formik.values, handleOnChange]);

    const handleCheckboxChange = (event: { target: { checked: boolean } }) => {
        if (isFeatureIndeterminate) {
            setIsFeatureEnabled(!isFeatureEnabled);
            setIsFeatureIndeterminate(false);
        } {
            setIsFeatureEnabled(event.target.checked);
        }
    };

    const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToggleChecked(e.target.checked);
    };

    return (

        <Stack
            direction="column"
            padding={isMobile ? "4px 10px" : "10px 16px"}
            gap="20px"
            justifyContent="center"
        >
            <Textfield
                name="amount"
                id="amount"
                label={disbursementGeneral.labelDisbursement}
                placeholder={disbursementGeneral.placeDisbursement}
                size="compact"
                value={validateCurrencyField("amount", formik)}
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                onBlur={formik.handleBlur}
                fullwidth
            />

            <Checkbox
                id="featureCheckbox"
                name="feature"
                label="El valor a girar con esta forma de desembolso es igual saldo pendiente por desembolsar."
                checked={isFeatureEnabled}
                indeterminate={isFeatureIndeterminate}
                onChange={handleCheckboxChange}
                value={"featureCheckbox"}
            />
            <Divider dashed />

            <Text>{disbursementGeneral.text}</Text>

            <Stack gap="8px">
                <Toggle
                    checked={toggleChecked}
                    disabled={false}
                    id="toggleSwitch"
                    margin="0px"
                    name="toggleFeature"
                    onChange={handleToggleChange}
                    padding="0px"
                    size="large"
                    value="switchTest1"
                />
                <Text>{toggleChecked ? "SI" : "NO"}</Text>

            </Stack>

            <Divider dashed />
            <Select
                name="state"
                id="state"
                label={disbursementGeneral.labelAccount}
                placeholder={disbursementGeneral.placeHolderState}
                size="compact"
                options={optionTodisburseMoney}
                onBlur={formik.handleBlur}
                onChange={(name, value) => formik.setFieldValue(name, value)}
                value={formik.values.state}
                fullwidth
            />

            <Textarea
                name="description"
                id="description"
                label={disbursementGeneral.labelDescription}
                placeholder={disbursementGeneral.placeDescription}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullwidth
            />
        </Stack>
    );
}
