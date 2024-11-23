function FullSize({ children }) {
  return (
    <main className="w-full h-full flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-200">
      {children}
    </main>
  );
}

export default FullSize;
