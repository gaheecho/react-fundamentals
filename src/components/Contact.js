import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update'
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedKey: -1,
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

        /*
        임의의 메소드를 만들 땐 this와 바인딩을 해줘야함.
        */
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    /*
      컴포넌트 생성할 때 constructor -> componentWillMount -> render -> componentDidMount
      컴포넌트의 props가 변경될 때  componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
      state가 변경될 때 shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate
      컴포넌트가 unmount 될 때 componentWillUnmount
    */

    /*
      최초 렌더링이 일어나기 직전, 컴포넌트가 Dom위에 만들어 지기 전에 실행되기 떄문에 Dom처리를 할 수 없음.
    */
    componentWillMount () {
      /*
        localStorage
        html5부터 지원
        서버로 전송되지 않음.
        localStorage는 텍스트 형태로만 저장이 가능함.
        객체는 JSON.stringify로 변환을 해주어야 함. 나중에 꺼내서 쓸 때는 JSON.parse로 다시 객체형태로 바꿔서 사용하면됨.
      */
      const contactData = localStorage.contactData;

      if(contactData) {
        this.setState({
          contactData: JSON.parse(contactData)
        });
      }
    };

    /*
      최초 렌더링이 일어난 다음 호출, Dom처리 가능.
      첫 렌더링을 마치고 실행.
      이 안에서 다른 자바스크립트 프레임워크 연동 및 setTimeout, setInterval 및 AJAX 사용.
    */
    componentDidMount() {

    };
    /*
      업데이트 시, 컴포넌트가 새로운 props를 받았을 때 실행
      props에 때라 state를 업데이트 할 떄 사용하면 유용
      이 안에서 setState 해도 됨.
    */
    componentWillReceiveProps (nextProps) {

    };
    /*
      업데이트 시, props/state가 변경되었을 때 리렌더링을 할지 말지를 정함.
      필요한 비교를 하고 값을 반환해야 함.
      JSON.stringify를 사용하여 여러 field를 편하게 비교
    */
    shouldComponentUpdate(nextProps, nextState) {
      console.log('this.state', this.state);
      console.log('this.state.keyword', this.state.keyword);
      console.log('nextState', nextState);
      console.log('nextState.keyword', nextState.keyword);
    return this.state !== nextState;
    };
    /*
      업데이트 시, 컴포넌트가 업데이트 되기 전에 할 작업을 하면 됨. 이 작업 다음 render
      setState사용하지 말것!
    */
    componentWillUpdate (nextProps, nextState) {

    };
    /*
      업데이트 시, render작업 마치고 this.state, this.props가 변경이 된 상태.
      컴포넌트가 리렌더링을 마친 후 실행.
      setState사용하지 말것!

    */
    componentDidUpdate (prevProps, prevState) {
      if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
        localStorage.contactData = JSON.stringify(this.state.contactData);
      }
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

    handleClick(key){
      this.setState({
        selectedKey: key
      });
      console.log(key, 'is selected.');
    }

    handleCreate(contact) {
      this.setState({
        contactData: update(this.state.contactData, { $push: [contact]})
      });
    }

    handleRemove() {
      if(this.state.selectedKey < 0){
        return;
      }
      this.setState({
        contactData: update(this.state.contactData,
          { $splice: [[this.state.selectedKey, 1]]}
        ),
        selectedKey: -1
      });
    }

    handleEdit(name, phone){
      this.setState({
        contactData: update(this.state.contactData,
          {
            [this.state.selectedKey]: {
              name: { $set: name},
              phone: { $set: phone}
            }
          }
        )
      });
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
                return (<ContactInfo
                            contact={contact}
                            keyword = {this.state.keyword}
                            key={i}
                            onClick={()=>this.handleClick(i)}//커스텀 태그에서는 onClick이 적용되지 않음. 네이티브 돔에만 적용됨. 만든 컴포넌트에는 실행이 안됨. ----> props로 전달되기 때문,하위 컴포넌트에 props로 전달해주면 하위컴포넌트에서 사용가능
                            />);
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
                <ContactDetails
                      isSelected={this.state.selectedKey != -1}
                      contact={this.state.contactData[this.state.selectedKey]}
                      onRemove={this.handleRemove}
                      onEdit={this.handleEdit}/>
                <ContactCreate
                      onCreate={this.handleCreate}
                      />
            </div>
        );
    }
}
