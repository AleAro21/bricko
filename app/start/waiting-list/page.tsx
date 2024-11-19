import WaitingList from '@/components/common/WaitingList';
import { FC } from 'react';

const WaitingListPage: FC = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <WaitingList />
    </main>
  );
};

export default WaitingListPage;