import { useState } from "react";
import ChatModal from "./ChatModal";
import HotLineButton from "./HotLineButton";
import { useUserStore } from "../../stores/user";
import { useNavigate } from "react-router-dom";

const HotLine: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isAuth } = useUserStore();
  const navigate = useNavigate();

  const openChat = () => {
    if (isAuth) {
      setIsChatOpen(true);
    } else {
      navigate("/authorization");
    }
  };
  const closeChat = () => setIsChatOpen(false);

  return (
    <>
      <HotLineButton onClick={openChat} />
      <ChatModal isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
};

export default HotLine;
