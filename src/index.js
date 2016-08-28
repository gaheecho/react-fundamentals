import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';//js 확장자 생략 가능

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);

// if(module.hot){
// 	module.hot.accept();//local state를 유지하지 않음.
// }