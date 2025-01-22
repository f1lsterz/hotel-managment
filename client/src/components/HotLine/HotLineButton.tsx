import ChatTwoToneIcon from "@mui/icons-material/ChatTwoTone";

interface HotLineButtonProps {
  onClick: () => void;
}

const HotLineButton: React.FC<HotLineButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
    >
      <ChatTwoToneIcon className="w-96 h-96 text-blue-500 hover:scale-110 transition-transform duration-300" />
    </button>
  );
};

export default HotLineButton;
