import React from 'react';
import { Layout } from './components/Layout/Layout';
import { PageContent } from './components/PageContent/PageContent';
import { Theme } from './types/types';

import './App.scss';
import { Button, ButtonStyle } from './components/Button/Button';

function App(): JSX.Element {
  return (
    <Layout showModal={false} theme={Theme.light}>
      <PageContent>
        <div>
          <Button content='default' />
          <Button content='transparent' type={[ButtonStyle.transparent]} />
          <Button content='bordered' type={[ButtonStyle.bordered]} />
          <Button content='bt' type={[ButtonStyle.bordered, ButtonStyle.transparent]} />
        </div>
      </PageContent>
    </Layout>
  );
}

export default App;
