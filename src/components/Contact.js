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
