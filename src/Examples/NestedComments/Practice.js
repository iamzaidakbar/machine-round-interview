import React, { useMemo, useState } from 'react';
import "./NestedComments.scss"

const Practice = () => {
    const mockCommentData = {
        id: Date.now(),
        name: "",
        text: "",
        imgUrl: 'https://random.imagecdn.app/150/150',
        replies: []
    };
    const [activeModal, setActiveModal] = useState(false);
    const [commentFormData, setCommentFormData] = useState(mockCommentData)
    const [replyFormData, setReplyFormData] = useState(mockCommentData)
    const [activeCommentId, setActiveCommentId] = useState(null);

    const [comments, setComments] = useState([]);

    const openModal = (commentId) => {
        setActiveModal(true);
        setActiveCommentId(commentId);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setCommentFormData({ ...commentFormData, [name]: value })
    }

    const handleReplyChange = (e) => {
        const { name, value } = e.target;
        setReplyFormData({
            ...replyFormData,
            [name]: value,
        });
    }

    const addComment = (e) => {
        e.preventDefault()
        setComments([...comments, commentFormData])
        setCommentFormData(mockCommentData)
    }
    const addReply = (e) => {
        e.preventDefault();
        loopthroughComments(comments)
        setCommentFormData(mockCommentData)
    }

    const loopthroughComments = (comments) => {
        comments.forEach(comment => {
            if (comment.id === activeCommentId) {
                comment.replies.push({
                    id: Date.now(),
                    name: replyFormData.name,
                    text: replyFormData.text,
                    imgUrl: 'https://random.imagecdn.app/150/150',
                    replies: [],
                })
                setActiveModal(false)
                setActiveCommentId(null)
                setReplyFormData(mockCommentData)

            } else if (comment.replies && comment.replies.length > 0) {
                loopthroughComments(comment.replies, activeCommentId)
            }

        });
    }

    const Modal = useMemo(() => {
        return activeModal &&
            <div onClick={() => {
                setActiveModal(false)
                setReplyFormData(mockCommentData)
            }} className='modal'>
                <form onClick={(e) => {
                    e.stopPropagation()
                }} onSubmit={addReply}>
                    <label>Reply</label>
                    <input required placeholder='Name' name='name' type='text' value={replyFormData.name} onChange={handleReplyChange} />
                    <input required placeholder='Comment' name='text' type='text' value={replyFormData.text} onChange={handleReplyChange} />
                    <button type='submit'>Reply</button>
                </form>
            </div>
    }, [activeModal, replyFormData, addReply, handleReplyChange]);


    const Comment = ({ comment }) => {
        return (
            <div className='comment'>
                <section>
                    <span><img src={comment.imgUrl} alt={comment.name} /></span>
                    <span>
                        <h3>{comment.name}</h3>
                        <p>{comment.text}</p>
                        <span className='reply-btn' onClick={() => openModal(comment.id)}>Reply</span>
                    </span>
                </section>
                {comment.replies && comment.replies.map(reply => <span className='replies'><Comment key={comment.id} comment={reply} /></span>)}
            </div>
        );
    };


    return (
        <>
            <div className='NestedComments'>
                {comments && comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                <form onSubmit={addComment}>
                    <input name='name' onChange={handleOnChange} value={commentFormData.name} required type='text' placeholder='Name' />
                    <textarea
                        name='text'
                        required
                        onChange={handleOnChange}
                        value={commentFormData.text}
                        style={{
                            height: '100px',
                            maxHeight: '100px',
                            maxWidth: '575px',
                            minWidth: '575px',
                            minHeight: '100px',
                        }}
                        maxLength={300}
                        placeholder='Add your comment'
                        className='textarea' />
                    <button type='submit' className='button'>Add Comment</button>
                </form>
            </div>

            {Modal}
        </>
    );
};

export default Practice;
