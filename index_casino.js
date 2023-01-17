const TelegramApi = require('node-telegram-bot-api')
const {stringify} = require("nodemon/lib/utils");
//const {gameOption, againOption} = require('./options')
//const {first,second,third} = require('./needs')
const token = '5773530727:AAEMjsFfXbyw0pIXkcPQsHWFR-AqTvMsDmA'

const bot = new TelegramApi(token, {polling: true})

const balance = {}

const cards = [
    [[2, 3, 74], 6, 1, "Шестёрка бубн"],
    [[4, 5, 75], 7, 1, "Семёрка бубн"],
    [[7, 6, 76], 8, 1, "Восьмёрка бубн"],
    [[9, 8, 77], 9, 1, "Девятка бубн"],
    [[11, 10, 78], 10, 1, "Десятка бубн"],
    [[13, 12, 79], 11, 1, "Валет бубн"],
    [[15, 14, 80], 12, 1, "Дама бубн"],
    [[81, 17, 16], 13, 1, "Король бубн"],
    [[19, 18, 82], 14, 1, "Туз бубн"],

    [[83, 21, 20], 6, 2, "Шестёрка черви"],
    [[23, 22, 84], 7, 2, "Семёрка черви"],
    [[85, 25, 24], 8, 2, "Восьмёрка черви"],
    [[86, 27, 26], 9, 2, "Девятка черви"],
    [[87, 29, 28], 10, 2, "Десятка черви"],
    [[88, 31, 30], 11, 2, "Валет черви"],
    [[89, 33, 32], 12, 2, "Дама черви"],
    [[90, 35, 34], 13, 2, "Король черви"],
    [[91, 37, 36], 14, 2, "Туз черви"],

    [[92, 38, 39], 6, 3, "Шестерка крести"],
    [[40, 41, 93], 7, 3, "Семёрка крести"],
    [[94, 42, 43], 8, 3, "Восьмёрка крести"],
    [[95, 44, 45], 9, 3, "Девятка крести"],
    [[96, 46, 47], 10, 3, "Десятка крести"],
    [[97, 48, 49], 11, 3, "Валет крести"],
    [[98, 50, 51], 12, 3, "Дама крести"],
    [[99, 52, 53], 13, 3, "Король крести"],
    [[100, 54, 55], 14, 3, "Туз крести"],

    [[101, 56, 57], 6, 4, "Шестёрка пики"],
    [[102, 58, 59], 7, 4, "Семёрка пики"],
    [[103, 60, 61], 8, 4, "Восьмёрка пики"],
    [[104, 62, 63], 9, 4, "Девятка пики"],
    [[105, 64, 65], 10, 4, "Десятка пики"],
    [[106, 66, 67], 11, 4, "Валет пики"],
    [[107, 68, 69], 12, 4, "Дама пики"],
    [[108, 70, 71], 13, 4, "Король пики"],
    [[109, 72, 73], 14, 4, "Туз пики"],

    [[1, 110], 1, 5, "Череп"],
    [[111], 0, 0, "Джекпот"],];

var ok = false;

