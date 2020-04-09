import React, { Fragment, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './PostList.module.scss';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { dismissAllPosts } from '../../redux/ducks/posts/reducers';
import Post from '../Post/Post.component.jsx';
import Pagination from 'react-bootstrap/Pagination';

export const PostList = ({ posts, dismissAllPosts }) => {
  const [activePage, setactivePage] = useState(1);
  const [postPerPage, setPostPerPage] = useState([]);

  useEffect(() => {
    setPostPerPage(posts[activePage] ? posts[activePage] : []);
  }, [activePage, posts]);

  const handleDismissRefresh = useCallback(() => {
    dismissAllPosts();
  }, [dismissAllPosts]);

  const handlePageChange = useCallback(
    (pageNumber) => {
      setactivePage(pageNumber);
    },
    [setactivePage]
  );

  return (
    <Fragment>
      <div className={styles.buttonContainer}>
        <Button onClick={handleDismissRefresh} variant="danger">
          Dismiss All
        </Button>
      </div>
      <div className={styles.postListContainer}>
        {postPerPage.map((post) => {
          return <Post post={post} chunk={activePage} key={post.id} />;
        })}
      </div>
      <Pagination size="lg" className={styles.paginator}>
        {posts.map((postId, index) => {
          return (
            <Pagination.Item
              onClick={() => handlePageChange(index)}
              key={index}
              active={index === activePage}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  posts: state.post.postList,
});

PostList.propTypes = {
  posts: PropTypes.array,
  dismissAllPosts: PropTypes.func,
};

export default connect(mapStateToProps, { dismissAllPosts })(PostList);
