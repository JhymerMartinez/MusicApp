import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePause, handlePlay }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">
      {`More by ${data?.[0]?.artist?.name}`}
    </h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, idx) => (
        <SongBar
          key={song?.id}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          i={idx}
          handlePause={handlePause}
          handlePlay={handlePlay}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
