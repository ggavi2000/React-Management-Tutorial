import React from 'react'

// 클래스 정의: React의 컴포넌트 형태로 작성 (컴포넌트: 라이브러리이자 클래스)
class Customer extends React.Component {
    
    // render()는 항상 수행되는 내용
    render() {
        return (
            <div>
                <CustomerProfile 
                id = {this.props.id} 
                image={this.props.image} 
                name={this.props.name} />

                <CustomerInfo
                birthday={this.props.birthday}
                gender={this.props.gender}
                job={this.props.job} />
            </div>
        );
    }
}

// 사용자의 프로필 이미지
class CustomerProfile extends React.Component {
    render() {
        return (
            <div>
                <img src = {this.props.image} alt="profile" />
                <h2> {this.props.name} ({this.props.id}) </h2>
            </div>
        )
    }
}

// 사용자의 정보
class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p> {this.props.birthday} </p>
                <p> {this.props.gender} </p>
                <p> {this.props.job} </p>
            </div> 
        )
    }
}

export default Customer;