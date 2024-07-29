import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = (
  elementPrint: React.RefObject<HTMLDivElement>,
  customTitle = "",
  titlePDF = "document"
) => {
  if (elementPrint.current === null) return;

  const pdf = new jsPDF({ orientation: "landscape", format: "a4" });
  const margin = 10;
  const titleFontSize = 16;

  html2canvas(elementPrint.current)
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const position = margin + titleFontSize + 10;

      pdf.setFontSize(titleFontSize);
      pdf.text(customTitle, margin, margin + titleFontSize);

      pdf.addImage(imgData, "PNG", margin, position, 100, 100);

      pdf.save(titlePDF);
    })
    .catch((error) => {
      console.error("Error al generar el PDF:", error);
    });
};
