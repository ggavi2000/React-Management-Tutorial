const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;  // 5000포트

app.use(bodyParser.json());  // json을 통해 데이터 주고 받음
app.use(bodyParser.urlencoded({ extended: true }));

// api 내용: 서버에 접속하는 사용자(클라이언트) 입장에서 api 경로로 접속하면 메시지를 사용자에게 출력
// (서버 켠 뒤, http://localhost:5000/api/customers 경로로 확인해야 함)

// 클라이언트가 저 경로로 접속하면 고객 정보가 있는 배열 데이터를 json 형식으로 반환
// * 유효한 데이터인지 확인 가능한 사이트: https://jsonlint.com/
app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '이름1',
            'birthday': '생일1',
            'gender': '성별1',
            'job': '직업1'
        },

        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '이름2',
            'birthday': '생일2',
            'gender': '성별2',
            'job': '직업2'
        },

        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이름3',
            'birthday': '생일3',
            'gender': '성별3',
            'job': '직업3'
        }
    ]);
});

// 따옴표('')가 아니라 숫자 1 옆의 ``를 넣어줘야 동작함
app.listen(port, () => console.log(`현재 동작중인 서버: ${port}`));
