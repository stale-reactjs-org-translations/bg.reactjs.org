class HelloMessage extends React.Component {
  render() {
<<<<<<< HEAD
    return (
      <div>
        Привет, {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Иван" />,
  document.getElementById('hello-example')
);
=======
    return <div>Hello {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Taylor" />);
>>>>>>> 37cf98d075de3133b5ae69fe80fbecb6a742530a
