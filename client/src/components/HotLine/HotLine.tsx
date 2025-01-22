import { useState } from "react";
import ChatModal from "./ChatModal";
import HotLineButton from "./HotLineButton";

const HotLine: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <>
      <HotLineButton onClick={openChat} />
      <ChatModal isOpen={isChatOpen} onClose={closeChat} />
    </>
  );
};

export default HotLine;
