import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function ArtistCard({ artist }) {
  return (
    <div className="col-md-6 col-xl-3 d-flex">
      <div className="card mt-4 mb-4 w-100">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-auto col-xl-12">
              <img src={artist.image} alt={artist.name} className="img-fluid pb-3" />
            </div>
            <div className="col-sm col-xl-12">
              <h2 className="card-title">{artist.name}</h2>
              <p className="card-text">#{artist.rank} {artist.votes.toLocaleString()} votes</p>
              <Link to="/artists" className="btn btn-dark">See More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommercialCard({ commercial }) {
  return (
    <div className="col-md-6 col-xl-3 d-flex">
      <div className="card mt-4 mb-4 w-100">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-auto col-xl-12">
              <img src={commercial.image} alt={commercial.name} className="img-fluid pb-3" />
            </div>
            <div className="col-sm col-xl-12">
              <h2 className="card-title">{commercial.name}</h2>
              <p className="card-text">#{commercial.rank} {commercial.votes.toLocaleString()} votes</p>
              <Link to="/commercials" className="btn btn-dark">See More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IndexPage() {
  // Show top 3 artists and top 3 commercials on the home page with updated votes
  const [topArtistsFromFirebase, setTopArtistsFromFirebase] = useState([]);
  const [topCommercialsFromFirebase, setTopCommercialsFromFirebase] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const artistsRef = ref(db, 'artists');
    const commercialsRef = ref(db, 'commercials');

    
    const unregisterFunctionArtists = onValue(artistsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const artistsArray = Object.keys(data).map((key) => {
          return { ...data[key], id: Number(key) };
        });
        const sortedByVotes = artistsArray.sort((a, b) => b.votes - a.votes);
        const top3 = sortedByVotes.slice(0, 3);
        setTopArtistsFromFirebase(top3);
      }
    });

        const unregisterFunctionCommercials = onValue(commercialsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const commercialsArray = Object.keys(data).map((key) => {
              return { ...data[key], id: Number(key) };
            });
        const sortedByVotes = commercialsArray.sort((a, b) => b.votes - a.votes);
        const top3 = sortedByVotes.slice(0,3);
        setTopCommercialsFromFirebase(top3);
      }
    });
    
    function cleanup() {
      unregisterFunctionArtists();
      unregisterFunctionCommercials();
    }
    
    return cleanup;
  }, []);

  
  const topArtists = topArtistsFromFirebase;
  const topCommercials = topCommercialsFromFirebase;

    const artistCardElements = topArtists.map((artist) => {
    return <ArtistCard key={artist.id} artist={artist} />;
  });
  
  const commercialCardElements = topCommercials.map((commercial) => {
    return <CommercialCard key={commercial.id} commercial={commercial} />;
  });

  return (
    <main>
      <div className="container-fluid px-4">
        <p className="lead mt-4">Vote for your favorite artist to headline!</p>
        <div className="row">
          {artistCardElements}
        </div>

        <p className="lead">Vote your favorite commercial!!</p>
        <div className="row">
          {commercialCardElements}
        </div>
      </div>
    </main>
  );
}