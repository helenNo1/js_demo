import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useDispatch } from 'react-redux'

import avatar from '../../images/avatar.png'
import { useState, useEffect } from 'react'
import { Header, Footer } from '../../components'
import './mine.scss'
import { SET_LOGIN_INFO } from '../../constants'


export default function Mine() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })
        const { nickName, avatar } = data
        dispatch({ type: SET_LOGIN_INFO, payload: { nickName, avatar } })

      } catch (err) {
        console.log('get storage err: ', err);
      }
    }
    getStorage()
  })

  return (
    <View className="mine">
      <Header />
      <Footer />
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '我的',
}