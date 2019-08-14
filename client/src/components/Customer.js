import React from 'react'

// 추가
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


// 클래스 정의: React의 컴포넌트 형태로 작성 (컴포넌트: 라이브러리이자 클래스)
class Customer extends React.Component {
    
    // render()는 항상 수행되는 내용
    render() {
        return (
            <TableRow>
                <TableCell> {this.props.id} </TableCell>
                <TableCell> <img src={this.props.image} alt="profile"/> </TableCell>
                <TableCell> {this.props.name} </TableCell>
                <TableCell> {this.props.birthday} </TableCell>
                <TableCell> {this.props.gender} </TableCell>
                <TableCell> {this.props.job} </TableCell>
            </TableRow>
        )
    }
}

export default Customer;