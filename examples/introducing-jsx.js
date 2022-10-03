function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Иван',
  lastName: 'Атанасов',
};

const element = <h1>Здравей, {formatName(user)}!</h1>;

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(element);
