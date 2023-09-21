import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetArtistDetailsQuery, useGetRelatedArtistsByArtistQuery, useGetTopSongsByArtistQuery } from '../redux/services/deezer';
import { deezer } from '../assets';
import RelatedArtists from '../components/RelatedArtists';

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistData, error } = useGetArtistDetailsQuery({ artistId });
  const { data: relatedArtists, isFetching: isFetchingRelatedArtists } = useGetRelatedArtistsByArtistQuery({
    artistId,
  });
  const { data: relatedSongs, isFetching: isFetchingRelatedSongs } = useGetTopSongsByArtistQuery({
    artistId,
  });

  if (isFetchingArtistData || isFetchingRelatedArtists || isFetchingRelatedSongs) return <Loader title="Loading artist details..." />;
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
      <div className="w-full p-3 mb-5">
        <div className="w-full flex items-left justify-left sm:h-48 h-28 bg-gradient-to-l from-transparent to-black rounded-l-full">
          <img
            src={artistData?.picture_medium}
            alt="artist_img"
            className="rounded-full border-2 shadow-xl shadow-black"
          />
          <div className="flex items-left justify-center flex-col ml-5">
            <h3 className="text-white text-2xl font-bold">{artistData?.name}</h3>
            <p className="text-gray-400 text-lg">{artistData?.nb_fan} fans</p>
            <a
              href={artistData?.share}
              target="_blank"
              rel="noreferrer"
            >
              <img src={deezer} alt="deezer_logo" className="w-10 mt-5" />
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
      <div className="mb-10" />
      <RelatedArtists data={relatedArtists} />
    </div>
  );
};

export default ArtistDetails;
