import safeDelivery from '../../../assets/safe-delivery.png'
const AbouteService = () => {
 const data = [
    {
      icon: safeDelivery,
      heading: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      id: 1,
    },
    {
      icon: safeDelivery,
      heading: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      id: 2,
    },
    {
      icon: safeDelivery,
      heading: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      id: 3,
    }
  ];




  return (
    <div className="border-b-2 border-dashed border-gray-700 pb-4">
        {
            data.map(dt=><div key={dt.id} className='bg-white mt-6 rounded-2xl'>
                <section className='grid grid-cols-9 items-center'>
                <img src={dt.icon} alt="" className='col-span-2' />
                <section className='col-span-7 text-left  h-40 border-l-2 border-dashed pl-12'>
                    <h2 className='text-4xl mb-2'>{dt.heading}</h2>
                    <p>{dt.description}</p>
                </section>

                </section>

            </div>)
        }

    </div>
  )
}

export default AbouteService