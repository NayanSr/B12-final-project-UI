import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const serviceCenters= useLoaderData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  // getting region name without duplication from loaded data
  const regionsDuplicated= serviceCenters.map(ct=>ct.region);
  const regions= [...new Set(regionsDuplicated)];
  const senderRegionVar= useWatch({control, name:'senderRegion'});
  const receiverRegionVar= useWatch({control, name:'receiverRegion'});
  console.log(senderRegionVar, receiverRegionVar)

  // loading districts for selectrd region
  const districtsByRegion=region=>{
    const regionDistricts= serviceCenters.filter(c=>c.region===region);
    const districts= regionDistricts.map(d=>d.district);
    return districts;
  }

  // console.log(regions); 

  

  const handleSendParcel = (data) => {
    console.log(data);
  };

  return (
    <div className="px-4">
      <h2 className="text-4xl font-semibold mt-2">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* Parcel Type */}
        <div className="my-4">
          <label className="label mr-8">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>

        {/* parcel info: name, weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-4">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Your Name"
              {...register("parcelName")}
            />
          </fieldset>
          <fieldset className="fieldset ">
            <label className="label">Weight</label>
            <input
              type="number"
              className="input w-full"
              placeholder="Parcel Weight (kg)"
              {...register("weight")}
            />
          </fieldset>
        </div>

        {/* to column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info */}
          <div>
            <h2 className="text-2xl font-semibold">Sender Info</h2>
            <fieldset className="fieldset ">
              {/* sender Name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Sender Name"
                {...register("senderName")}
              />

              {/* sender Email */}
              <label className="label">Sender Email</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Sender Email"
                {...register("senderEmail")}
              />

              {/* Sender Region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender region</legend>
                <select {...register('senderRegion')} defaultValue="Pick a region" className="select w-full">
                  <option disabled={true}>Pick a region</option>                  
                  {regions.map((r,i)=> <option key={i} value={r}>{r}</option>)} 
                </select>
                <span className="label">Optional</span>
              </fieldset>


              {/* Sender Districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Districts</legend>
                <select {...register('senderDistrict')} defaultValue="Pick a district" className="select w-full">
                  <option disabled={true}>Pick a district</option>                  
                  {districtsByRegion(senderRegionVar).map((r,i)=> <option key={i} value={r}>{r}</option>)} 
                </select>
                <span className="label">Optional</span>
              </fieldset>

           

              {/* sender address */}
              <label className="label">Sender Address</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Sender Address"
                {...register("senderAddress")}
              />

              {/* sender phone */}
              <label className="label">Sender Phone Number</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Sender Phone"
                {...register("senderPhone")}
              />

              {/* sender Pickup */}
              <label className="label">Pickup Instruction</label>
              <input
                type="text"
                className="textarea w-full mb-4"
                placeholder="Sender Pickup"
                {...register("senderPickup")}
              />
            </fieldset>
          </div>

          {/* Receiver info */}
          <div>
            <h2 className="text-2xl font-semibold">Receiver Info</h2>
            <fieldset className="fieldset ">
              {/* Receiver Name */}
              <label className="label">Receiver Name</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Receiver Name"
                {...register("receiverName")}
              />

              {/* Receiver Email */}
              <label className="label">Receiver Email</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Receiver Email"
                {...register("receiverEmail")}
              />

              {/* Receiver Region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver region</legend>
                <select {...register('receiverRegion')} defaultValue="Pick a region" className="select w-full">
                  <option disabled={true}>Pick a region</option>                  
                  {regions.map((r,i)=> <option key={i} value={r}>{r}</option>)} 
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/* Receiver District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver District</legend>
                <select {...register('receiverDistrict')} defaultValue="Pick a region" className="select w-full">
                  <option disabled={true}>Pick a District</option>                  
                  {districtsByRegion(receiverRegionVar).map((r,i)=> <option key={i} value={r}>{r}</option>)} 
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/* Receiver address */}
              <label className="label">Receiver Address</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Receiver Address"
                {...register("receiverAddress")}
              />

              {/* Receiver phone */}
              <label className="label">Receiver Phone Number</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Receiver Phone"
                {...register("receiverPhone")}
              />

              {/* Receiver Pickup */}
              <label className="label">Pickup Instruction</label>
              <input
                type="text"
                className="textarea w-full mb-4"
                placeholder="Receiver Pickup"
                {...register("receiverPickup")}
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          value="✔  Send Parcel"
          className="btn btn-secondary w-full text-green-500 text-xl font-semibold"
        />
      </form>
    </div>
  );
};

export default SendParcel;
