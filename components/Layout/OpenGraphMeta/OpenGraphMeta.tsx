import React from 'react';

import { SocialMetaProps } from '../SocialMeta';

export const OpenGraphMeta: React.FC<SocialMetaProps> = ({
  title,
  url,
  image,
  desc,
}) => {
  return (
    <>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={desc} />
    </>
  );
};
