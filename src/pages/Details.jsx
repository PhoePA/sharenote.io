import { Link } from "react-router-dom";

const Details = () => {
  return (
    <section className="p-10 mx-3">
      <Link
        to={"/"}
        className=" text-teal-600 font-medium mx-4 block text-right"
      >
        Back
      </Link>
      <div className=" border shadow-lg border-t-4 border-t-teal-600 p-3 mt-5 rounded">
        <h3 className=" text-3xl font-medium">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h3>
        <p className=" text-base indent-10 text-justify">
          What if the last line of the list is what I want to write but not what
          the reader wants to read and the expected moment of the peak to the
          story between the best and strongest man for everyone and the
          mightiest anit-hero?
        </p>
      </div>
    </section>
  );
};

export default Details;
