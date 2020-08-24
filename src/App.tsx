import React from 'react';
import { Chat } from './components/Chat';
import { AuthForm } from './components/AuthForm';
import './main.global.css';

export const App = () => {
    const [ userName, setUserName ] = React.useState('');

    return userName ? <Chat userName={userName} /> : <AuthForm setUserName={setUserName} />;
};
