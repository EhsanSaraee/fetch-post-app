import { Button, Input, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
   const [id, setId] = useState();
   const fetchUserPost = () => {};
   const navigate = useNavigate();

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
      </div>
   );
};

export default Home;
