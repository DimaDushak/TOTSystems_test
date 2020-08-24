import React from 'react';
import styles from './dropdown.css';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

export function Dropdown({ button, children }: IDropdownProps) {
    const [ isDropdownOpen, setIsDropdownOpen ] = React.useState(false);

    return (
        <>
            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {button}
            </div>
            {isDropdownOpen && (
                <div className={styles.listContainer}>
                    <ul
                        className={styles.list}
                    >
                        {children}
                    </ul>
                </div>
            )}
        </>
    );
}
