import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicated = serviceCenters?.map((ct) => ct.region);
  const regions = [...new Set(regionsDuplicated)];
  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data)
    .then(res => {
      if (res.data.insertedId) {
        // use toast
        alert("Applied for be a rider");
      }
    });
  };

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold">Be a Rider</h2>
      <form onSubmit={handleSubmit(handleRiderApplication)}>
        {/* to column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* rider info */}
          <div>
            <h2 className="text-2xl font-semibold">Rider Info</h2>
            <fieldset className="fieldset ">
              {/* rider Name */}
              <label className="label">Rider Name</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Rider Name"
                defaultValue={user?.displayName}
                {...register("name")}
              />

              {/* rider Email */}
              <label className="label">Rider Email</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Rider Email"
                defaultValue={user?.email}
                {...register("email")}
              />

              {/* rider Region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Regions</legend>
                <select
                  {...register("region")}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/* rider Districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend"> Districts</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtsByRegion(riderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <span className="label">Optional</span>
              </fieldset>

              {/* rider address */}
              <label className="label">Your Address</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Your Address"
                {...register("address")}
              />

              {/* rider phone */}
              <label className="label">Your Phone Number</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Your Phone"
                {...register("phone")}
              />

              {/* rider Pickup */}
              <label className="label">Pickup Instruction</label>
              <input
                type="text"
                className="textarea w-full mb-4"
                placeholder="rider Pickup"
                {...register("riderPickup")}
              />
            </fieldset>
          </div>

          {/* Receiver info */}
          <div>
            <h2 className="text-2xl font-semibold">More Info</h2>
            <fieldset className="fieldset ">
              {/* License */}
              <label className="label">Driving License</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="Driving License"
                {...register("license")}
              />

              {/*  NID */}
              <label className="label">NID</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="NID"
                {...register("nid")}
              />

              {/* Receiver address */}
              <label className="label">BIKE</label>
              <input
                type="text"
                className="input w-full mb-4"
                placeholder="BIKE"
                {...register("bike")}
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          value="✔  Apply for Rider"
          className="btn btn-secondary w-full text-green-500 text-xl font-semibold"
        />
      </form>
    </div>
  );
};

export default Rider;
