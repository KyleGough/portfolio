import React from "react";

interface ChipProps {
  children: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ children }) => (
  <div className="text-chip bg-chip-light text-xs px-4 py-0.5 h-8 leading-chip rounded-2xl font-extrabold">
    {children}
  </div>
);
