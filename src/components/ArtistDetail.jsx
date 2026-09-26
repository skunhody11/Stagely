import react from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { getDatabase, ref, onValue, set as firebaseSet } from 'firebase/database';

export function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null)
  const [votes, setVotes] = useState(0);

useEffect(() => {
  const db = getDatabase();
  const artistRef = ref(db, `artists/${id}`);
  
  const unregisterFunction = onValue(artistRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setArtist(data);
      setVotes(data.votes);
    }
  });
  
  function cleanup() {
    unregisterFunction();
  }
  
  return cleanup;
}, [id]);


  if (!artist) {
        return (
      <div className="container-fluid px-4">
        <div className="row mt-4">
          <div className="col-12">
            <h2>Artist not found!</h2>
            <p className="text-muted">
              No artist matches id: <strong>{id}</strong>
            </p>
            <Link to="/artists" className="btn btn-outline-dark">Back</Link>
          </div>
        </div>
      </div>
    );
  }

    const handleVote = () => {
    const newVotes = votes + 1;
    setVotes(newVotes);
    
    const db = getDatabase();
    const votesRef = ref(db, `artists/${id}/votes`);
    firebaseSet(votesRef, newVotes)
      .catch((err) => console.log(err));
  };


  return (
        <div className="container-fluid px-4">
      <div className="row">

    {/* <!-- Card 1 --> */}
        <div className="col-12 d-flex">
          <div className="card mt-4 mb-4 w-100">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-auto col-xl-12">
                  <img src={artist.image} alt={artist.name} className=" img-fluid pb-3" />
                </div>
                  <div className="col-sm col-xl-12">
                    <h2 className="card-title">{artist.name}</h2>
                    <p className="card-text">{artist.votes.toLocaleString()} votes</p>
                    <p>{artist.description}</p>
                    <Link to="#" className="btn btn-dark" onClick={handleVote}>Vote</Link>
                    <div className="mt-3">
                    <Link to="/artists" className="btn btn-outline-dark">Back to Artists</Link>
                    </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}