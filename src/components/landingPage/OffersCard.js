import cod from "@/images/cod.svg";
import delivery from "@/images/delivery.png";
import timeMoney from "@/images/time-is-money.svg";

const Statistic = ({ icon, title, reverse = false, description }) => (
  <div
    className={`flex ${reverse ? "flex-row-reverse" : "flex-row"} flex-1 justify-around items-center w-full sm:w-5/6 bg-midnightBlue-900 bg-opacity-70 rounded-lg p-4 transition-transform transform hover:scale-105 cursor-pointer`}
  >
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-lg">{description}</div>
    </div>
  </div>
);

const OffersCard = () => {
  return (
    <div className="py-12 flex justify-center bg-gradient-to-b from-darkMagneta-600 to-midnightBlue-700 text-white">
      <div className="flex flex-col items-center space-y-5 w-full 2xl:max-w-7xl xl:max-w-5xl lg:max-w-4xl max-w-2xl xl:p-8 lg:p-5 p-3">
        <Statistic
          icon={<img src={cod.src} className="h-28" alt="cod" />}
          title="Cash on delivery discount"
          description={
            <div>
              <span className="font-bold text-blue-600">10% OFF </span>
              <span>Discount applied on delivery</span>
            </div>
          }
        />
        {/*<div className="w-0.5 bg-white opacity-50 self-stretch my-5 md:block hidden"></div>*/}
        <Statistic
          icon={<img src={delivery.src} className="h-28" alt="delivery" />}
          title="Same day delivery"
          reverse
          description={
            <div>
              For{" "}
              <span className="font-semibold italic text-blue-600">
                Lorem ipsum
              </span>
              ,
              <span className="font-semibold italic text-blue-600 ml-1">
                Lorem ipsum
              </span>
              ,
              <span className="font-semibold italic text-blue-600 ml-1">
                Lorem ipsum
              </span>
            </div>
          }
        />
        {/*<div className="w-0.5 bg-white opacity-50 self-stretch my-5 md:block hidden"></div>*/}
        <Statistic
          icon={<img src={timeMoney.src} className="h-28" alt="time-money" />}
          title="Min. $40 order & 3 hour notice"
          description="Delivery through the day"
        />
      </div>
    </div>
  );
};

export default OffersCard;
