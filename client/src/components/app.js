import { h, Component } from 'preact';

import Header from './header';

// Code-splitting is automated for routes
import Home from './home';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	// handleRoute = e => {
	// 	this.currentUrl = e.url;
	// };

	render() {
		return (
			<ApolloProvider client={client}>
			<div id="app">
				<Header />
				<Home />
			</div>
			</ApolloProvider>
		);
	}
}
