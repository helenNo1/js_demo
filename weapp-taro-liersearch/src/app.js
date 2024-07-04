
import { useLaunch } from '@tarojs/taro'
import './app.scss'
import configStore from './store'
import { Provider } from 'react-redux'

const store = configStore()
function App({ children }) {

  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return <Provider store={store}>
    {children}
  </Provider>
}

export default App
