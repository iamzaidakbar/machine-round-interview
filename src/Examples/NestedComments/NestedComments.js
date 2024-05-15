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

    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState(mockCommentData);
    const [modalData, setModalData] = useState({ active: false, commentId: null });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openModal = (commentId) => {
        setModalData({ active: true, commentId });
    };

    const closeAndClearModal = () => {
        setModalData({ active: false, commentId: null });
        setFormData(mockCommentData);
    };

    const addComment = (e) => {
        e.preventDefault();
        setComments([...comments, formData]);
        setFormData(mockCommentData);
    };

    const addReply = (e) => {
        e.preventDefault();
        const updatedComments = addReplyToComments(comments, modalData.commentId, formData);
        setComments(updatedComments);
        closeAndClearModal();
    };

    const addReplyToComments = (comments, commentId, replyData) => {
        return comments.map(comment => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, { ...replyData, id: Date.now(), replies: [] }]
                };
            }
            if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: addReplyToComments(comment.replies, commentId, replyData)
                };
            }
            return comment;
        });
    };

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
                {comment.replies && comment.replies.map(reply => <span className='replies'><Comment key={reply.id} comment={reply} /></span>)}
            </div>
        );
    };

    const Modal = useMemo(() => {
        return modalData.active && (
            <div className='modal' onClick={closeAndClearModal}>
                <form onClick={(e) => e.stopPropagation()} onSubmit={addReply}>
                    <label>Name</label>
                    <input required placeholder='Name' name='name' type='text' value={formData.name} onChange={handleOnChange} />
                    <label>Comment</label>
                    <input required placeholder='Comment' name='text' type='text' value={formData.text} onChange={handleOnChange} />
                    <button type='submit'>Reply</button>
                </form>
            </div>
        );
    }, [modalData, formData, addReply, handleOnChange, closeAndClearModal]);

    return (
        <>
            <div className='NestedComments'>
                {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                <form onSubmit={addComment}>
                    <input name='name' onChange={handleOnChange} value={formData.name} required type='text' placeholder='Name' />
                    <textarea
                        name='text'
                        required
                        onChange={handleOnChange}
                        value={formData.text}
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
