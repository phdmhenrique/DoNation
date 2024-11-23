import React from 'react';

function RightSide({ children }) {
  return (
    <section className="w-1/2 min-w-[27rem] flex flex-col items-center p-[12.6rem_2rem_0_4rem] bg-white md:w-full md:p-[6rem_2rem_0]">
      <div className="max-w-[38rem] w-full md:px-4">
        {children}
      </div>
    </section>
  );
}

export default RightSide;
