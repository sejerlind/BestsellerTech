import React from 'react';
import '../src/Styles/style.scss';
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
