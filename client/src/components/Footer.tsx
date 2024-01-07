const Footer = () => {
  return (
    <div className="bg-[#7091F5] py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-[#FFFADD] font-bold tracking-tight">
          SuiteSpot
        </span>
        <div className="text-[#FFFADD] font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
