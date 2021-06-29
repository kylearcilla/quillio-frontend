import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import App from '../App'

// connect to GQL server in Node
const httpLink = createHttpLink({
    uri: 'https://guarded-harbor-95623.herokuapp.com/'
});

// add the token (if there is one) to the header for the context in BackEnd
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// initialize the actual client w/ cache (for preventing repeated API Calls)
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)