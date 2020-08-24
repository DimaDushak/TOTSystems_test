export const generateRandomString = () => Math.random().toString(36).substring(2, 15);

export const getDate = () => {
    const now = new Date();
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}г. ${now.getHours()}:${now.getMinutes()}`;
};
