import { Tabs } from "@inubekit/tabs";
import { Checkbox } from "@inubekit/checkbox";
import { Divider } from "@inubekit/divider";
import { Toggle } from "@inubekit/toggle";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Select } from "@inubekit/select";
import { Stack } from "@inubekit/stack";
import { Textarea } from "@inubekit/textarea";
import { Textfield } from "@inubekit/textfield";

import { Fieldset } from "@components/data/Fieldset";
import { optionsOfferedstate } from "@mocks/filing-application/property-offered/propertyoffered.mock";
import {
    handleChangeWithCurrency,
    validateCurrencyField,
} from "@utils/formatData/currency";

import { IDataInternalYes } from "../../types";
import { dataInternalYes } from "./config";
import { disbursementln } from "./config";

interface IDataInternalYesProps {
    isMobile: boolean;
    initialValues: IDataInternalYes;
    onFormValid: (isValid: boolean) => void;
    handleOnChange: (values: IDataInternalYes) => void;
}

export function DataInternalYes(props: IDataInternalYesProps) {
    const { isMobile, initialValues, onFormValid, handleOnChange } = props;

    const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
    const [isFeatureIndeterminate, setIsFeatureIndeterminate] = useState(false);
    const [toggleChecked, setToggleChecked] = useState(false);
    const [currentTab, setCurrentTab] = useState(disbursementln[0].id);

    const validationSchema = Yup.object({
        state: Yup.string().required(),
        value: Yup.number().required(),
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
            prevValues.current.value !== formik.values.value ||
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

    const onTabChange = (tabId: string) => {
        setCurrentTab(tabId);
    };

    return (
        <Fieldset>
            <Stack
                direction="column"
                padding={isMobile ? "4px 10px" : "10px 16px"}
                gap="20px"
            >

                <Tabs
                    selectedTab={currentTab}
                    tabs={disbursementln}
                    onChange={onTabChange}
                />

                <Textfield
                    name="value"
                    id="value"
                    label={dataInternalYes.labelDisbursement}
                    placeholder={dataInternalYes.placeDisbursement}
                    size="compact"
                    value={validateCurrencyField("value", formik)}
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
                <Divider dashed />

                <Select
                    name="state"
                    id="state"
                    label={dataInternalYes.labelAccount}
                    placeholder={dataInternalYes.placeHolderState}
                    size="compact"
                    options={optionsOfferedstate}
                    onBlur={formik.handleBlur}
                    onChange={(name, value) => formik.setFieldValue(name, value)}
                    value={formik.values.state}
                    fullwidth
                />

                <Textarea
                    name="description"
                    id="description"
                    label={dataInternalYes.labelDescription}
                    placeholder={dataInternalYes.placeDescription}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullwidth
                />
            </Stack>
        </Fieldset>
    );
}
