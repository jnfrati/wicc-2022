import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { LoadingOutlined } from "@ant-design/icons";
import { StyledWrapper, StyledLoading, StyledScrollContainer } from "./styles";
import ZoomControl from "./ZoomControl";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({
  url,
  pageNumber = 1,
  height = undefined,
}: {
  url: string;
  pageNumber?: number;
  height?: unknown | undefined;
}): JSX.Element => {
  const [scale, setScale] = useState(1);
  const zoomOut = () => {
    setScale((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 0.5;
    });
  };
  const zoomIn = () => {
    setScale((prev) => prev + 0.5);
  };
  return (
    <StyledWrapper height={height}>
      <Document
        file={url}
        loading={
          <StyledLoading>
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          </StyledLoading>
        }
      >
        <StyledScrollContainer height={height}>
          <Page
            pageNumber={pageNumber}
            height={height}
            renderAnnotationLayer={false}
            scale={scale}
          />
        </StyledScrollContainer>
      </Document>
      <ZoomControl onZoomOut={zoomOut} onZoomIn={zoomIn} />
    </StyledWrapper>
  );
};

export default PdfViewer;
