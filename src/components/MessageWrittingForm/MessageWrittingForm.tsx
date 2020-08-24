import React from 'react';
import classNames from 'classnames';
import { Dropdown } from '../Dropdown';
import { GenericList } from '../GenericList';
import { emoticons } from '../../data/emoticons';
import { generateRandomString } from '../../utils';
import styles from './messagewrittingform.css';

interface IMessageWrittingFormProps {
    addMessage: (text: string) => void;
    value: string;
    setValue?: (text: string) => void;
    className?: string;
    buttonText: string;
}

export function MessageWrittingForm(props: IMessageWrittingFormProps) {
    const { addMessage, value, setValue = () => {}, className, buttonText } = props;
    const [ textareaValue, setTextAreaValue ] = React.useState(value);
    const formStyle = classNames(className, styles.form);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        addMessage(textareaValue);
        setTextAreaValue('');
        setValue('');
    };

    const createMarkup = (item: string) => {
        return {__html: item};
    };

    const getEmoticonList = (arr: string[]) => {
        return arr.map(item => ({
            id: generateRandomString(),
            className: styles.emoticon,
            onClick: () => setTextAreaValue(textareaValue + item),
            dangerouslySetInnerHTML: createMarkup(item)
        }));
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={formStyle}>
            <textarea
                className={styles.writtingField}
                name="textareaValue"
                value={textareaValue}
                onChange={(e) => setTextAreaValue(e.currentTarget.value)}
                placeholder="Напишите сообщение"
                rows={1}
                required
            />
            <Dropdown
                button={<button type="button" className={styles.openListButton}>&#128512;</button>}
            >
                <GenericList list={getEmoticonList(emoticons)} />
            </Dropdown>
            <button type="submit" className={styles.submitButton}>
                {buttonText}
            </button>
        </form>
    );
}
