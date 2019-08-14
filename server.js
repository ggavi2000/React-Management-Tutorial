// mySQL DB연동 추가
const fs = require('fs');  // 파일에 접근할 수 있는 라이브러리

// 서버 연동
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;  // 5000포트

app.use(bodyParser.json());  // json을 통해 데이터 주고 받음
app.use(bodyParser.urlencoded({ extended: true }));

// mySQL DB 연동 구간
const data = fs.readFileSync('./database.json');  // DB 아이디, DB 비밀번호 등을 적어둔 문서
const conf = JSON.parse(data);
const mysql = require('mysql');
//const mysql = require('mariadb/callback');

// 내부적으로 속성값을 입력받아서 실제로 mySQL에 연결
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

// api 내용: 서버에 접속하는 사용자(클라이언트) 입장에서 api 경로로 접속하면 메시지를 사용자에게 출력
// (서버 켠 뒤, http://localhost:5000/api/customers 경로로 확인해야 함)

// 클라이언트가 저 경로로 접속하면 고객 정보가 있는 배열 데이터를 json 형식으로 반환
// * 유효한 데이터인지 확인 가능한 사이트: https://jsonlint.com/
app.get('/api/customers', (req, res) => {

    // 사용자가 [/api/customers]에 접속한 경우: 데이터베이스에 접근해서 쿼리를 날리도록 설정
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

// 따옴표('')가 아니라 숫자 1 옆의 ``를 넣어줘야 동작함
app.listen(port, () => console.log(`현재 동작중인 서버: ${port}`));
