import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetTopSongsByArtistQuery } from '../redux/services/deezer';

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
  const { data: relatedSongs, isFetching: isFetchingRelatedSongs } = useGetTopSongsByArtistQuery({
    artistId: songData?.artist?.id,
  }, {
    skip: !songData?.artist?.id,
  });

  if (isFetchingSongData || isFetchingRelatedSongs) return <Loader title="Searching song details..." />;
  if (error) return <Error title="Oops! Something went wrong." />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedSongs, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <h2 className="text-white text-3xl font-bold">
          Song Details
        </h2>
      </div>
      <div className="w-full p-3 mb-5">
        <div className="w-full flex items-left justify-left sm:h-48 h-28 mb-3 bg-gradient-to-l from-transparent to-black py-4">
          <img
            src={songData?.album?.cover_medium}
            alt="song_img"
            className="rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="flex items-left justify-center flex-col ml-5">
            <h3 className="text-white text-2xl font-bold">{songData?.title}</h3>
            <p className="text-white text-xl mb-2">{songData?.album?.title}</p>
            <Link to={`/artists/${songData?.artist?.id}`}>
              <p className="text-gray-400 hover:text-blue-400 text-lg mb-1">
                {songData?.artist?.name}
              </p>
            </Link>
            <p className="text-gray-400">{convertToMins(songData?.duration || 0)}</p>
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
      <RelatedSongs
        data={relatedSongs}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
