function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Иван',
  lastName: 'Атанасов',
};

const element = <h1>Здравей, {formatName(user)}!</h1>;

ReactDOM.render(element, document.getElementById('root'));
