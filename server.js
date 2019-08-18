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


// DB 설정이 완료된 이후: multer 객체 생성
// 고객의 프로필 사진도 받아야 하므로 파일처리를 위해 별도의 라이브러리를 받아야 함
// npm install --save multer
const multer = require('multer');
const upload = multer({dest: './upload'})  // 이 서버의 기존 루트폴더에 있는 업로드 폴더를 사용자의 파일이 업로드되는 공간으로 설정



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

// 업로드라는 이름의 폴더를 사용자가 실제로 접근해서 프로필 이미지를 확인할 수 있도록 한다.
app.use('/image', express.static('./upload'));  // 사용자 입장: 이미지란 이름의 경로로 접근을 하는데 그게 바로 실제 서버의 업로드 폴더와 매핑이 됨
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;  // multer 라이브러리가 자동으로 안 겹치는 이름으로 설정해줌
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;

    console.log("받은 name: " + name);
    console.log("받은 image: " + image);
    console.log("받은 birthday: " + birthday);
    console.log("받은 gender: " + gender);
    console.log("받은 job: " + job);
    
    let params = [image, name, birthday, gender, job];  // 실제로 DB에 값을 넣을때 각각의 ?에 해당되는 값이 데이터가 바인딩되서 들어감
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log("DB 연동 에러 발생시: " + err);           
            console.log("들어간 값: " + rows);
        }
    );
});


// 따옴표('')가 아니라 숫자 1 옆의 ``를 넣어줘야 동작함
app.listen(port, () => console.log(`현재 동작중인 서버: ${port}`));
