import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({rev}) => {
    const {review,ratings,userName,user_photoURL}= rev;
  return (
     <div className="max-w-md bg-base-100 shadow-md rounded-2xl p-6">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-4xl text-primary  mb-4" />

      {/* Text */}
      <p className="">
        {review}
      </p>

      {/* Divider */}
      <div className="divider my-4"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-12 h-12 rounded-full bg-primary">
            <img src={user_photoURL} alt="" />
          </div>
        </div>

        {/* Name + Role */}
        <div>
          <h3 className="font-semibold text-base-content">
            {userName}
          </h3>
          <p className="text-sm text-base-content/60">
            Rating :{ratings}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard