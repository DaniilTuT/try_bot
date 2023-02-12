const TelegramApi = require('node-telegram-bot-api')
const token = '5773530727:AAEMjsFfXbyw0pIXkcPQsHWFR-AqTvMsDmA'

const bot = new TelegramApi(token, {polling: true})

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

let correctAnswers;

let lastTasks = [-1]

const tasks = [
    {
        question: 'Кто разработал первый работающий печатный станок?',
        ans1: ["Альберт Эйнштейн", false],
        ans2: ["Иоганн Гутенберг", true],
        ans3: ["Исаак Ньютон", false],
        ans4: ["Галилео Галилей", false],
    },
    {
        question: 'Какой континент покрыт льдом?',
        ans1: ["Африка", false],
        ans2: ["Азия", false],
        ans3: ["Северная Америка", false],
        ans4: ["Антарктида", true],
    },
    {
        question: '«Бёф бургиньон» (говядина по-бургундски) — тушеное мясо, приготовленное из тушеной говядины в_____.',
        ans1: ["Красном вине", true],
        ans2: ["Белом вине", false],
        ans3: ["Ржаном виски", false],
        ans4: ["Бурбоне", false],
    },
    {
        question: 'Кто был первым человеком, который ступил на Луну?',
        ans1: ["Джон Гленн", false],
        ans2: ["Юрий Гагарин", false],
        ans3: ["Нил Армстронг", true],
        ans4: ["Алан Шепард", false],
    },
    {
        question: 'Кого называли «Дуче» его последователи? Титул от лат. dux («лидер, вождь»)',
        ans1: ["Итало Бальбо", false],
        ans2: ["Иосиф Сталин", false],
        ans3: ["Бенито Муссолини", true],
        ans4: ["Адольф Гитлер", false],
    },
    {
        question: 'Кто написал «Старик и море»?',
        ans1: ["Ф. Скотт Фицджеральд", false],
        ans2: ["Марк Твен", false],
        ans3: ["Эрнест Хемингуэй", true],
        ans4: ["Сэлинджер", false],
    },
    {
        question: 'Какой из этих городов находится севернее?',
        ans1: ["Лондон, Англия", false],
        ans2: ["Стокгольм, Швеция", true],
        ans3: ["Париж, Франция", false],
        ans4: ["Милан, Италия", false],
    },
    {
        question: 'Джон Ф. Кеннеди был убит в:',
        ans1: ["1953", false],
        ans2: ["1963", true],
        ans3: ["1973", false],
        ans4: ["1983", false],
    },
    {
        question: 'Столица Австрии?',
        ans1: ["Минск", false],
        ans2: ["Брюссель", false],
        ans3: ["Вена", true],
        ans4: ["Прага", false],
    },
    {
        question: 'Каким видом спорта известен Андре Агасси?',
        ans1: ["Теннис", true],
        ans2: ["Крикет", false],
        ans3: ["Бейсбол", false],
        ans4: ["Футбол", false],
    },
    {
        question: 'Какая молодая девушка помогла изгнать англичан с французской земли в 15 веке?',
        ans1: ["Елизавета II", false],
        ans2: ["Хелен Келлер", false],
        ans3: ["Жанна д’Арк", true],
        ans4: ["Мария Королева Шотландии", false],
    },
    {
        question: 'От чьего лица ведется рассказ в «Великом Гэтсби»?',
        ans1: ["Том Бьюкенен", false],
        ans2: ["Ник Каррауэй", true],
        ans3: ["Джей Гэтсби", false],
        ans4: ["Джордан Бейкер", false],
    },
    {
        question: 'Как Ромео совершает самоубийство?',
        ans1: ["Мечом", false],
        ans2: ["Кинжалом", false],
        ans3: ["Ядом", true],
        ans4: ["Ножом", false],
    },
    {
        question: 'Кто написал «Убить Пересмешника»?',
        ans1: ["Тони Моррисон", false],
        ans2: ["Ф. Скотт Фицджеральд", false],
        ans3: ["Харпер Ли", true],
        ans4: ["Марк Твен", false],
    },
    {
        question: 'Джакарта является столицей какой страны?',
        ans1: ["Индия", false],
        ans2: ["Венесуэла", false],
        ans3: ["Индонезия", true],
        ans4: ["Джакарта", false],
    },
    {
        question: 'Пабло Пикассо был:',
        ans1: ["Бразильцем", false],
        ans2: ["Французом", false],
        ans3: ["Итальянцем", false],
        ans4: ["Испанцем", true],
    },
]

