import { Button, Input, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../Redux/Features/postSlice';
import LoadingCard from './LoadingCard';
import { Card } from 'antd';

const CreatePost = () => {
   const [values, setValues] = useState({ title: '', body: '' });
   const [showPost, setShowPost] = useState(false);
   const { posts, loading } = useSelector((state) => state.posts);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { title, body } = values;

   const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(createPost({ values }));
      setValues({ title: '', body: '' });
      setShowPost(true);
   };

   const showPostBlog = () => {
      return (
         <>
            {loading ? (
               <LoadingCard count={1} />
            ) : (
               <div className="site-card-border-less-wrapper">
                  <Card type="inner" title={posts[0]?.data?.title}>
                     <p>User ID : {posts[0]?.data?.id}</p>
                     <span>{posts[0]?.data?.body}</span>
                  </Card>
               </div>
            )}
         </>
      );
   };

   return (
      <>
         <form onSubmit={handleSubmit}>
            <h1>Create Post</h1>
            <Input
               placeholder="Enter Title"
               type="text"
               value={title}
               onChange={(event) =>
                  setValues({ ...values, title: event.target.value })
               }
               style={{ width: '400px' }}
            />
            <br />
            <br />
            <Input.TextArea
               placeholder="Enter Body"
               type="text"
               value={body}
               onChange={(event) =>
                  setValues({ ...values, body: event.target.value })
               }
               style={{ width: '400px' }}
               size="large"
            />
            <br />
            <br />
            <Space style={{ margin: '10px' }}>
               <Button onClick={() => navigate('/')}>Go Back</Button>
               <Button htmlType="submit" type="primary">
                  Submit
               </Button>
            </Space>
         </form>
         <br />
         <br />
         {showPost && <div>{showPostBlog()}</div>}
      </>
   );
};

export default CreatePost;
