const express = require('express');
const axios = require('axios');
const app = express();

app.get('/callback', async (req, res) => {
    const code = req.query.code; // Получите код авторизации
    const state = req.query.state; // Получите состояние

    // Обмен кода на токен доступа
    try {
        const response = await axios.post('https://oauth.pipedrive.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: 'f63d75e50dc0cbb2', 
                client_secret: '7ddd79a6140a2653bfebfbd457d5d3ac7f17fe6a', 
                redirect_uri: 'https://vercel.com/kates-projects-de02f52f/pipedrive-crm-integration', // Замените на ваш Callback URL
                code: code
            }
        });

        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);
        
        // Сохраните токен или используйте его для последующих запросов к API Pipedrive

        // Перенаправьте пользователя на вашу главную страницу или покажите сообщение об успехе
        res.redirect('https://vercel.com/kates-projects-de02f52f/pipedrive-crm-integration'); // Замените на нужный вам URL
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).send('Error during authentication.');
    }
});
