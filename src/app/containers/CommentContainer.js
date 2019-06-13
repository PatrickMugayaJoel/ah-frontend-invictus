import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Comment from '../../app/components/Comment';
import { fetchComments } from '../../redux/actions/FetchCommentAction';
import { postComment } from '../../redux/actions/CommentAction';
import FetchComment from '../../app/components/FetchComment';

export class CommentContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      commentBody: "",
      displayComment: []
    };
  }
  componentDidMount () {
    const { fetchComments } = this.props;
    fetchComments();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.comments) {
      this.setState({ displayComment: nextProps.comments.comments });
    }
  }

  emptyBody = (comment) => {
    if (comment === undefined) {
      toast.dismiss();
      toast.error("The comment body is required", {
        hideProgressBar: false,
        autoClose: 5000
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = (event) => {
    const { postComment } = this.props;
    event.preventDefault();

    const commentBody = this.state;
    const commentDetails = commentBody.body;

    var headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = `Bearer ${localStorage.getItem('user_token')}`;
    this.emptyBody(commentDetails);
    postComment(commentDetails);
  };

  render () {
    return (
      <React.Fragment>
        <Comment
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <FetchComment comments={this.state.displayComment} />
      </React.Fragment>


    );
  }
}
export const mapStateToProps = state => ({
  comment: state.postComment,
  comments: state.fetchComment
});
export default connect(mapStateToProps, { postComment, fetchComments })(CommentContainer);