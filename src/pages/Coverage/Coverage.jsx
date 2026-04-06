import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef= useRef(null)
//   console.log(serviceCenters);

const handleSearch=(e)=>{
    e.preventDefault();
    const location=e.target.location.value;
    const district= serviceCenters.find(c=>c.district.toLowerCase().includes(location.toLowerCase()));
    if(district){
        const coord= [district.latitude, district.longitude]
        // console.log(district, coord);
        // Go To The Location
        mapRef.current.flyTo(coord, 10)
    }
}


  return (
    <div>
      <h2>We are available in 64 district</h2>
      {/* Search Option */}
      <div>
        <form onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow" placeholder="Search" name="location" />
           
          </label>
        </form>
      </div>

      {/* Map container */}
      <div className="border-2 border-teal-800 h-150 w-3/4 mx-auto">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-150"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker position={[center.latitude, center.longitude]} key={index}>
              <Popup>
                <strong className="font-semibold text-lg">
                  {center.district}
                </strong>{" "}
                <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
