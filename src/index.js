import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloProvider from './authentication/ApolloProvider'

ReactDOM.render(
  ApolloProvider,
  document.getElementById('root')
);

