import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import LoggedMine from '../LoggedMine'
import LoginButton from '../LoginButton'
import WeappLoginButton from '../WeappLoginButton'
import AlipayLoginButton from '../AlipayLoginButton'
import { useSelector } from 'react-redux'

import './index.scss'

export default function Header(props) {
  const nickName = useSelector(state => state.user.nickName)
  const isLogged = !!nickName

  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP
  const isAlipay = Taro.getEnv() === Taro.ENV_TYPE.ALIPAY

  return (
    <View className="user-box">
      <AtMessage />
      <LoggedMine />
      {!isLogged && (
        <View className="login-button-box">
          <LoginButton />
          {isWeapp && <WeappLoginButton />}
          {isAlipay && <AlipayLoginButton />}
        </View>
      )}
    </View>
  )
}