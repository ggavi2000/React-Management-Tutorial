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


const customers = [
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
  },
]


class App extends Component {
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
            { customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> ); }) }
          </TableBody>
        </Table>

      </Paper>
    );
  }
}

export default withStyles(styles)(App);