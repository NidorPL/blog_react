import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post';

function Display10Posts(props) {

    return (
        <div>
            {props.posts.slice(0,10).map((post) =>
                <div>
                    <Post key = {post.id} id = {post.id} title = {post.title} body = {post.body} userId = {post.userId}/>
                    <div className = "placeholder" > </div>
                </div>

            )}

        </div>
    )

}



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded : false,
            posts : []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        posts: result
                    });
                }
            )
    }


    render() {

        const {error, isLoaded, posts} = this.state;
        if (error) {
            return <div>Error: {error.message} </div>
        } else if (!isLoaded) {
            return <div> Loading...</div>
        } else {


            return (
                <div>

                    <nav className="navbar navbar-dark bg-dark">
                        {/*<span className="navbar-brand mb-0 h1">*/}
                            {/**/}
                        {/*</span>*/}
                        <img src={logo} className="App-logo" alt="logo" width ="90"/>
                    </nav>


                    <div className="container-fluid ">

                        <div className="row content">


                            {/*<div className="col-sm-2 sidenav">*/}

                            {/*</div>*/}


                            <div className="col-md-8 col-lg-8 col-xl-7 text-left">
                                <h1>Welcome to the Blog</h1>


                                <Display10Posts posts={this.state.posts}/>

                            </div>


                            {/*<div className="col-sm-2 sidenav">*/}

                            {/*</div>*/}


                        </div>
                    </div>


                    <footer className="container-fluid text-center footer">
                    </footer>


                </div>
            );
        }
    }
}

export default App;