const newCard = (Int) => {
    for (let key of cards) {
        if (key[0].includes(Int)) {
            return key
        }
    }
}
const randomKarta = async (chatId, stavka) => {
    console.log(balance);
    ok = false;
    console.log(stavka)
    var first = newCard(randomInteger(1, 111));
    var second = newCard(randomInteger(1, 111));
    var third = newCard(randomInteger(1, 111));

    const cardsOptions = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: first[3], callback_data: '1'},  ],
                [{text: second[3], callback_data: '2'},],
                [{text: third[3],callback_data: '3'}],
                [{text: 'Есчо одну ;) ?', callback_data: '/again'}]
            ]
        })
    };
    let count = 0;
    if (first[1] === second[1] && first[1] === third[1] && first[1] !== 0 && first[1] !== 1) {
        balance[chatId] = balance[chatId] + (stavka * 5) - stavka;
        count = stavka * 5 - stavka;
        console.log(balance[chatId]);
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
    if (first[1] === second[1] && first[1] === third[1] && first[1] !== 0 && first[1] !== 1 &&
        first[2] === second[2] && first[2] === third[2] && first[2] !== 0 && first[2] !== 5) {
        balance[chatId] = balance[chatId] + (stavka * 10) - stavka;
        count = stavka * 10 - stavka;
        console.log(balance[chatId]);
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
    if (first[2] === second[2] && first[2] === third[2] && first[2] !== 0 && first[2] !== 5 && first[1] !== second[1] ) {
        balance[chatId] = balance[chatId] + stavka * 2 - stavka;
        count = stavka * 2 - stavka;
        console.log(balance[chatId]);
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
    if (first[2] === second[2] && first[2] === third[2] && first[2] !== 0 && first[2] !== 5 && first[1] !== third[1] ) {
        balance[chatId] = balance[chatId] + stavka * 2 - stavka;
        count = stavka * 2 - stavka;
        console.log(balance[chatId]);
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
    if (first[2] === second[2] && first[2] === third[2] && first[2] !== 0 && first[2] !== 5 && second[1] !== third[1] ) {
        balance[chatId] = balance[chatId] + stavka * 2 - stavka;
        count = stavka * 2 - stavka;
        console.log(balance[chatId]);
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
    if (first[1] === second[1] - 1 && first[1] === third[1] - 2 && first[1] !== 0 && first[1] !== 1) {
        balance[chatId] = balance[chatId] + stavka * 3 - stavka;
        count = stavka * 3 - stavka;
        console.log(balance[chatId]);
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
    if (first[1] === second[1] && first[1] === third[1] && first[1] === 0) {
        balance[chatId] = balance[chatId] + stavka * 50 - stavka;
        count = stavka * 50 - stavka;
        console.log(balance[chatId]);
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
    if (first[1] === second[1] && first[1] === third[1] && first[1] === 1) {
        balance[chatId] = balance[chatId] + stavka * -10 - stavka;
        count = stavka * -10 - stavka;
        console.log(balance[chatId]);
        if (balance[chatId] <= 0) {
            balance[chatId] = 1000;
            return bot.sendMessage(chatId, `Ты был бы бомжом но у тебя ${balance[chatId]} монет! \n Пиши ставку и давай по новой`)
        }
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
    else {
    balance[chatId]=balance[chatId]-stavka;
    count=0-stavka
        if (count < 0) {  await bot.sendMessage(chatId, `вы проиграли ${-count} монет`, cardsOptions);}
        else {
            await bot.sendMessage(chatId, `вы выиграли ${count} монет`, cardsOptions);}
        ok = false;
        if (balance[chatId] <= 0) {
            balance[chatId] = 1000;
            return bot.sendMessage(chatId, `Ты был бы бомжом но у тебя ${balance[chatId]} монет! \n Пиши ставку и давай по новой`)
        }
        return bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    }
}


const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Напишите в чат количество монет которое вы хотите поставить');
    await bot.sendMessage(chatId, `Ваш баланс ${balance[chatId]}`);
    ok = true;
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
            await bot.sendMessage(chatId, 'Добро пожаловать в казино "Последняя Рубашка"!!!');
           await bot.sendMessage(chatId, 'Список команд: \n/start\n/info\n/game');
            balance[chatId] = 1000;
            return bot.sendMessage(chatId, 'Для начала сеанса напиши "Погнали"');
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Правила рулетки:\n 1)Делать только целые ставки \n 2)Это все...\n
            оплата комбинаций:\n
    1)лого автомата - х50\n
    2)одной масти - х2\n
    3)одного значения - х5\n
    4)по возрастанию - х3\n
    5)по убыванию - х3\n
    6)черепа - минус х10\n
    7)одного значения и масти - x10\n
`)
        }
        if (text === 'Погнали') {
            return startGame(chatId);
        }
        if (!isNaN(Number(text)) && ok && Number(text)>0 && balance[chatId]>0) {
            return randomKarta(chatId, Number(text));
        }
        // if (balance[chatId]<=0) {balance[chatId] = 100;
        //     return bot.sendMessage(chatId, `Ты был бы бомжом но у тебя ${balance[chatId]} монет! \n Пиши ставку и давай по новой`)
        // }
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
    })
}


start()