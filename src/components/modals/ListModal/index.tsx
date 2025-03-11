import { useRef, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { MdClear, MdDeleteOutline } from "react-icons/md";

import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/inubekit";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";
import { Divider } from "@inubekit/divider";

import { StyledItem } from "@pages/board/outlets/financialReporting/styles";
import { saveDocument } from "@services/saveDocument";
import { optionFlags } from "@pages/board/outlets/financialReporting/config";
import { validationMessages } from "@validations/validationMessages";
import { AppContext } from "@context/AppContext";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
} from "./styles";
export interface IOptionButtons {
  label: string;
  variant: "filled" | "outlined" | "none";
  icon?: React.JSX.Element;
  fullwidth?: boolean;
  onClick?: () => void;
}

export interface IListModalProps {
  title: string;
  handleClose: () => void;
  handleSubmit?: () => void;
  onSubmit?: () => void;
  buttonLabel: string;
  cancelButton?: string;
  appearanceCancel?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
  portalId?: string;
  content?: JSX.Element | JSX.Element[] | string;
  optionButtons?: IOptionButtons;
  id?: string;
}

export const ListModal = (props: IListModalProps) => {
  const {
    title,
    portalId,
    content,
    optionButtons,
    cancelButton,
    appearanceCancel = "primary",
    handleClose,
    handleSubmit,
    onSubmit,
    buttonLabel,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }
  const { addFlag } = useFlag();

  const isMobile = useMediaQuery("(max-width: 700px)");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<
    { id: string; name: string; file: File }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const { businessUnitSigla } = useContext(AppContext);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  interface IListdataProps {
    data: { id: string; name: string }[];
    icon?: React.ReactNode;
    onDelete: (id: string) => void;
  }

  const Listdata = (props: IListdataProps) => {
    const { data, icon, onDelete } = props;

    if (data.length === 0) {
      return <Text>No hay documentos adjuntos.</Text>;
    }

    return (
      <ul
        style={{
          paddingInlineStart: "2px",
          marginBlock: "8px",
        }}
      >
        {data.map((element) => (
          <StyledItem key={element.id}>
            <Text>{element.name}</Text>
            <Icon
              icon={icon}
              appearance="dark"
              spacing="narrow"
              size="24px"
              cursorHover
              onClick={() => onDelete(element.id)}
            />
          </StyledItem>
        ))}
      </ul>
    );
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        file: file,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setLoading(true);
    }
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    setLoading(false);
  };

  type FlagAppearance =
    | "primary"
    | "danger"
    | "warning"
    | "success"
    | "help"
    | "gray"
    | "dark";

  const handleFlag = (
    title: string,
    description: string,
    appearance: FlagAppearance
  ) => {
    addFlag({
      title: title,
      description: description,
      appearance: appearance,
      duration: 5000,
    });
  };

  const handleUpload = async () => {
    try {
      uploadedFiles.forEach(async (fileData) => {
        await saveDocument(
          businessUnitPublicCode,
          "1",
          fileData.name.split(".").slice(0, -1).join("."),
          fileData.file
        );
      });
      handleClose();
      handleFlag(
        optionFlags.title,
        optionFlags.description,
        optionFlags.appearance as FlagAppearance
      );
    } catch (error) {
      handleFlag(
        optionFlags.title,
        optionFlags.description,
        optionFlags.appearanceError as FlagAppearance
      );
    }
  };

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="8px">
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Divider />
        <StyledContainerContent $smallScreen={isMobile}>
          {typeof content === "string" ? (
            <Stack>
              <Text>{content}</Text>
            </Stack>
          ) : (
            <StyledContainerContent $smallScreen={isMobile}>
              <Listdata
                data={uploadedFiles}
                icon={<MdDeleteOutline />}
                onDelete={handleDeleteFile}
              />
            </StyledContainerContent>
          )}
        </StyledContainerContent>
        {optionButtons ? (
          <>
            <Button
              spacing="compact"
              iconBefore={optionButtons?.icon}
              variant={optionButtons?.variant}
              onClick={handleButtonClick}
              fullwidth={optionButtons?.fullwidth}
              cursorHover
            >
              {optionButtons?.label}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png"
              multiple
            />
            <Stack justifyContent="flex-end" margin="16px 0 0 0" gap="16px">
              <Button onClick={handleUpload} disabled={loading ? false : true}>
                {buttonLabel}
              </Button>
            </Stack>
          </>
        ) : (
          <Stack justifyContent="flex-end" margin="16px 0 0 0" gap="16px">
            <Button onClick={handleClose}>{buttonLabel}</Button>
          </Stack>
        )}
        {cancelButton && optionButtons && (
          <Stack justifyContent="flex-end" margin="16px 0 0 0" gap="16px">
            <Button
              variant="outlined"
              onClick={handleSubmit}
              spacing="wide"
              appearance={appearanceCancel}
            >
              {cancelButton}
            </Button>
            <Button onClick={onSubmit ?? handleClose}>{buttonLabel}</Button>
          </Stack>
        )}
      </StyledModal>
    </Blanket>,
    node
  );
};
