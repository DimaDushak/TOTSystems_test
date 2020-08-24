import React from 'react';
import classNames from 'classnames';
import { logins, passwords } from '../../data/logins&passwords';
import styles from './authform.css';

interface IAuthFormProps {
    setUserName: (userName: string) => void;
}

export function AuthForm({ setUserName }: IAuthFormProps) {
    const [ state, setState ] = React.useState({
        login: logins[0],
        password: passwords[0]
    });
    const [ error, setError ] = React.useState(false);
    const { login, password } = state;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const name = target.name;
        const value = target.value;

        setState({
            ...state,
            [name]: value
        });
    };

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (logins.includes(login) && passwords.includes(password)) {
            setUserName(login);
        } else {
            setError(true);
        }
    };

    const input = classNames(
        styles.input,
        { [styles.redBorder]: error }
    );

    return (
        <div className={styles.container}>
            <form className={styles.authForm} onSubmit={onSubmit}>
                <h2 className={styles.heading}>
                    Авторизация
                </h2>
                <br />
                <label className={styles.formItem}>
                    Логин:
                    <input
                        name="login"
                        value={login}
                        onChange={onChange}
                        className={input}
                    />
                </label>
                <br />
                <label className={styles.formItem}>
                    Пароль:
                    <input
                        name="password"
                        value={password}
                        type="password"
                        onChange={onChange}
                        className={input}
                    />
                </label>
                <br />
                {error && (
                    <>
                        <p className={styles.errorDescription}>
                            Неверный логин или пароль
                        </p>
                        <br />
                    </>
                )}
                <button className={styles.submitButton}>
                    Войти
                </button>
            </form>
        </div>
    );
}
