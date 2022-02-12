import { Button, Card, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
   deletePost,
   getPost,
   setEdit,
   updatePost,
} from '../Redux/Features/postSlice';
import LoadingCard from './LoadingCard';

const Home = () => {
   const [id, setId] = useState();
   const [bodyText, setBodyText] = useState('');
   const dispatch = useDispatch();
   const { posts, loading, edit, body } = useSelector((state) => state.posts);
   const navigate = useNavigate();

   useEffect(() => {
      if (body) {
         setBodyText(body);
      }
   }, [body]);

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
                     {edit ? (
                        <>
                           <Input.TextArea
                              rows={4}
                              value={bodyText}
                              onChange={(event) =>
                                 setBodyText(event.target.value)
                              }
                           />
                           <Space
                              size="middle"
                              style={{ marginTop: '5px', marginLeft: '5px' }}
                           >
                              <Button
                                 type="primary"
                                 onClick={() => {
                                    dispatch(
                                       updatePost({
                                          id: posts[0].data.id,
                                          title: posts[0].data.title,
                                          body: bodyText,
                                       })
                                    );
                                    dispatch(
                                       setEdit({ edit: false, body: '' })
                                    );
                                 }}
                              >
                                 Save
                              </Button>
                              <Button
                                 onClick={() =>
                                    dispatch(setEdit({ edit: false, body: '' }))
                                 }
                              >
                                 Cancel
                              </Button>
                           </Space>
                        </>
                     ) : (
                        <span>{posts[0]?.data?.body}</span>
                     )}
                  </Card>
                  {posts.length > 0 && !edit && (
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
                           onClick={() =>
                              dispatch(deletePost({ id: posts[0]?.data?.id }))
                           }
                        >
                           Delete
                        </Button>
                        <Button
                           style={{ cursor: 'pointer' }}
                           type="primary"
                           onClick={() =>
                              dispatch(
                                 setEdit({
                                    edit: true,
                                    body: posts[0]?.data?.body,
                                 })
                              )
                           }
                        >
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
