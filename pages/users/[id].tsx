import { NextPageWithLayout } from '../_app';
import DefaultMobileLayout from '../../components/templates/DefaultMobileLayout';
import { ReactElement } from 'react';

const User: NextPageWithLayout = () => {
  return (
    <div className="bg-red-500 w-screen h-screen">
      <h1>User</h1>
    </div>
  );
};

User.getLayout = (page: ReactElement) => {
  return <DefaultMobileLayout>{page}</DefaultMobileLayout>;
};

export default User;
