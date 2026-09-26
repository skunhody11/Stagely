import react from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { getDatabase, ref, onValue, set as firebaseSet } from 'firebase/database';

export function CommercialDetail() {
  const { id } = useParams();
  const [commercial, setCommercial] = useState(null);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
  const db = getDatabase();
  const commercialRef = ref(db, `commercials/${id}`);
  
  const unregisterFunction = onValue(commercialRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      setCommercial(data);
      setVotes(data.votes);
    }
  });
  
  function cleanup() {
    unregisterFunction();
  }
  
  return cleanup;
}, [id]);


  if (!commercial) {
    return (
      <div className="container-fluid px-4">
        <div className="row mt-4">
          <div className="col-12">
            <h2>Commercial not found!</h2>
            <p className="text-muted">
              No commercial matches id: <strong>{id}</strong>
            </p>
            <Link to="/commercials" className="btn btn-outline-dark">Back</Link>
          </div>
        </div>
      </div>
    );
  }

    const handleVote = () => {
      const newVotes = votes + 1;
      setVotes(newVotes);
    
      const db = getDatabase();
      const votesRef = ref(db, `commercials/${id}/votes`);
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
                  <img src={commercial.image} alt={commercial.name} className=" img-fluid pb-3" />
                </div>
                  <div className="col-sm col-xl-12">
                    <h2 className="card-title">{commercial.name}</h2>
                    <p className="card-text">#{commercial.rank} {votes.toLocaleString()} votes</p>
                    <p>{commercial.description}</p>
                    <Link to="#" className="btn btn-dark" onClick={handleVote}>Vote</Link>
                    <div className="mt-3">
                      <Link to="/commercials" className="btn btn-outline-dark">Back to Commercials</Link>
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