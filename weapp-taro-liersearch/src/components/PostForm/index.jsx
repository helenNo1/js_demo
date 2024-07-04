import Taro from '@tarojs/taro'
import { View, Form, Input, Textarea, Button } from '@tarojs/components'

import { AtButton } from 'taro-ui'

import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { SET_POSTS, SET_POST_FORM_IS_OPENED } from '../../constants'
import { useState } from 'react'

export default function PostForm(props) {
    const [formTitle, setFormTitle] = useState('')
    const [formContent, setFormContent] = useState('')

    const nickName = useSelector(state => state.user.nickName)
    const avatar = useSelector(state => state.user.avatar)

    const dispatch = useDispatch()
    async function handleSubmit(e) {
        e.preventDefault()

        if (!formTitle || !formContent) {
            Taro.atMessage({
                message: '您还有内容没有填写完哦',
                type: 'warning',
            })

            return
        }

        dispatch({
            type: SET_POSTS,
            payload: {
                post: {
                    title: formTitle,
                    content: formContent,
                    user: { nickName, avatar },
                },
            },
        })

        setFormTitle('')
        setFormContent('')

        dispatch({
            type: SET_POST_FORM_IS_OPENED,
            payload: { isOpened: false },
        })

        Taro.atMessage({
            message: '发表文章成功',
            type: 'success',
        })
    }

    return (
        <View className="post-form">
            <Form onSubmit={handleSubmit}>
                <View>
                    <View className="form-hint">标题</View>
                    <Input
                        className="input-title"
                        type="text"
                        placeholder="点击输入标题"
                        value={formTitle}
                        onInput={e => setFormTitle(e.target.value)}
                    />
                    <View className="form-hint">正文</View>
                    <Textarea
                        placeholder="点击输入正文"
                        className="input-content"
                        value={formContent}
                        onInput={e => setFormContent(e.target.value)}
                    />
                    <AtButton formType="submit" type="primary">
                        提交
                    </AtButton>
                </View>
            </Form>
        </View>
    )


}