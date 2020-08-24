import React from 'react';
import { IMessage } from '../../data/messages';
import styles from './message.css';
import { MessageWrittingForm } from '../MessageWrittingForm';

interface IMessageProps {
    message: IMessage;
    filterMessages: () => void;
    changeComment: (text: string) => void;
}

export function Message({ message, filterMessages, changeComment }: IMessageProps) {
    const [ forEditing, setForEditing ] = React.useState(''); 
    const { author, text, date } = message;

    const createMarkup = (item: string) => {
        return {__html: item};
    };

    return (
        <>
            <div className={styles.messageTopBlock}>
                <p>{author}</p>
                <p className={styles.date}>{date}</p>
                <div className={styles.buttonsBlock}>
                    <button onClick={() => forEditing ? setForEditing('') : setForEditing(text)}>
                        &#x270e;
                    </button>
                    <button onClick={filterMessages}>
                        &#215;
                    </button>
                </div>
            </div>
            {forEditing 
                ? <MessageWrittingForm
                      value={forEditing}
                      setValue={() => setForEditing('')}
                      addMessage={changeComment}
                      className={styles.form}
                      buttonText="Изменить"
                  />
                : <p dangerouslySetInnerHTML={createMarkup(text)} className={styles.messageText}></p>
            }
        </>
    );
}
