import { useParams } from 'react-router-dom';
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

  const details = [
    {
      title: 'Title',
      value: songData?.title,
    },
    {
      title: 'Artist',
      value: songData?.artist.name,
    },
    {
      title: 'Album',
      value: songData?.album.title,
    },
    {
      title: 'Duration',
      value: convertToMins(songData?.duration || 0),
    },
    {
      title: 'Deezer Link',
      value: <a href={songData?.link}>{songData?.link}</a>,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Song Details
        </h2>
      </div>
      <div className="">
        <div className="w-full flex items-center justify-center">
          <img src={songData?.album?.cover_medium} alt="song_img" className="rounded-lg" />
        </div>
        {details.map(({ title, value }) => (
          <div className="mt-3">
            <h3 className="text-white text-xl font-bold">{title}</h3>
            <div className="text-white">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongDetails;
