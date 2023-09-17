import { useSelector } from 'react-redux';
import { useGetTopSongsByGenreQuery } from '../redux/services/deezer';
import { Error, Loader, SongCard } from '../components';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopSongsByGenreQuery(); // All genres

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error title="Oops! Something went wrong." />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Songs
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((song, idx) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={idx}
          />
        ))}
      </div>

    </div>
  );
};

export default TopCharts;
