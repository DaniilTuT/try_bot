const TelegramApi = require('node-telegram-bot-api')
const {gameOption, againOption} = require('./options')
const token = '5773530727:AAEMjsFfXbyw0pIXkcPQsHWFR-AqTvMsDmA'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 1 до 9, а ты должен будешь ее угадать');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}
const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное  приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра Угадай Число'},
    ])


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
            return bot.sendMessage(chatId, 'Добро пожаловать')
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.chat.first_name}  ${msg.chat.last_name}`)
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Моя твоя не понимать')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю ты отгадал цифру ${chats[chatId]}`,againOptions)
        } else {
            return bot.sendMessage(chatId, `Бот загадал цифру ${chats[chatId]}`,againOptions)
        }
            })
}


start()