import { render, screen } from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./config/store";
import React from "react";
import { Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

test('Get session init', () => {
  render(<Provider store={store}>
    <App />
  </Provider>);
  const linkElement = screen.getByText(/Iniciar/i);
  expect(linkElement).toBeInTheDocument();
});
