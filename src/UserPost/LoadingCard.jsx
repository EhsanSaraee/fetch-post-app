import { Card, Skeleton } from 'antd';

const LoadingCard = ({ count }) => {
   const cards = () => {
      let totalCards = [];

      for (const i of count) {
         totalCards.push(
            <Card className="col-md-12" key={i}>
               <Skeleton active />
            </Card>
         );
      }
      return totalCards;
   };
   return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
