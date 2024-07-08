import { createRoot } from "react-dom/client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (
  content: JSX.Element,
  titleSave = "document.pdf"
) => {
  const containerPDF = document.createElement("div");

  document.body.appendChild(containerPDF);

  const root = createRoot(containerPDF);
  root.render(content);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const canvas = await html2canvas(containerPDF, {
    height: containerPDF.scrollHeight,
    width: containerPDF.scrollWidth,
    useCORS: true,
    allowTaint: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("l", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  const margins = {
    top: 20,
    bottom: 0,
    left: 25.4,
    right: 25.4,
  };

  const contentWidth = pdfWidth - margins.left - margins.right;
  const contentHeight = pdfHeight - margins.top - margins.bottom;

  pdf.addImage(
    imgData,
    "PNG",
    margins.left,
    margins.top,
    contentWidth,
    contentHeight
  );

  pdf.save(`${titleSave}.pdf`);

  document.body.removeChild(containerPDF);
};
