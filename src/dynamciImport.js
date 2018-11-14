// import './style.css'
// import Icon from './webpack.png'
import printMe from './print.js';
// import _ from 'lodash';
function component() {
    return import (/* webpackChunkName: "lodash" */'lodash').then(function (_) {
        const element = document.createElement('div');
        const btn = document.createElement('button');
    
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
        btn.innerHTML = 'Click me and check the console!';
        btn.onclick = printMe;
    
        element.appendChild(btn);
    
        return element; 
    }).catch(function(error) {
        console.log('An error occurred while loading the component')
      });
}
component().then(function(component) {
    document.body.appendChild(component);
});