import PropTypes from 'prop-types';

const Card = ({ imageUrl }) => {
  return (
    <a href="#" className="relative flex-1 block mx-3 bg-black group">
      <img
        alt=""
        src={imageUrl}
        className="absolute inset-0 object-cover w-full h-full transition-opacity opacity-75 group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium tracking-widest text-pink-500 uppercase">Developer</p>

        <p className="text-xl font-bold text-white sm:text-2xl">Tony Wayne</p>

        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="transition-all transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores quibusdam
              quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Card;
