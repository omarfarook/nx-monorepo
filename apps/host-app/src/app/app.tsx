import { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';

const RemoteFirstComponent = lazy(() => import('remote-first-fe/Module'));
const RemoteSecondComponent = lazy(() => import('remote-second-fe/Module'));

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <div>
    <h1>Host App</h1>
    <Suspense fallback={<div>Loading Remote Apps...</div>}>
      <RemoteFirstComponent />
      <RemoteSecondComponent />
    </Suspense>
  </div>
  );
}

export default App;
