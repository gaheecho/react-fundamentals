import React from 'react';
import ContactInfo from './ContactInfo';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };

        this.handleChange = this.handleChange.bind(this)
    }

    /*
    컴포넌트 생성할 때 constructor -> componentWillMount -> render -> componentDidMount
    컴포넌트의 props가 변경될 때  componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
    state가 변경될 때 shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
    */

    /*
    최초 렌더링이 일어나기 직전
    */
    componentWillMount () {

    };

    /*
    최초 렌더링이 일어난 다음 호출
    */
    componentDidMount() {

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
      console.log('this.state', this.state);
      console.log('this.state.keyword', this.state.keyword);
      console.log('nextState', nextState);
      console.log('nextState.keyword', nextState.keyword);
    return this.state !== nextState;
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
    컴포넌트를 제거할 때는 componentWillUnmount만 실행됨.
    */
    componentWillUnmount () {
    };
    handleChange(e){
        this.setState({
            keyword: e.target.value
        })
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase()
                    .indexOf(this.state.keyword.toLowerCase()) > -1;
                    }
                );
            return data.map((contact, i) => {
                console.log(contact, i);
                return (<ContactInfo contact={contact} keyword = {this.state.keyword} key={i}/>);
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name = "keyword"
                    placeholder = "Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
            </div>
        );
    }
}