let count = Number;

const getResult = (chatId) => {
    let result;
    correctAnswers > 0 ? result = correctAnswers / 5 * 100 : result = 0;
    return bot.sendMessage(chatId, `Ваш результат ${Math.floor(result)}%`, {
        reply_markup: JSON.stringify({
            keyboard: [[{text: "Давай по новой", callback_data: '/startTest'}]],
            resize_keyboard:true
        })
    })
}

const getRandomTask = (count) => {
    console.log(lastTasks)
    let newTaskIndex = randomInteger(0, tasks.length - 1);
    lastTasks.includes(newTaskIndex) ? getRandomTask(count) : lastTasks[count] = newTaskIndex
    return tasks[lastTasks[count]]
}

const startTest = async (chatId, test) => {
    let questOptions = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: test.ans1[0], callback_data: [String(test.ans1[1]), 0].join(' ')}],
                [{text: test.ans2[0], callback_data: [String(test.ans2[1]), 1].join(' ')}],
                [{text: test.ans3[0], callback_data: [String(test.ans3[1]), 2].join(' ')}],
                [{text: test.ans4[0], callback_data: [String(test.ans4[1]), 3].join(' ')}],
            ]
        })
    }

    return bot.sendMessage(chatId, test.question, questOptions)
}
const start = () => {

    bot.setMyCommands([
        {command: '/start', description: 'Начни все с начала'},
        {command: '/startTest', description: 'Начинаем тест'},
    ])

    bot.on('message', async msg => {

        const text = msg.text;

        const chatId = msg.chat.id;

        if (text === "/start") {
            return bot.sendMessage(chatId, 'Давай проверим твою эрудицию\n Чтобы начать пиши /starttest')
        }

        if (text === "/starttest" || text==="Давай по новой") {
            count = 1;
            correctAnswers = 0;
            uncorrectAnswers = 0;
            lastTasks = [-1]
            return startTest(chatId, getRandomTask(count))
        }


        return bot.sendMessage(chatId, 'Моя твоя не понимать')
    })


    bot.on('callback_query', async msg => {
        const data = msg.data;
        // const inlineMId = msg.message.i
        const mText = msg.message.text
        const messageId = msg.message.message_id
        const option = msg.message.reply_markup
        const chatId = msg.message.chat.id;

        if (data.split(' ')[0] === 'true' && count <= 6) {
            count++
            correctAnswers++
            const editedOptions = option;
            editedOptions.inline_keyboard[data.split(' ')[1]] = [{text: '✅', callback_data: 'jj'},]
            bot.editMessageReplyMarkup(
                editedOptions,
                {
                    chat_id: chatId,
                    message_id: messageId
                })
            //bot.deleteMessage(chatId,messageId)
            // await bot.sendMessage(chatId, `${mText}`, {
            //     reply_markup: JSON.stringify({
            //         inline_keyboard: [
            //             [{text: `${editedOptions.inline_keyboard[0][0].text}`, callback_data: 'dd'}],
            //             [{text: `${editedOptions.inline_keyboard[1][0].text}`, callback_data: 'df'}],
            //             [{text: `${editedOptions.inline_keyboard[2][0].text}`, callback_data: 'dg'}],
            //             [{text: `${editedOptions.inline_keyboard[3][0].text}`, callback_data: 'dh'}]],
            //     })
            // })
            if (count <= 5) {
                return startTest(chatId, getRandomTask(count))
            } else {
                return getResult(chatId)
            }
        }
        if (data.split(' ')[0] === 'false' && count <= 6) {
            count++
            const editedOptions = option;
            editedOptions.inline_keyboard[data.split(' ')[1]] = [{text: '❌', callback_data: 'jj'},]
            bot.editMessageReplyMarkup(
                editedOptions,
                {
                    chat_id: chatId,
                    message_id: messageId
                })
            if (count <= 5) {
                return startTest(chatId, getRandomTask(count))
            } else {
                return getResult(chatId)
            }
        }
        if (count === 5) {

        }

        if (data === "/startTest") {
            count = 1;
            lastTasks = [];
            correctAnswers = 0;
            return startTest(chatId, getRandomTask(count))
        }
    })
}
start()