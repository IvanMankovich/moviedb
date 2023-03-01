import React from 'react';
import { Layout } from './components/Layout/Layout';
import { PageContent } from './components/PageContent/PageContent';
import { Theme } from './types/types';

import './App.scss';

function App(): JSX.Element {
  return (
    <Layout showModal={false} theme={Theme.light}>
      <PageContent>
        <div></div>
      </PageContent>
    </Layout>
  );
}

export default App;
