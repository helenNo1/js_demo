import Taro from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { useDispatch } from 'react-redux'

import { useState } from 'react'
import './index.scss'
import { SET_LOGIN_INFO } from '../../constants'

export default function LoginButton(props) {
  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = useState(false)

  async function onGetUserInfo(e) {
    setIsLogin(true)

    const { avatarUrl, nickName } = e.detail.userInfo
    await Taro.setStorage({
      key: 'userInfo',
      data: { avatar: avatarUrl, nickName },
    })
    dispatch({
      type: SET_LOGIN_INFO,
      payload: {
        avatar: avatarUrl,
        nickName,
      },
    })

    setIsLogin(false)
  }

  return (
    <Button
      openType="getUserInfo"
      onGetUserInfo={onGetUserInfo}
      type="primary"
      className="login-button"
      loading={isLogin}
    >
      微信登录
    </Button>
  )
}