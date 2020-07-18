import React from 'react';
import Navigator from './routes/drawer';
import {useAuth} from './authentication/AuthProvider';
import {LogInView} from './authentication/LogInView';
import {AuthProvider} from './authentication/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <AppBody />
      <Navigator />
    </AuthProvider>

  );
}
