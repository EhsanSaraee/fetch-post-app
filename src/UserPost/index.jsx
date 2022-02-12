import { Button, Card, Input, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../Redux/Features/postSlice';
import LoadingCard from './LoadingCard';

const Home = () => {
   const [id, setId] = useState();
   const dispatch = useDispatch();
   const { posts, loading } = useSelector((state) => state.posts);
   console.log(posts);
   const navigate = useNavigate();

   const fetchUserPost = () => {
      if (!id) {
         window.alert('Please provide an ID');
      } else {
         dispatch(getPost({ id }));
         setId('');
      }
   };

   return (
      <div className="container">
         <h1 style={{ textAlign: 'center' }}>Fetch Post</h1>
         <Input
            style={{ width: '300px' }}
            placeholder="Enter User ID"
            value={id}
            onChange={(event) => setId(event.target.value)}
            type="number"
         />
         <br />
         <br />
         <Space size="small" style={{ margin: '10px' }}>
            <Button type="primary" onClick={fetchUserPost}>
               Fetch User Post
            </Button>
            <Button type="primary" onClick={() => navigate('/createPost')}>
               Create User Post
            </Button>
         </Space>
         <br />
         <br />
         {loading ? (
            <LoadingCard count={1} />
         ) : (
            <>
               <div className="site-card-border-less-wrapper">
                  <Card type="inner" title={posts[0]?.data?.title}>
                     <p>User ID : {posts[0]?.data?.id}</p>
                     <span>{posts[0]?.data?.body}</span>
                  </Card>
                  {posts.length > 0 && (
                     <Space
                        size="middle"
                        style={{
                           marginTop: '35px',
                           marginLeft: '5px',
                           float: 'right',
                        }}
                     >
                        <Button
                           style={{ cursor: 'pointer' }}
                           type="primary"
                           danger
                        >
                           Delete
                        </Button>
                        <Button style={{ cursor: 'pointer' }} type="primary">
                           Edit
                        </Button>
                     </Space>
                  )}
               </div>
            </>
         )}
      </div>
   );
};

export default Home;
