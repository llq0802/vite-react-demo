const Tailwindcss = () => {
  return (
    <div className='flex flex-col gap-2.5 w-full h-full mt-4  p-6 bg-gray-300'>
      <button className='bg-sky-500 hover:bg-sky-700 p-3'>Save changes</button>
      <div className=' grid grid-cols-2 sm:grid-cols-3'>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
};

export default Tailwindcss;
