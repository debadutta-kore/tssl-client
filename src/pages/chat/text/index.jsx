import { useState } from "react";
import { useRef } from "react";
import ChatSplashScreen from "../../../components/chatSplashScreen";
import { useOutletContext } from "react-router-dom";

function TextChat() {
  const { usecaseInfo } = useOutletContext();
  const [showSplash, setShowSplash] = useState(true);
  const ref = useRef(null);

  return (
    <>
      {showSplash && (
        <ChatSplashScreen
          icon={usecaseInfo.icon}
          name={usecaseInfo.name}
          theme={usecaseInfo.theme}
        />
      )}
      <iframe
        src={usecaseInfo.config.url}
        width={"100%"}
        height={"100%"}
        onLoad={() => setShowSplash(false)}
        ref={ref}
      />
    </>
  );
}
export default TextChat;
