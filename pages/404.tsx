import { Layout } from '@components/Layout';
import { NotFoundScene } from '@components/NotFoundScene';
import React from 'react';

const NotFound: React.FC = () => (
  <Layout title="Page Not Found - Kyle Gough" theme="space-gothic">
    <NotFoundScene />
  </Layout>
);

export default NotFound;
