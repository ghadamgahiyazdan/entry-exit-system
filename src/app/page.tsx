import AddEmployee from '@/components/AddEmployee';
import AddReport from '@/components/AddReport';
import AddShift from '@/components/AddShift';
import RmTabele from '@/components/RmTabele';
import ShowTabel from '@/components/ShowTabel';
import React from 'react';

const Page = () => {
  return (
    <>
      <div className="w-screen grid grid-cols-3 gap-2 mb-2">
        {/* Employee Section */}
        <AddEmployee />

        {/* Shift Section */}
        <AddShift />

        {/* Report Section */}
        <AddReport />


      </div>
      {/* Rm Tabel */}
      <RmTabele/>

      {/* Show Report Tabel */}
      <ShowTabel />

    </>
  );
};

export default Page;