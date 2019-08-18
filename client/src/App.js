import React, { Component } from 'react';
import './App.css';

// 추가한 녀석들
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

// material-ui
import Paper from '@material-ui/core/Paper';  // 컴포넌트 외부를 감싸기 위해 사용하는 컴포넌트 중 하나
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// 가로 스크롤바 (root 클래스: 너비 100%, 위쪽으로 여백을 3의 가중치만큼 주고, x축으로 overflow 발생시키기)
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2  // margin을 준다
  }
})



class App extends Component {

  // // state: 서버로부터 고객 정보를 받아와야 하므로 데이터는 항상 변할 수 있다.
  // state = {
  //   customers: "",
  //   completed: 0  // 로딩바가 0%부터 100%까지 올라가도록 하기 위해
  // }

  // 위에꺼 제거하고 생성자를 통해 다시 만듬
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  // state 초기화
  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });

    // ↓ 고객 목록을 새롭게 다시 불러와야 하므로 고객 데이터를 불러오는 부분을 그대로 복사해서 다시 넣어줬음
    this.callApi()     // callApi 함수로부터 고객 목록 데이터를 받아가지고 state에 넣어준다.
      .then(res => this.setState({ customers: res }))   // callApi 함수가 리턴한 body라는 변수를 res로 받는다.
      .catch(err => console.log(err));                // 오류가 발생한 경우
  }

  // [서버 연동]
  // Api 서버에 접근해서 데이터 받아오는 곳.
  // 리액트의 컴포넌트는 라이브러리이므로 생명주기가 존재한다.
  // 모든 컴포넌트가 마운트가 끝날 때 실행
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);  // 로딩바: 0.02초마다 1번씩 progress 함수 실행
    this.callApi()     // callApi 함수로부터 고객 목록 데이터를 받아가지고 state에 넣어준다.
      .then(res => this.setState({ customers: res }))   // callApi 함수가 리턴한 body라는 변수를 res로 받는다.
      .catch(err => console.log(err));                // 오류가 발생한 경우
  }

  // 비동기적 어떠한 내용을 수행
  callApi = async () => {
    const response = await fetch('/api/customers');  // 접속하고자 하는 api의 주소를 넣음 (테스트: 로컬호스트의 api/customers에 접근)
    const body = await response.json();  // 고객 목록이 json 형태로 출력되면 body라는 변수에 넣어준다.
    return body;  // 고객 목록 데이터를 전달
  }

  // 로딩바
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 })  // 100% 되면 다시 0으로
  }

  ///////////////////
  // ↑ 서버 연동 끝 //
  ///////////////////


  render() {
    const { classes } = this.props;

    return (
      // 1. 값 목록이 출력되는 테이블 아래
      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell> 번호 </TableCell>
              <TableCell> 이미지 </TableCell>
              <TableCell> 이름 </TableCell>
              <TableCell> 생년월일 </TableCell>
              <TableCell> 성별 </TableCell>
              <TableCell> 직업 </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.state.customers ? 
              this.state.customers.map(c => {
                // console.log("로그: " + c.image);
                
                return <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
              }) :
              // 로딩바 실행
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
          </TableBody>    
        </Table>
      </Paper>

      {/* 2. 값 추가 양식: CustomerAdd를 화면에 출력할 때,
      props 값으로 stateRefresh 함수 자체를 props 형태로 보내준다. */}
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>     
    );
  }
}

export default withStyles(styles)(App);