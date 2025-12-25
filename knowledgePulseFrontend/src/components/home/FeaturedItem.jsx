import { Check, Shield, HeadphonesIcon, Gift } from "lucide-react";

const FeatureItem = ({ icon, text, variant = "teal" }) => {
  const variants = {
    teal: {
      bg: "bg-[#1D6E61]/10",
      icon: "text-[#1D6E61]",
    },
    gold: {
      bg: "bg-[#EAB141]/20",
      icon: "text-[#EAB141]",
    },
  };

  const IconComponent = icon;
  const colors = variants[variant];

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}
      >
        <IconComponent className={`w-4 h-4 ${colors.icon}`} />
      </div>
      <span className="text-gray-700 italic">{text}</span>
    </div>
  );
};

export default FeatureItem;
