export default function NoAccount({ text, children }) {
  return (
    <p className="text-gray-500 text-[16px] font-medium py-4 border-b border-white-smoke">
      {text}{children}
    </p>
  );
}
