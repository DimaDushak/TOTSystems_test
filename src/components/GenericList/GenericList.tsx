import React from 'react';

interface IHtml {
    __html: string;
}

export interface IGenericListItem {
    As?: 'li';
    id: string;
    content?: string | React.ReactNode;
    onClick?: () => void;
    className?: string;
    dangerouslySetInnerHTML?: IHtml;
}

interface IGenericListProps {
    list: IGenericListItem[];
}

const NOOP = () => {};

export function GenericList({ list }: IGenericListProps) {
    return (
        <>
            {list.map(({ As = 'li', onClick = NOOP, id, content, className, dangerouslySetInnerHTML }) => (
                <As
                    key={id}
                    onClick={onClick}
                    className={className}
                    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
                >{content}</As>
            ))}
        </>
    );
}
