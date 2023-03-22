import React from 'react';

import { SocialMetaProps } from '../SocialMeta';

export const TwitterMeta: React.FC<SocialMetaProps> = ({
  url,
  title,
  desc,
  image,
}) => {
  return (
    <>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content={image} />
    </>
  );
};
