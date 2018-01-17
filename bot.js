const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const dotenv = require('dotenv').config()

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

const help = (message, match) => {
    let helpText ='Eu posso ajudar a matar seu tédio te dizendo as threads que estão bombando nos seus subreddits favoritos.\n' +
        'É só me mandar esse comando:\n' +
        '\n' +
        '/NadaPraFazer [+ Lista de subreddits separada por ponto-e-vírgula (;)]\n';

    bot.sendMessage(message.chat.id, helpText).then(() => {
        return console.log("/help enviado")
    })
};

const getHotThreads = (message, match) => {
    fetchURL('https://rddt-scraper-api.herokuapp.com/threads/hot?subreddits=' + match[1])
        .then((threads) => {
            let response = '';
            threads.forEach((thread) => {
                response = `<b>r/${thread.subreddit}</b> - <a href="${thread.link}">${thread.title}</a> \n\n`
                    + `<b>${thread.upvotes}</b> upvotes - <a href="${thread.permalink}">Comentários</a> \n`;
                bot.sendMessage(message.chat.id, response, {parse_mode: "HTML"}).then(() => {
                    return console.log('r/' + thread.subreddit + ': ' + thread.title);
                });
            });
        })
};

const fetchURL = (fetchURL) => {
    return new Promise((resolve, reject) => {
        return request.get(fetchURL, (error, response, body) => {
            resolve(JSON.parse(body));
        })
    })
};

bot.onText(/\/NadaPraFazer (.*)/, getHotThreads);
bot.onText(/\/start/, help);
bot.onText(/\/help/, help);