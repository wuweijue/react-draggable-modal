import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal } from './components';
import Button from './components/test';

const App = ()=>{
    return <Button>333</Button>
}

// if (module.hot) {module.hot.accept()}

ReactDOM.render(<App/>,document.getElementById('root'));