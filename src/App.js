import React, {Suspense, Component} from 'react';
import './App.css';
import Page1 from './Components/Page1';


// const Page2Component = React.lazy(() => import('./Components/Page2'));

// Simulate a delay for Page2Component
const Page2Component = React.lazy(() => new Promise(resolve => {
    setTimeout(() => resolve(import('./Components/Page2')), 2000);
}));

const Page3Component = React.lazy(() => import('./Components/Page3'));

class App extends Component {
    constructor() {
        super();
        this.state = {
            route: 'page1',
        }
    }

    onRouteChange = (route) => {
        this.setState({route: route});
    }


    render() {
        let componentToRender;

        if (this.state.route === 'page1') {
            componentToRender = <Page1 onRouteChange={this.onRouteChange}/>;
        } else if (this.state.route === 'page2') {
            componentToRender = (<Suspense fallback={<div>Loading...</div>}>
                <Page2Component onRouteChange={this.onRouteChange}/>
            </Suspense>);
        } else {
            componentToRender = (<Suspense fallback={<div>Loading...</div>}>
                <Page3Component onRouteChange={this.onRouteChange}/>
            </Suspense>);
        }

        return componentToRender;
    }
}

export default App;
