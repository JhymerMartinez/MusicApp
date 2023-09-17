import { Link } from 'react-router-dom';

const RelatedArtists = ({ data }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">
      Related Artists
    </h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((artist, idx) => (
        <Link to={`/artists/${artist?.id}`}>
          <div className="w-full flex flex-row items-center bg-[#473b6c] hover:bg-[#4c426e]  bg-transparent py-2 p-4 rounded-lg cursor-pointer mb-2">
            <h3 className="font-bold text-base text-white mr-3">{idx + 1}.</h3>
            <div className="flex-1 flex flex-row justify-between items-center">
              <img
                className="w-20 h-20 rounded-lg"
                src={artist?.picture_medium}
                alt={artist?.name}
              />
              <div className="flex-1 flex flex-col justify-center mx-3">

                <p className="text-xl font-bold text-white">
                  {artist?.name}
                </p>

                <p className="text-gray-400 text-lg">{artist?.nb_fan} fans</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>

  </div>
);

export default RelatedArtists;
