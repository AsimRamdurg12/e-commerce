import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  bg: string;
}

const InfoCard = ({ info }: { info: InfoCardProps }) => {
  const Icon = info.Icon;

  return (
    <div className="rounded-2xl px-4 py-4 flex items-center gap-4 bg-white drop-shadow-lg border border-gray-100 transition hover:shadow-xl">
      {/* Icon Box */}
      <div className={`p-3 rounded-xl ${info.bg}`}>
        <Icon className="size-6 md:size-8" />
      </div>

      {/* Text Content */}
      <div>
        <h5 className="font-semibold text-base md:text-lg text-gray-800">
          {info.title}
        </h5>
        <p className="text-sm md:text-base text-gray-500">{info.description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
