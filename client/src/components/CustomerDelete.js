import React from 'react';

// 예제: https://material-ui.com/components/dialogs/
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component {

    // 생성자 명시해서 state값 초기화
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }


    // 열기 창을 눌렀다면
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    // 반대로, 닫기 창을 눌렀다면
    handleClose = () => {
        this.setState({
            open: false
        })   
    }


    // 고객의 id가 들어왔을 때 삭제를 진행
    deleteCustomer(id) {
        const url = 'api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}> 삭제 </Button>
                
                {/* Dialog는 어떤 상태일 때 열려있는지 확인하기 위해 open 속성을 넣어야 한다. */}
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}> 삭제 </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}> 닫기 </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;