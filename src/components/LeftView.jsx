import boldCyan from "../assets/boldCyan.svg";
import frame from "../assets/frame.svg";

const LeftView = () => {
  return (
    <div
      className={`flex w-[55%] flex-col justify-center px-20 py-8 bg-black text-white`}
    >
      <img className="w-[18%] pb-11" src={boldCyan} alt="bold" />
      <div className="pr-12">
        <h2 className="text-4xl font-bold pb-4">Welcome to Bold 👋</h2>
        <p className="font-normal text-lg text-semiGray pb-11">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, et!
          Tenetur quis error.
        </p>
        <div className="flex w-full justify-start">
        <img className="w-full max-h-[50vh]" src={frame} alt="frame" />
        </div>
      </div>
      
    </div>
  );
};

export default LeftView;
