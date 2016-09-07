import React from 'react';

export default class ContactCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleClick() {
    const contact = {
      name: this.state.name,
      phone: this.state.phone
    };

    this.props.onCreate(contact);

    this.setState({
      name: '',
      phone: ''
    });

    this.nameInput.focus(); // ref는 꼭 ref에 접근하지 않고도 구현할 수 있으면 사용하지 않는 것이 좋음. focus 같은 경우는 ref쓰지 않고는 접근할 수 없어서 사용.
  }

  handleKeyPress(e) {
    if(e.charCode === 13) {// e.charCode === 13 : enter 라는 뜻.
      this.handleClick();
    }
  }

  render() {
    return (
      <div>
        <h2>Create Contact</h2>
        <p>
          <input
            type='text'
            name='name'
            placeholder='name'
            value={this.state.name}
            onChange={this.handleChange}
            ref={(ref) => { this.nameInput = ref }}
            />
            <input
              type='text'
              name='phone'
              placeholder='phone'
              value={this.state.phone}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}

// ContactCreate.propTypes = {
//   onCreate: React.propTypes.func
// }
ContactCreate.defaultProps = {
  onCreate: () => {
    console.log('func is not defined');
  }
}
