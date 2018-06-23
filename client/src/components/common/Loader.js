import React from 'react';
import { Loader as Loading } from 'semantic-ui-react';

const Loader = () => {
  return <Loading active inline="centered" size="large" style={{ margin: '2em auto' }} />;
};

export default Loader;
