import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { PostCard } from '../../components'
import { useSelector } from 'react-redux'

import './post.scss'

export default function Post() {
  const router = useRouter()
  const { postId } = router.params

  const posts = useSelector(state => state.post.posts)
  const post = posts[postId]


  return (
    <View className="post">
      <PostCard post={post} />
    </View>
  )
}

Post.config = {
  navigationBarTitleText: '帖子详情',
}