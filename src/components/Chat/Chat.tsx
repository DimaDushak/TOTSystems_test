import React from 'react';
import classNames from 'classnames';
import { Message } from '../Message';
import { GenericList } from '../GenericList';
import { Logo } from '../Logo';
import { MessageWrittingForm } from '../MessageWrittingForm';
import { initialWorkMessages, initialOtherMessages, IMessage } from '../../data/messages';
import { generateRandomString, getDate } from '../../utils';
import styles from './chat.css'

const sentMessages = classNames(styles.messageListItem, styles.sentMessages);
const receivedMessages = classNames(styles.messageListItem, styles.receivedMessages);

interface IChatProps {
    userName: string;
}

export const Chat = ({ userName}: IChatProps) => {
    const [ isWorkChat, setIsWorkChat ] = React.useState(true);
    const [ workMessages, setWorkMessages ] = React.useState(initialWorkMessages);
    const [ otherMessages, setOtherMessages ] = React.useState(initialOtherMessages);

    const setMessages = (isWorkChat: boolean) => {
        return isWorkChat ? setWorkMessages : setOtherMessages;
    };

    const changeMessages = (fn: (arr: IMessage[]) => IMessage[]) => {
        setMessages(isWorkChat)(fn);
        const name = isWorkChat ? 'workMessages' : 'otherMessages';
        localStorage[name] = JSON.stringify(fn(JSON.parse(localStorage[name])));
    };

    const addMessage = (message: IMessage | IMessage[]) => (arr: IMessage[]) => arr.concat(message);

    const filterMessages = (id: string) => (arr: IMessage[]) => arr.filter(item => item.id != id);

    const changeComment = (id: string) => (text: string) => (arr: IMessage[]) => arr.map(item => {
        return (item.id == id) ? { ...item, text } : item;
    });

    const createMessage = (text: string) => ({
        id: generateRandomString(),
        author: userName,
        text,
        date: getDate()
    });

    const getMessagesList = (arr: IMessage[]) => {
        return arr.map(item => ({
            id: item.id,
            className: (item.author == userName) ? sentMessages : receivedMessages,
            content: <Message
                         message={item}
                         filterMessages={() => changeMessages(filterMessages(item.id))}
                         changeComment={(text: string) => changeMessages(changeComment(item.id)(text))}  
                     />
        }));
    };

    React.useEffect(() => {
        let isWorkChat = true;
        ['workMessages', 'otherMessages'].map((item) => {
            if (localStorage[item]) {
                setMessages(isWorkChat)(addMessage(JSON.parse(localStorage[item])));
            } else {
                localStorage[item] = JSON.stringify([]);
            }

            isWorkChat = !isWorkChat;
        });
    }, []);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.toggleChatBlock}>
                <button onClick={() => setIsWorkChat(true)} className={isWorkChat ? 'button-desabled' : ''}>
                    Рабочий чат
                </button>
                <button onClick={() => setIsWorkChat(false)} className={!isWorkChat ? 'button-desabled' : ''}>
                    Общий чат
                </button>
                <Logo className={styles.logo} />
            </div>
            <div className={styles.messagesBlock}>
                <ul className={styles.messageList}>
                    <GenericList list={isWorkChat ? getMessagesList(workMessages) : getMessagesList(otherMessages)} />
                </ul>
                <MessageWrittingForm
                    addMessage={(text: string) => changeMessages(addMessage(createMessage(text)))}
                    value=""
                    className={styles.form}
                    buttonText="Отправить"
                />
            </div>
        </div>
    );
}
