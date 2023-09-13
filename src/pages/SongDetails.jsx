import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery } from '../redux/services/deezer';

const convertToMins = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} minutes ${secs} seconds`;
};

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongData, error } = useGetSongDetailsQuery({ songId });

  if (isFetchingSongData) return <Loader title="Loading song..." />;
  if (error) return <Error title="Oops! Something went wrong." />;

  return (
    <div className="flex flex-col">
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Song Details
        </h2>
      </div>
      <div className="w-full bg-gradient-to-l from-transparent to-black p-3">
        <div className="w-full flex items-left justify-left sm:h-48 h-28 mb-3">
          <img
            src={songData?.album?.cover_medium}
            alt="song_img"
            className="rounded-full object-cover border-2 shadow-xl shadow-black"
          />
        </div>
        <div className="mt-3">
          <p className="text-white text-lg font-bold">Title</p>
          <p className="text-gray-400">{songData?.title}</p>
        </div>
        <div className="mt-3">
          <p className="text-white text-lg font-bold">Artist</p>
          <Link to={`/artists/${songData?.artist?.id}`}>
            <p className="text-gray-400 hover:text-blue-400">
              {songData?.artist.name}
            </p>
          </Link>
        </div>
        <div className="mt-3">
          <p className="text-white text-lg font-bold">Album</p>
          <p className="text-gray-400">{songData?.album.title}</p>
        </div>
        <div className="mt-3">
          <p className="text-white text-lg font-bold">Duration</p>
          <p className="text-gray-400">{convertToMins(songData?.duration || 0)}</p>
        </div>
        <div className="mt-3">
          <p className="text-white text-lg font-bold">Deezer Link</p>
          <a
            href={songData?.link}
            className="text-gray-400 hover:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            {songData?.link}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
