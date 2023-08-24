/*const fetch = require('node-fetch');
const webhookUrl = "https://discord.com/api/webhooks/1144258419226849330/0qSojNj_auhLBBXBCNY75eAJigvewa_Hyep9fU0q0yXyMGym2QR-XPfdo6fGMzyhvOMD";

// Функция для отправки HTTP POST запроса
function sendWebhookMessage(message) {
    const webhookURL = "YOUR_DISCORD_WEBHOOK_URL";
    const payload = {
        content: message,
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (response.ok) {
                console.log("Сообщение успешно отправлено на Discord!");
            } else {
                console.error("Ошибка при отправке сообщения на Discord:", response.statusText);
            }
        })
        .catch(error => {
            console.error("Произошла ошибка:", error);
        });
}

module.exports =
    {
        send: function (msg) {
            sendWebhookMessage(msg);
        }
    };
*/