const xs = require('xstate')
const visualize = require('@karfau/xstate-plantuml')
const encoder = require("plantuml-encoder");
const request = require('request');
const fs = require('fs');

async function download(url, dest) {

    /* Create an empty file where we can save data */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise((resolve, reject) => {
      request({
        /* Here you should specify the exact link to the file you are trying to download */
        uri: url,
        gzip: true,
      })
          .pipe(file)
          .on('finish', async () => {
            console.log(`The file is finished downloading.`);
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
    })
        .catch((error) => {
          console.log(`Something happened: ${error}`);
        });
}


const fetchMachine = xs.createMachine({
	id: 'auth',
	// we want to start by checking if
	// user is logged in when page loads
	initial: 'authenticating',
	// context is where you keep state
	context: {
	  auth: null,
	  user: null,
	  error: null
	},
	actions: {
	  // clear user info on logout
	  clearAuth: xs.assign({ user: null, auth: null }),
	  clearError: xs.assign({ error: null }),
	  // put Firebase auth object on context
	  setAuth: xs.assign({ auth: (_, event) => event.data }),
	  // put user on context in loading service
	  setUser: xs.assign({ user: (_, event) => event.data }),
	  setError: xs.assign({
		error: (_, event) => event.data
	  })
	},
	// all possible authentication states
	states: {
	  authenticating: {
		// when entering a state invoke
		// the authChecker service
		invoke: {
		  id: 'authChecker',
		  src: 'authChecker',
		  onDone: { target: 'progressing', actions: 'setAuth' },
		  onError: { target: 'signedOut' }
		}
	  },
	  // we will enrich the user profile
	  // with additional data
	  progressing: {
		invoke: {
		  id: 'loader',
		  src: 'loader',
		  onDone: { target: 'signedIn', actions: 'setUser' },
		  onError: {
			target: 'signedOut.failure',
			actions: ['setError', 'clearAuth']
		  }
		}
	  },
	  signedIn: {
		// when receiving 'LOGOUT' event
		// transition to singingOut state
		on: { LOGOUT: { target: 'signingOut' } }
	  },
	  // signedOut has two sub-states
	  // we will transition to failure in
	  // case of wrong password, username
	  // or network error
	  signedOut: {
		initial: 'ok',
		states: {
		  ok: { type: 'final' },
		  failure: {}
		},
		on: {
		  LOGIN: { target: 'signingIn' }
		}
	  },
	  signingIn: {
		invoke: {
		  id: 'authenticator',
		  src: 'authenticator',
		  onDone: {
			target: 'authenticating',
			// clear error if successful login
			actions: 'clearError'
		  },
		  onError: {
			// transition to failure state
			// and set an error
			target: 'signedOut.failure',
			actions: 'setError'
		  }
		}
	  },
	  signingOut: {
		invoke: {
		  id: 'logout',
		  src: 'logout',
		  onDone: {
			target: 'signedOut',
			actions: ['clearAuth', 'clearError']
		  },
		  onError: {
			target: 'signedOut.failure',
			actions: ['clearAuth', 'setError']
		  }
		}
	  }
	}
  });

  const puml = visualize(fetchMachine, {
    // leftToRight: false,
	skinParams: ['monochrome true']
  });

  const url = "http://www.plantuml.com/plantuml/svg/" + encoder.encode(puml);
  download(url,'./xstate-docs/authState.svg')
  

  
  