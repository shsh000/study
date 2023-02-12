import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "유선희",
        comment: "첫 리액트 강의"
    },
    {
        name: "이민형",
        comment: "Hi I'm Mark"
    },
    {
        name: "조승연",
        comment: "뜽요"
    }
]

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;