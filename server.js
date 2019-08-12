const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;  // 5000포트

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api 내용: 서버에 접속하는 사용자(클라이언트) 입장에서 api 경로의 hello로 접속하면
// 하나의 메시지를 사용자에게 출력 (서버 켠 뒤, http://localhost:5000/api/hello 경로로 확인해야 함)
app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
});

// 따옴표('')가 아니라 숫자 1 옆의 ``를 넣어줘야 동작함
app.listen(port, () => console.log(`현재 동작중인 서버: ${port}`));
