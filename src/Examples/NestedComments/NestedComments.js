import React, { useState, useMemo } from 'react';
import "./NestedComments.scss";

const NestedComments = () => {
    const [commentsData, setCommentsData] = useState([
        {
            id: Date.now(),
            name: 'Zaid Akbar',
            comment: 'This is a comment.',
            imgUrl: 'https://random.imagecdn.app/150/150',
            replies: [],
        }
    ]);
    const [activeModal, setActiveModal] = useState(false);
    const [activeCommentId, setActiveCommentId] = useState(null);

    const [formData, setFormData] = useState({
        id: Date.now(),
        name: '',
        comment: '',
        imgUrl: 'https://random.imagecdn.app/150/150',
        replies: [],
    });

    const [replyData, setReplyData] = useState({
        id: Date.now(),
        name: '',
        comment: '',
        imgUrl: 'https://random.imagecdn.app/150/150',
        replies: [],
    });


    const resetFormData = () => {
        setFormData({
            id: Date.now(),
            name: '',
            comment: '',
            imgUrl: 'https://random.imagecdn.app/150/150',
            replies: [],
        })
        setReplyData({
            id: Date.now(),
            name: '',
            comment: '',
            imgUrl: 'https://random.imagecdn.app/150/150',
            replies: [],
        })
    }

    const addComment = (e) => {
        e.preventDefault();
        if (formData.name.length === 0 || formData.comment.length === 0) {
            window.alert("Fill all the fields.");
            return;
        }
        setCommentsData([...commentsData, formData]);
        resetFormData();
    };


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const loopThroughData = (data, commentId) => {
        data.forEach(comment => {
            if (comment.id === commentId) {
                comment.replies.push({
                    id: Date.now(),
                    name: replyData.name,
                    comment: replyData.comment,
                    imgUrl: replyData.imgUrl,
                    replies: []
                });

                resetFormData()
                setActiveModal(false)
            }
            if (comment.replies && comment.replies.length > 0) {
                console.log("Replies:");
                loopThroughData(comment.replies, commentId);
            }
        });
    }


    const openModal = (commentId) => {
        setActiveModal(true);
        setActiveCommentId(commentId);
    }

    const addReply = (e) => {
        e.preventDefault()
        loopThroughData(commentsData, activeCommentId)
    }

    const handleReplyChange = (e) => {
        const { name, value } = e.target;
        setReplyData({
            ...replyData,
            [name]: value,
        });
    }


    const Comment = ({ comment }) => {
        return (
            <div className='comments' key={comment.id}>
                <div className='wrapper'>
                    <img src={comment?.imgUrl} alt={comment.name} />
                    <div className='details'>
                        <span className='name'>{comment.name}</span>
                        <span className='comment'>{comment.comment}</span>
                        <span className='reply-btn' onClick={() => openModal(comment.id)}>Reply</span>
                    </div>
                </div>
                {comment.replies && comment.replies.map(reply => (
                    <div className='replies' key={reply.id}>
                        <Comment key={reply.id} comment={reply} commentId={reply.id} />
                    </div>
                ))}
            </div>
        );
    };

    const Modal = useMemo(() => {
        return activeModal &&
            <div onClick={() => {
                setActiveModal(false)
                resetFormData()
            }} className='modal'>
                <form onClick={(e) => {
                    e.stopPropagation()
                }} onSubmit={addReply}>
                    <label>Reply</label>
                    <input placeholder='Name' name='name' type='text' value={replyData.name} onChange={handleReplyChange} />
                    <input placeholder='Comment' name='comment' type='text' value={replyData.comment} onChange={handleReplyChange} />
                    <button type='submit'>Reply</button>
                </form>
            </div>
    }, [activeModal, replyData, addReply, handleReplyChange]);

    return (
        <>
            <div className='NestedComments'>
                <div className='wrapper'>
                    <header>Comments</header>

                    <div className='body'>
                        {commentsData.map(comment => <Comment key={comment.id} comment={comment} />)}
                    </div>

                    <div className='footer'>
                        <form onSubmit={addComment}>
                            <input onChange={handleOnChange} name='name' value={formData.name} required type='text' placeholder='Name' />
                            <textarea
                                name='comment'
                                required
                                onChange={handleOnChange}
                                value={formData.comment}
                                style={{
                                    height: '100px',
                                    maxHeight: '100px',
                                    maxWidth: '575px',
                                    minWidth: '575px',
                                    minHeight: '100px',
                                }}
                                maxLength={300}
                                placeholder='Add you comment'
                                className='textarea' />

                            <button type='submit' className='button'>Add Comment</button>
                        </form>
                    </div>
                </div>
            </div>

            {Modal}
        </>
    )
}

export default NestedComments;
