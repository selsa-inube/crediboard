import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, inube, Grid, useMediaQuery } from "@inube/design-system";

import { ContainerSections } from "@components/layout/ContainerSections";
import { getById } from "@mocks/utils/dataMock.service";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";
import { dataAccordeon } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { DataCommercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement/TableCommercialManagement";
import { Requests } from "@services/types";

import { ToDo } from "./ToDo";
import { infoIcon } from "./ToDo/config";

export interface IFinancialReportingProps {
  requirements?: JSX.Element | JSX.Element[];
  promissoryNotes?: JSX.Element | JSX.Element[];
  approvals?: JSX.Element | JSX.Element[];
  management?: JSX.Element | JSX.Element[];
  postingVouchers?: JSX.Element | JSX.Element[];
}

export const FinancialReporting = (props: IFinancialReportingProps) => {
  const {
    requirements,
    promissoryNotes,
    approvals,
    management,
    postingVouchers,
  } = props;

  const [data, setData] = useState({} as Requests);

  const { id } = useParams();

  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  const dataCommercialManagementRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    getById("k_Prospe", "requests", id!).then((requirement) => {
      setData(requirement);
    });
  }, [id]);
  /* 
  const handlePrint = () => {
    if (dataCommercialManagementRef.current && iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;
      console.log("ifame.cuirrent", iframeRef.current);

      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(dataCommercialManagementRef?.current?.innerHTML);
        iframeDoc.close();

        const iframeHead = iframeDoc.head;
        Array.from(document.head.getElementsByTagName("style")).forEach(
          (style) => {
            const styleElement = iframeDoc.createElement("style");
            styleElement.innerHTML = style.innerHTML;

            iframeHead.appendChild(styleElement);
          }
        );

        Array.from(document.head.getElementsByTagName("link")).forEach(
          (link) => {
            // if (link.rel === "stylesheet") {
            const linkElement = iframeDoc.createElement("link");
            linkElement.rel = "stylesheet";
            linkElement.href = link.href;
            iframeHead.appendChild(linkElement);
            // }
          }
        );

        const printStyle = `
        @media print {
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `;
        const printStyleElement = iframeDoc.createElement("style");
        printStyleElement.innerHTML = printStyle;
        iframeHead.appendChild(printStyleElement);
        setTimeout(() => {
          iframeRef?.current?.contentWindow?.print();
        }, 1000);
      }
      
    }
  };

 */

  const handlePrint = () => {
    if (dataCommercialManagementRef.current && iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;

      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(dataCommercialManagementRef.current.innerHTML);
        iframeDoc.close();

        const iframeHead = iframeDoc.head;

        Array.from(document.head.getElementsByTagName("style")).forEach(
          (style) => {
            const styleElement = iframeDoc.createElement("style");
            styleElement.innerHTML = style.innerHTML;
            iframeHead.appendChild(styleElement);
            console.log("document.head", style);
          }
        );

        Array.from(document.head.getElementsByTagName("link")).forEach(
          (link) => {
            if (link.rel === "stylesheet") {
              const linkElement = iframeDoc.createElement("link");
              linkElement.rel = "stylesheet";
              linkElement.type = "text/css";
              linkElement.media = "all";

              linkElement.href = link.href;
              iframeHead.appendChild(linkElement);
            }
          }
        );

        const printStyle = `
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact
          }
        }
      `;
        const printStyleElement = iframeDoc.createElement("style");
        printStyleElement.innerHTML = printStyle;
        iframeHead.appendChild(printStyleElement);

        setTimeout(() => {
          iframeRef?.current?.contentWindow?.print();
        }, 2000);
      }
    }
  };

  return (
    <Stack direction="column" margin={!isMobile ? "s250 s500" : "s250"}>
      <ContainerSections isMobile={isMobile}>
        <Stack direction="column" gap={inube.spacing.s250}>
          <Stack direction="column">
            <Stack direction="column">
              <ComercialManagement
                prueba={handlePrint}
                data={data}
                children={
                  <>
                    <iframe
                      /*   style={{ display: "none" }} */
                      ref={iframeRef}
                    ></iframe>
                    <DataCommercialManagement
                      dataAccordeon={dataAccordeon}
                      dataRef={dataCommercialManagementRef}
                    />
                  </>
                }
              />
            </Stack>
          </Stack>
          <Grid
            templateColumns={!isMobile ? "repeat(2,1fr)" : "1fr"}
            gap="s200"
            autoRows="auto"
          >
            <Stack direction="column">
              {<ToDo icon={infoIcon} data={data} isMobile={isMobile} />}
            </Stack>
            <Stack direction="column">{approvals}</Stack>
            <Stack direction="column">{requirements}</Stack>
            <Stack direction="column">{management}</Stack>
            <Stack direction="column">{promissoryNotes}</Stack>
            <Stack direction="column">{postingVouchers}</Stack>
          </Grid>
        </Stack>
      </ContainerSections>
    </Stack>
  );
};
