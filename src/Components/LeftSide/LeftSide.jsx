function LeftSide({ DonationTitles, customClasses, bold, imgPath, altImg }) {
  return (
    <section className="w-1/2 min-w-[36rem] min-h-[87rem] relative hidden md:flex">
      <ul className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${customClasses}`}>
        {DonationTitles.map((DonationTitle, index) => (
          <li
            key={index}
            className={`${bold === index ? 'font-bold after:content-["Nation"]' : 'font-light'} text-white text-[10rem] overflow-hidden`}
          >
            {DonationTitle}
          </li>
        ))}
      </ul>
      <img src={imgPath} alt={altImg} className="w-full h-full object-cover" />
    </section>
  );
}

export default LeftSide;
