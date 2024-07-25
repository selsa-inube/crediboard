import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = (
  elementPrint: React.RefObject<HTMLDivElement>,
  customTitle = "",
  titlePDF = "document"
) => {
  if (elementPrint.current === null) return;

  const pdf = new jsPDF({ orientation: "portrait", format: "" });
  const margin = 10;
  const titleFontSize = 16;
  const scale = 1.5;

  const options = {
    scale,
    useCORS: true,
  };

  html2canvas(elementPrint.current, options)
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = margin + titleFontSize + 10;

      pdf.setFontSize(titleFontSize);
      pdf.text(customTitle, margin, margin + titleFontSize);

      while (heightLeft >= 0) {
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - position;
        if (heightLeft >= 0) {
          pdf.addPage();
          position = margin;
        }
      }

      pdf.save(titlePDF);
    })
    .catch((error) => {
      console.error("Error al generar el PDF:", error);
    });
};
