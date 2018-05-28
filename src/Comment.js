import React, { Component } from 'react';
import './comment.css';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        }
    }

    componentDidMount() {
        let url2 = 'https://jsonplaceholder.typicode.com/users?email=' + this.props.email;
        // console.log(url2);
        fetch(url2)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result: " + result);

                    // console.log(result.name)
                    if(result.username == undefined) {
                        this.setState({
                            username: 'unknown'
                        });
                    }
                    else {

                        this.setState({
                            isLoaded: true,
                            username: result.name

                        });
                    }


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
        if(this.state.username == '[]')
            this.setState({
               username: 'guest'
            });

    }


        render() {
        return(


            <div className="col-sm-10 panelMain">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <strong>{this.props.name}</strong>
                    </div>
                    <div className="panel-body">
                        <p>
                            {this.props.body}
                        </p>
                        {/*<p className="comment_publisher" > comment by  {this.state.username}</p>*/}
                    </div>
                </div>
            </div>

        )

    }
}


export default Comment;
