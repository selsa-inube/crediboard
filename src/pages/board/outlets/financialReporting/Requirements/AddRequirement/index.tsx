import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Stack,
  Icon,
  Text,
  useMediaQuery,
  Select,
  Blanket,
  Button,
  useFlag,
  Textfield,
  Textarea,
} from "@inubekit/inubekit";

import { IOptionsSelect } from "@pages/SubmitCreditApplication/types";

import { StyledContainerClose, StyledModal } from "./styles";
import { IPatchOfRequirements, IRequirement } from "@services/types";
import { saveRequirements } from "./utils";
import { useContext, useState } from "react";
import { AppContext } from "@context/AppContext";
import { textFlagsUsers } from "@config/pages/staffModal/addFlag";
import { useNavigate, useParams } from "react-router-dom";
import { dataAddRequirement } from "@config/components/addRequirement";

export interface StaffModalProps {
  accountdRequirement: IOptionsSelect[];
  rawRequirements: IRequirement[];
  creditRequestCode: string;
  commercialManager?: string;
  analyst?: string;
  portalId?: string;
  onChange?: (key: string) => void;
  onSubmit?: (values: { typeOfRequirementToEvaluated: string }) => void;
  onCloseModal?: () => void;
}

export function AddRequirement(props: StaffModalProps) {
  const {
    portalId = "portal",
    onSubmit,
    onCloseModal,
    accountdRequirement,
    rawRequirements,
    creditRequestCode,
  } = props;
  const [selectedCommercialManager, setSelectedCommercialManager] =
    useState<string>("");
  const isMobile = useMediaQuery("(max-width: 700px)");
  const { businessUnitSigla } = useContext(AppContext);
  const { addFlag } = useFlag();
  const [requirementName, setRequirementName] = useState("");
  const [descriptionUseValue, setDescriptionUseValue] = useState("");
  const [modifyJustification, setModifyJustification] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;
  const node = document.getElementById(portalId);
  const validationSchema = Yup.object().shape({
    typeOfRequirementToEvaluated: Yup.string(),
  });

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const handleAccountdRequirementChange = (
    name: string,
    value: string,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue(name, value);
    const selectedOption = options.Requirement.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setSelectedCommercialManager(selectedOption.id);
    }
  };

  const options = {
    Requirement: accountdRequirement.map((official) => ({
      id: official.id,
      label: official.label,
      value: official.value,
    })),
  };
  const handleCreditRequests = async (creditRequests: IPatchOfRequirements) => {
    await saveRequirements(businessUnitPublicCode, creditRequests)
      .then(() => {
        addFlag({
          title: textFlagsUsers.titleSuccess,
          description: textFlagsUsers.descriptionSuccess,
          appearance: "success",
          duration: 5000,
        });
      })
      .catch(() => {
        addFlag({
          title: textFlagsUsers.titleError,
          description: textFlagsUsers.descriptionError,
          appearance: "danger",
          duration: 5000,
        });
      })
      .finally(() => {
        if (onCloseModal) onCloseModal();
        handleToggleModal();
      });

    setTimeout(() => {
      navigate(`/extended-card/${id}`);
    }, 6000);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const initialValues: IPatchOfRequirements = {
    packageId: rawRequirements[0].packageId,
    uniqueReferenceNumber: creditRequestCode,
    packageDate: rawRequirements[0].packageDate,
    packageDescription:
      "Requisitos para la solicitud de crédito SC-12225464610",
    modifyJustification: modifyJustification,
    listsOfRequirementsByPackage: [
      {
        packageId: rawRequirements[0].packageId,
        requirementCatalogName: requirementName,
        requirementDate: rawRequirements[0].packageDate,
        requirementStatus: "UNVALIDATED",
        descriptionEvaluationRequirement: "Requisitos no evaluados",
        descriptionUse: descriptionUseValue,
        typeOfRequirementToEvaluated: selectedCommercialManager,
        transactionOperation: "Insert",
      },
    ],
  };
  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {dataAddRequirement.title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap="8px">
              <Text>{dataAddRequirement.close}</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>

        <Formik
          initialValues={{
            typeOfRequirementToEvaluated: "",
            requirementCatalogName: "",
            descriptionUse: "",
            modifyJustification: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit?.(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Stack direction="column" gap="24px">
                <Select
                  name="typeOfRequirementToEvaluated"
                  id="typeOfRequirementToEvaluated"
                  label={dataAddRequirement.labelPaymentMethod}
                  placeholder={
                    options.Requirement.length > 0
                      ? "Seleccione una opción"
                      : "No hay disponibles"
                  }
                  options={options.Requirement}
                  onChange={(name, value) =>
                    handleAccountdRequirementChange(name, value, setFieldValue)
                  }
                  value={values.typeOfRequirementToEvaluated}
                  fullwidth
                  disabled={options.Requirement.length === 0}
                />
                <Textfield
                  name="requirementCatalogName"
                  id="requirementCatalogName"
                  label={dataAddRequirement.labelName}
                  placeholder={dataAddRequirement.placeHolderDate}
                  onChange={(e) => {
                    setRequirementName(e.target.value);
                    setFieldValue("requirementCatalogName", e.target.value);
                  }}
                  value={values.requirementCatalogName}
                  size="wide"
                  fullwidth
                />
                <Textarea
                  id={"descriptionUse"}
                  name={"descriptionUse"}
                  label={dataAddRequirement.labelTextarea}
                  placeholder={dataAddRequirement.placeHolderTextarea}
                  value={values.descriptionUse}
                  onChange={(e) => {
                    setDescriptionUseValue(e.target.value);
                    setFieldValue("descriptionUse", e.target.value);
                  }}
                  fullwidth
                />
                <Textarea
                  id={"modifyJustification"}
                  name={"modifyJustification"}
                  label={dataAddRequirement.labelJustification}
                  placeholder={dataAddRequirement.placeHolderJustification}
                  value={values.modifyJustification}
                  onChange={(e) => {
                    setModifyJustification(e.target.value);
                    setFieldValue("modifyJustification", e.target.value);
                  }}
                  fullwidth
                  maxLength={300}
                />
              </Stack>
              <Stack justifyContent="flex-end" margin="16px 0">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => handleCreditRequests(initialValues)}
                >
                  Agregar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </StyledModal>
    </Blanket>,
    node
  );
}
