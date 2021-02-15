const { Telegraf } = require('telegraf')
const { calculateText } = require('./calculateText')
const bot = new Telegraf('<my bot key>')

//test amaçlı kontrol ediyorum
console.log(calculateText("hel(***+-*3)*lo+-+-+-+**9*9+*-*2/2+/*/-/*+82--1**23+3-++4*+*+*"));

//bot basladiginda burasi calisiyor
bot.start((ctx) => {
    ctx.reply('bot aktif yardım için /help yazabilirsin')
})

bot.hears('niye', (ctx) => {
    ctx.reply(`asıl amacım borsadaki sinyalleri söyleyen bir borsa botunu dinlemekti ama telegramdaki botlar birbirlerinin mesajlarını okuyamadıkları için yarıda kaldım sahibimde beni işsiz bırakmamak için öylesine bu programı yazdı :'(`)
})
bot.help((ctx) => {
    ctx.reply(`Hey Merhaba!\nBen basit bir hesap makinesi botuyum ismim de ${ctx.botInfo.first_name}\n
    ne yapıyorum dersen beni yazanın aklına ne yapsam diye bir fikir gelmediği için şuan hesap makinesi görevi görüyorum :)\n
    yazdğın textin içinden eğer bir hesaplamalık bir işlem koyduysan onu hesaplayıp geri döndürürüm`)
})
bot.on('message', function(msg) {
    console.log('=');
    let message = msg.message.text
    if (message.includes('+') || message.includes('-') || message.includes('/') || message.includes('*')) {
        msg.reply(`Merhaba ${msg.message.from.first_name} ${msg.message.from.last_name} \n isleminin cevabi: ${calculateText(message)}`)
    }
});

bot.launch()