import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const rootElement = document.getElementById('root');

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
   rootElement
);
