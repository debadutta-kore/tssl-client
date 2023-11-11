import { useRef } from "react";
import Modal from "..";
function PdfViewer(props) {
  const ref = useRef(null);
  const onLoadPdf = () => {
    const innerDoc =
      ref.current.contentDocument || ref.current.contentWindow.document;
    innerDoc.getElementById("close-pdf").addEventListener("click", () => {
      console.log("close-button-click");
      props.onClose();
    });
  };
  return (
    <Modal style={{ overflow: "hidden", padding: "0.5rem" }}>
      <iframe
        src={`/render/web/viewer.html?file=${props.url}`}
        width="100%"
        height="100%"
        style={{ border: "0px" }}
        onLoad={onLoadPdf}
        ref={ref}
      />
    </Modal>
  );
}

export default PdfViewer;
