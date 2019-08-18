import React from 'react';

class CustomerDelete extends React.Component {

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
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}> 삭제 </button>
        )
    }
}

export default CustomerDelete;