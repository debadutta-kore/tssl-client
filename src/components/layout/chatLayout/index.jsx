import Header from "../../header";
import arrow from "../../../assets/icons/Arrow Back.svg";
import settingStyle from "../settingsLayout/index.module.sass";
import style from "./index.module.sass";
import { useNavigate, useParams } from "react-router-dom";
import usecaseDb from "../../../utilities/static-usecases.json";
import ChatSplashScreen from "../../modal/chatSplashScreen";
import { useEffect, useRef, useState } from "react";
import PdfViewer from "../../modal/pdfViewer";
import { getPdfNameFromUrl } from "../../../utilities";
function ChatLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const ref = useRef();

  useEffect(() => {
    let noOfAnchor = 0;
    const onClickAnchor = (event) => {
      if (getPdfNameFromUrl(event.target.href)) {
        event.preventDefault();
        event.stopPropagation();
        setPdfUrl(event.target.href);
      }
      // get the pdf link that user clicked
    };
    const interval = setInterval(() => {
      if (ref !== null && ref.current) {
        const innerDoc =
          ref.current.contentDocument || ref.current.contentWindow.document;
        if (innerDoc) {
          const anchors = innerDoc.body.querySelectorAll("a");
          if (anchors.length != noOfAnchor) {
            anchors.forEach((anchor) => {
              anchor.removeEventListener("click", onClickAnchor);
            });
            anchors.forEach((anchor) => {
              anchor.addEventListener("click", onClickAnchor);
            });
            noOfAnchor = anchors.length;
          }
        }
      } else {
        clearInterval(interval);
      }
    }, 500);
  }, []);

  const usecaseInfo = usecaseDb.find(({ id }) => params.id === id);

  return (
    <>
      {pdfUrl && <PdfViewer url={pdfUrl} onClose={() => setPdfUrl('')} />}
      {showSplash && <ChatSplashScreen {...usecaseInfo} />}
      <Header>
        <nav className={settingStyle["nav-bar"]}>
          <button onClick={() => navigate(-1)}>
            <img src={arrow} alt="back" width={30} height={30} />
          </button>
          <h3>{usecaseInfo.name}</h3>
        </nav>
      </Header>
      <main className={style["layout-container"]}>
        <iframe
          srcDoc='<html><body><a href="https://www.africau.edu/images/default/sample.pdf">click it </a></body></html>'
          width={"100%"}
          height={"100%"}
          onLoad={() => setShowSplash(false)}
          ref={ref}
        ></iframe>
      </main>
    </>
  );
}

export default ChatLayout;
