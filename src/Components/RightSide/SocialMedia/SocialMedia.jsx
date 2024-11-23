export default function SocialMedia({ message, optionalComponent }) {
  return (
    <div className="flex flex-col gap-3">
      {optionalComponent}
      <p className="text-primary text-[16px] font-medium mt-24">
        {message}
      </p>
    </div>
  );
}
