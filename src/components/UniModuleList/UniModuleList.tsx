import React from 'react';

interface UniModuleListProps {
  name: string;
  children: React.ReactNode;
}

export const UniModuleList: React.FC<UniModuleListProps> = ({
  name,
  children,
}) => (
  <div className="flex flex-row align-middle my-8">
    <div className="flex items-center justify-center w-12">
      <h3 className="text-xl text-center -rotate-90 whitespace-nowrap">
        {name}
      </h3>
    </div>
    <ul className="list-none pl-4 py-4 border-l-2 rounded-xl">{children}</ul>
  </div>
);
