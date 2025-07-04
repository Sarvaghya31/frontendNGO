import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LiveSearch({ allIssues }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim() === '') {
      setResults([]);
    } else {
      const filtered = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <div className="p-4 bg-amber-50">
      <input
        type="text"
        placeholder="Search issues..."
        value={query}
        onChange={handleChange}
        className="border border-amber-300 p-2 rounded w-full bg-white"
      />

      {query && (
        <div className="mt-4 space-y-3">
          {results.length > 0 ? (
            results.map(issue => (
              <Link
                key={issue._id}
                to={`/issues/${issue._id}`}
                className=" p-4 border h-36 flex rounded shadow hover:bg-gray-50 transition items-center justify-center"
              >
                <div className='w-32 h-32 flex justify-center items-center'>
                <img className=' object-cover w-28 h-28'  src={issue.images ? issue.images : '../public/noImage.jpg'}/>
                </div>
                <h2 className="font-semibold w-full ml-4">{issue.title}</h2>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 italic">No matching issue found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LiveSearch;
