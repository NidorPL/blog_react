import React, { Component } from 'react';
import Comment from "./Comment";

import './Post.css';







class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            comments: [],
            visible: 3,
            username : ""
        };
        this.load10Comments = this.load10Comments.bind(this);

    }


    load10Comments(props) {

        this.setState({
            visible: this.state.visible + 10
        });
    }




    componentDidMount() {
        // fetching comments

        let url = 'https://jsonplaceholder.typicode.com/comments?postId=' + this.props.id;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
                    this.setState({
                        isLoaded: true,
                        comments: result
                    });
                    // console.log(this.state.comments);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )


        // fetching username

        let url2 = 'https://jsonplaceholder.typicode.com/users/' + this.props.userId;
        fetch(url2)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result.name)
                    this.setState({
                        isLoaded: true,
                        username: result.name
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }





    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div id={this.props.id} className="post">
                    <h3>{this.props.title}</h3>
                    <p>{this.props.body}</p>

                    <p className="post_publisher"> posted by {this.state.username} </p>

                    <br/>
                    <h5> Comments </h5>

                    <div id="comment-box">
                        {this.state.comments.slice(0,this.state.visible).map((comment) =>
                            <Comment key = {comment.id} name = {comment.name} body = {comment.body} email = {comment.email}/>

                        )}

                    </div>
                    {/*<p className = "btn_loadComments"> load more </p>*/}
                    {/*<img src={loadButton} className="icon_load" alt="" width ="90"/>*/}

                    {this.state.visible >= this.state.comments.length ? (
                        <p>{this.state.comments.length}/{this.state.comments.length} comments loaded</p>
                    ) : (
                        <button className="btn_loadComments" type="button" onClick={this.load10Comments}>load more</button>
                    )}


                </div>
            )
        }




        }





}

export default Post;
