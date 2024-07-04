import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { AtAvatar } from 'taro-ui'

import './index.scss'
import avatar from '../../images/avatar.png'

export default function LoggedMine(props) {
  const nickName = useSelector(state => state.user.nickName)
  const avatar = useSelector(state => state.user.avatar)

  function onImageClick() {
    Taro.previewImage({
      urls: [avatar],
    })
  }

  return (
    <View className="logged-mine">
      {avatar ? (
        <Image src={avatar} className="mine-avatar" onClick={onImageClick} />
      ) : (
        <AtAvatar size="large" circle text="雀" />
      )}
      <View className="mine-nickName">{nickName}</View>
    </View>
  )
}
//校验格式
LoggedMine.propTypes = {
  avatar: PropTypes.string,
  nickName: PropTypes.string,
  username: PropTypes.string,
}