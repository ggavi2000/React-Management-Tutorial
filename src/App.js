import React from 'react';
import logo from './logo.svg';
import './App.css';

// 추가한 녀석들
import Customer from './components/Customer'

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

function App() {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer
              key={c.id}  // map을 사용할 때, key가 있어야 한다.
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          );
        })
      }
    </div>
  );
}

export default App;
