import React from 'react'
import { useMutation } from '@apollo/client'

import useForm from '../../../../utilities/useForm'
import { UPLOAD_POST_MUTATION } from '../../../../utilities/gqlTags'
import { PostCard, PostCardForm } from '../../../../elements'

// Displays posts for both 'all' and 'home' users + PostForm (for posting posts)
const PostsView = ({ iconClicked, followingPosts, posts, user, isFollowingPostsEmpty }) => {
    const callback = () => uploadImage();
    const { onChangeHandler, onSubmitHandler, values, resetValues } = useForm(callback, {
        body: "",
        imageURL: ""
    });

    const [uploadPost] = useMutation(UPLOAD_POST_MUTATION, { update() { window.location.reload(); } })
    const uploadImage = () => {
        if (values.imageURL === "") {
            uploadPost({ variables: { body: values.body } })
            return;
        }
        const data = new FormData(); // appload imagen, get URL to store in DB
        data.append("file", values.imageURL);
        data.append("upload_preset", "twitter-clone-react");
        data.append("cloud_name", "kyle-twitter-clone");
        fetch("https://api.cloudinary.com/v1_1/kyle-twitter-clone/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => uploadPost({ variables: { body: values.body, imageURL: data.url } }))
            .catch(error => console.log(error))
    }

    return (
        <div className="PostsView">
            {(iconClicked === "home" && user) &&
                <PostCardForm user={user} values={values} onSubmitHandler={onSubmitHandler}
                    onChangeHandler={onChangeHandler} resetValues={resetValues} />}
            {((!user || (iconClicked === "all"))) && (posts) && posts.map((post) => <PostCard key={post.id} post={post} />)}
            {((user) && (iconClicked === "home")) && followingPosts && (followingPosts.map((post) => <PostCard key={post.id} post={post} />))}
            {((user) && (iconClicked === "home")) && isFollowingPostsEmpty && <div className="empty-posts-view"><p>Follow lords to see their content!</p></div>}

        </div>
    )
}
export default PostsView;