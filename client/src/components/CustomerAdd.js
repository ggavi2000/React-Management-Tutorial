// axios 설치 
// cd client 이걸로 이동
// npm install --save axios 해서 설치

import React from 'react';
import { post } from 'axios';

// 예제: https://material-ui.com/components/dialogs/
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {

    // 생성자
    constructor(props) {
        super(props);
        // 사용자의 프로필 이미지를 파일 형태로 보내야 하므로 일단 null로 지정
        this.state = {
            // file: 바이트 형태의 데이터, fileName: 보내고자 하는 파일 이미지의 이름 (파일명)
            file: null,
            userName: "",
            birthday: "",
            gender: "",
            job: "",
            fileName: "",
            open: false // 현재 다이얼로그 창이 열려 있나?
        }
    }



    // 이벤트를 받는다.
    handleFormSubmit = (e) => {
        e.preventDefault()  // 데이터가 서버로 전달될 때 오류가 발생하지 않도록 하나의 함수를 불러온다.
        this.addCustomer()
            .then((response) => {
                console.log(response.data);  // 건너온 데이터를 콘솔창에 출력
                
                // 서버로 고객을 추가한 뒤 -> 응답을 받은 다음 -> refresh 수행시킴
                this.props.stateRefresh();  // props 형태로 전달받은 stateRefresh() 함수를 수행한다.
            })

        // 서버로 고객 추가 데이터를 전송한 이후: 다시 초기화
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false  // 서버로 값을 전달한 뒤 창을 끄기 위해 false로 지정
        })        
        this.props.stateRefresh();  // props 형태로 전달받은 stateRefresh() 함수를 수행한다.
        // 간단한 테스트용 : 화면을 새로고침해서 고객 데이터를 받아올 수 있도록 한다
        // window.location.reload();
    }

    // 텍스트 값이 변경되었을 때 호출
    handleFileChange = (e) => {
        this.setState({  // 우리의 state에 있는 값을 변경한다
            // e.target: 이벤트가 발생한 input값 자체 (거기에서 file값을 설정)
            file: e.target.files[0],  // 첫번째 값: 웹사이트에서 파일을 업로드할때 여러 파일을 한꺼번에 업로드할 경우 첫번째 파일만 받을 생각이라서 [0]번째 인덱스
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        
        // 예: 만약 우리가 이름 값을 바꾸면 그 이름 값의 name은 userName이므로 userName이라는 state에 실제로 반영한다는 것
        nextState[e.target.name] = e.target.value;

        // 값 갱신
        this.setState(nextState);
    }

    // FormData라는 객체를 이용해서 실제로 특정한 데이터를 서버에 보낼 수 있도록 한다.
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        // 파일이 포함되어 있는 데이터를 서버로 전송할 경우: 웹 표준에 맞는 헤더를 추가해줘야 한다.
        const config = {
            headers: {
                // "내가 지금 보내고자 하는 데이터는 multipart/form-data이다"
                'content-type': 'multipart/form-data'  // 전달하고자 하는 데이터에 파일이 포함된 경우 설정하는 데이터
            }
        }
        return post(url, formData, config);
    }
    

    // 사용자가 고객추가 버튼을 눌러서 추가 모달 팝업창이 뜨도록 한다.
    // (그리고 = () => 형태는 자동으로 바인딩 처리가 된다고 함)
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    // 반대로, 닫기 창을 눌렀다면
    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })   
    }

    // 값 추가 양식을 어떤식으로 보여줄지 정해준다.
    render() {
        // 디자인 입히기
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    값 추가 버튼
                </Button>

                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle> 고객 추가 </DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /> <br />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {/* 현재 어떤 파일도 선택이 안되어 있다면 프로필 이미지 선택, 그렇지 않다면 사용자 파일이름이 뜸 */}
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}                                
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /> <br />
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /> <br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /> <br />
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /> <br />
                    </DialogContent>

                    {/* 고객 데이터를 서버로 보내기 */}
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}> 추가 </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}> 닫기 </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

// 외부에서 사용될 수 있으므로
export default withStyles(styles)(CustomerAdd);