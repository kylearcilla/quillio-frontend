import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import App from '../App'

const httpLink = createHttpLink({
    uri: 'https://guarded-harbor-95623.herokuapp.com/'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)