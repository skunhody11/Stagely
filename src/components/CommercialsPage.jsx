import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getDatabase, ref, onValue } from 'firebase/database';

function CommercialCard({ commercial, rank }) {
  return (
    <div className="col-md-6 col-xl-3 d-flex">
      <div className="card mt-4 mb-4 w-100">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-auto col-xl-12">
              <h5 className="text-muted">#{rank}</h5>
              <img src={commercial.image} alt={commercial.name} className="img-fluid pb-3"/>
            </div>
            <div className="col-sm col-xl-12">
              <h2 className="card-title">{commercial.name}</h2>
              <p className="card-text"> {commercial.votes.toLocaleString()} votes</p>
              <Link to={`/commercials/${commercial.id}`} className="btn btn-dark">View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommercialsPage() {
  const [sortBy, setSortBy] = useState('votes');
  const [searchTerm, setSearchTerm] = useState('');
  const [commercialsFromFirebase, setCommercialsFromFirebase] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const commercialsRef = ref(db, 'commercials');

    const unregisterFunction = onValue(commercialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commercialsArray = Object.keys(data).map((key) => ({
          ...data[key], id: Number(key)
        }));
        setCommercialsFromFirebase(commercialsArray);
      }
    });

    function cleanup() {
      unregisterFunction();
    }

    return cleanup;
  }, []);

  // Filter commercials by search term
  const filteredCommercials = commercialsFromFirebase.filter(commercial =>
    commercial.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort commercials
  const sortedCommercials = [...filteredCommercials].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Group commercials into rows of 4
  const rows = [];
  for (let i = 0; i < sortedCommercials.length; i += 4) {
    rows.push(sortedCommercials.slice(i, i + 4));
  }

  return (
    <main>
      <div className="container-fluid px-4">
        {/* Search and Sort Controls */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-3">Search & Sort Commercials</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search commercials by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="btn-group w-100" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        name="sortOptions"
                        id="sortVotes"
                        value="votes"
                        checked={sortBy === 'votes'}
                        onChange={() => setSortBy('votes')}
                      />
                      <label className="btn btn-outline-dark" htmlFor="sortVotes">
                        Sort by Votes
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="sortOptions"
                        id="sortName"
                        value="name"
                        checked={sortBy === 'name'}
                        onChange={() => setSortBy('name')}
                      />
                      <label className="btn btn-outline-dark" htmlFor="sortName">
                        Sort by Name
                      </label>
                    </div>
                  </div>
                </div>
                <p className="text-muted">{sortedCommercials.length} commercial(s) found</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commercials Grid */}
        {sortedCommercials.length > 0 ? (
          rows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((commercial, index) => (
  <CommercialCard
    key={commercial.id}
    commercial={commercial}
    rank={rowIndex * 4 + index + 1}
  />
))}
            </div>
          ))
        ) : (
          <div className="row mt-4">
            <div className="col-12">
              <p className="text-center text-muted">No commercials found matching your search.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}