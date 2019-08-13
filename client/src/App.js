import React, { Component } from 'react';
import './App.css';

// 추가한 녀석들
import Customer from './components/Customer';

// material-ui
import Paper from '@material-ui/core/Paper';  // 컴포넌트 외부를 감싸기 위해 사용하는 컴포넌트 중 하나
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

// 가로 스크롤바 (root 클래스: 너비 100%, 위쪽으로 여백을 3의 가중치만큼 주고, x축으로 overflow 발생시키기)
const styles = theme => ( {
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth:1080
  }
})




class App extends Component {
  
  // state: 서버로부터 고객 정보를 받아와야 하므로 데이터는 항상 변할 수 있다.
  state = {
    customers: ""
  }

  // Api 서버에 접근해서 데이터 받아오는 곳.
  // 리액트의 컴포넌트는 라이브러리이므로 생명주기가 존재한다.
  // 모든 컴포넌트가 마운트가 끝날 때 실행
  componentDidMount() {
    this.callApi()

    // callApi 함수로부터 고객 목록 데이터를 받아가지고 state에 넣어준다.
    // callApi 함수가 리턴한 body라는 변수를 res로 받는다.
      .then(res => this.setState({customers: res}))

      // 오류가 발생한 경우
      .catch(err => console.log(err));
  }
  
  // 비동기적 어떠한 내용을 수행
  callApi = async() => {
    const response = await fetch('/api/customers');  // 접속하고자 하는 api의 주소를 넣음 (테스트: 로컬호스트의 api/customers에 접근)

    // 고객 목록이 json 형태로 출력되면 body라는 변수에 넣어준다.
    const body = await response.json();
    return body;  // 고객 목록 데이터를 전달
  }

  render() {
    const { classes } = this.props;

    return (
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
            {/* 만약 this.state.customers의 값이 존재하는 경우 실행, 아닐 경우 공백을 출력(서버가 데이터를 바로 못 받는 경우가 있으므로 예외처리를 해줌) */}
            { this.state.customers ? this.state.customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> ); 
            }) : ""}
          </TableBody>
        </Table>

      </Paper>
    );
  }
}

export default withStyles(styles)(App);