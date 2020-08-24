import { generateRandomString } from '../utils';

export interface IMessage {
    id: string;
    author: string;
    text: string;
    date: string;
}

export const initialWorkMessages: IMessage[] = [
    {
        id: generateRandomString(),
        author: 'Елена Минина',
        text: 'Доброе утро, коллеги! Кто сможет выйти на подработки в выходные дни?',
        date: '12 сентября 2019г. 9:30'
    },
    {
        id: generateRandomString(),
        author: 'Иван Беспалов',
        text: 'К сожалению, в эти выходные у меня не получится',
        date: '12 сентября 2019г. 10:45'
    },
    {
        id: generateRandomString(),
        author: 'Екатерина Вольнова',
        text: 'Доброе утро. Я смогу в субботу и в воскресенье',
        date: '12 сентября 2019г. 11:32'
    }
];

export const initialOtherMessages: IMessage[] = [
    {
        id: generateRandomString(),
        author: 'Иван Беспалов',
        text: 'Кто в эти выходные поедет ко мне на дачу?',
        date: '10 сентября 2019г. 9:39'
    },
    {
        id: generateRandomString(),
        author: 'Екатерина Вольнова',
        text: 'Я не смогу. Все выходные буду работать',
        date: '11 сентября 2019г. 10:45'
    },
    {
        id: generateRandomString(),
        author: 'Иван Беспалов',
        text: 'Ну ты подумай хорошенько! Будет весело',
        date: '11 сентября 2019г. 11:32'
    }
];


