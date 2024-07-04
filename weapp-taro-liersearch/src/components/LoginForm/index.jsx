import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Form, Input } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'
import { useDispatch } from 'react-redux'
import { SET_LOGIN_INFO, SET_IS_OPENED } from '../../constants'

import './index.scss'
import { func } from 'prop-types'

export default function LoginForm(props) {
  const [formNickName, setFormNickName] = useState('')
  const [files, setFiles] = useState([])
  const [showAddBtn, setShowAddBtn] = useState(true)
  const dispatch = useDispatch()

  function onChange(files) {
    if (files.length > 0) {
      setShowAddBtn(false)
    } else {
      setShowAddBtn(true)
    }
    setFiles(files)

  }

  function onImageClick() {
    Taro.previewImage({
      urls: [files[0].url],
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!formNickName || !files.length) {
      Taro.atMessage({
        type: 'error',
        message: '您有内容没有填写!',
      })
      return

    }

    setShowAddBtn(true)
    // 提示登录成功
    Taro.atMessage({
      type: 'success',
      message: '恭喜您，登录成功！',
    })

    const userInfo = { avatar: files[0].url, nickName: formNickName }

    setFiles([])
    setFormNickName('')
    // 缓存在 storage 里面
    await Taro.setStorage({ key: 'userInfo', data: userInfo })

    dispatch({ type: SET_LOGIN_INFO, payload: userInfo })

    // 关闭弹出层
    dispatch({ type: SET_IS_OPENED, payload: { isOpened: false } })
  }

  return (
    <View className="post-form">
      <Form onSubmit={handleSubmit}>
        <View className="login-box">
          <View className="avatar-selector">
            <AtImagePicker
              length={1}
              mode="scaleToFill"
              count={1}
              files={files}
              showAddBtn={showAddBtn}
              onImageClick={onImageClick}
              onChange={onChange}
            />
          </View>
          <Input
            className="input-nickName"
            type="text"
            placeholder="点击输入昵称"
            value={formNickName}
            onInput={e => setFormNickName(e.target.value)}
          />
          <AtButton formType="submit" type="primary">
            登录
          </AtButton>
        </View>
      </Form>
    </View>
  )
}