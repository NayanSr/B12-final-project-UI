import bookingIcon from "../../../assets/bookingIcon.png";
const HowItWorks = () => {
  const data = [
    {
      icon: bookingIcon,
      heading: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      id: 1,
    },
    {
      icon: bookingIcon,
      heading: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      id: 2,
    },
    {
      icon: bookingIcon,
      heading: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      id: 3,
    },
    {
      icon: bookingIcon,
      heading: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      id: 4,
    },
  ];
  return (
    <div className="my-4">
      <h3 className="text-4xl font-semibold text-center">How It Works</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {data.map((dt) => (
          <div
            key={dt.id}
            className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition duration-300"
          >
            <img
              src={dt.icon}
              alt={dt.heading}
              className="w-12 h-12 mx-auto mb-4"
            />

            <h2 className="text-lg font-semibold mb-2">{dt.heading}</h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              {dt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
