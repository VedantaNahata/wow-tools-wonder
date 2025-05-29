
interface AdSenseBoxProps {
  slot?: string;
  className?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
}

const AdSenseBox = ({ slot = "placeholder", className = "", format = "auto" }: AdSenseBoxProps) => {
  const getSize = () => {
    switch (format) {
      case "rectangle":
        return "h-64 w-full max-w-sm";
      case "horizontal":
        return "h-24 w-full";
      case "vertical":
        return "h-96 w-40";
      default:
        return "h-32 w-full";
    }
  };

  return (
    <div className={`adsense-placeholder ${getSize()} ${className}`}>
      <div className="text-center">
        <p className="font-medium">Advertisement</p>
        <p className="text-xs mt-1">Google AdSense Slot: {slot}</p>
      </div>
    </div>
  );
};

export default AdSenseBox;
