import React from 'react';
import ReacrDOM from 'react-dom';

export default class ContactInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  /*
  최초 렌더링이 일어나기 직전
  */
  componentWillMount () {

  };

  /*
  최초 렌더링이 일어난 다음 호출
  */
  componentDidMount() {
    console.log('this.props in ComtiactInfo', this.props);
  };
  /*
  업데이트 시
  */
  componentWillReceiveProps (nextProps) {

  };
  /*
  업데이트 시
  */
  shouldComponentUpdate(nextProps, nextState) {
    console.log('this.props in contactInfo', this.props);
    console.log('nextProps in contactInfo', nextProps);
  return this.props !== nextProps;
  };
  /*
  업데이트 시
  */
  componentWillUpdate (nextProps, nextState) {

  };
  /*
  업데이트 시
  */
  componentDidUpdate (prevProps, prevState) {

  };
  /*
  DOM에서 마운트 해제되기 직전
  */
  componentWillUnmount () {
    console.log('ContactInfo will Unmount..!');
  };
    render() {
        return (
            <div onClick={this.props.onClick}>{this.props.contact.name} {this.props.contact.phone} {this.props.keyword}</div>
        );
    }
}
