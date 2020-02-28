import React from 'react';
import _ from 'lodash';
import tagFile from '../data/tags.json';

export const CharacterTable = ({ characters, filterTags }) => {

  const enhancedCharacters = _.mapValues(characters, (v, k) => ({ // Enhance the character table with additional data
    match: filterTags.length === 0 ? 1 : _.intersection(v.tags, filterTags).length / filterTags.length, // Calculate match as num between 0 and 1
    releaseOrder: +v.id
      .substr(0, v.id.indexOf('-') === -1 ? v.id.length : v.id.indexOf('-')) // Get the lowest of numbers if two provided (used for pokemon trainer 33-35)
      .replace('e', '.5'), // Replace 'e' with .5 to ensure that the list can easily be ordered by releaseOrder
    ...v
  }));

  return (
    <div>
      <div>
        Filtering by{' '}
        {filterTags.length > 0 ? (
          filterTags.map(v => tagFile[v].name).join(', ')
        ) : (
          <span className="italic">None</span>
        )}
      </div>
      <table>
        <thead className="bg-blue-500 border-solid border-2 border-blue-800">
          <tr>
            <th className="px-2">Match %</th>
            <th className="px-2">ID</th>
            <th className="px-2">Name</th>
            <th className="px-2">Tags</th>
          </tr>
        </thead>
        <tbody>
          {_(enhancedCharacters)
            .orderBy(['match', 'releaseOrder'], ['desc', 'asc'])
            .mapValues((v, k) => (
              <tr
                key={k}
                className="bg-blue-300 text-gray-900 border-b-2 border-blue-800 my-1"
              >
                <td className={`px-2 font-bold ${v.match>0.7 ? 'text-green-500' : v.match>0.5 ? 'text-orange-400' : 'text-red-500'}`}>{Math.round(v.match * 100)}%</td>
                <td className="px-2">{v.id}</td>
                <td className="px-2">{v.name}</td>
                <td className="px-2 flex flex-wrap">
                  {_(v.tags)
                  .sortBy(v=>tagFile[v].name)
                  .map(v => (
                    <span
                      className="bg-gray-300 text-gray-900 px-2 py-px mx-1 rounded-full"
                      key={v}
                    >
                      {tagFile[v].name}
                    </span>
                  )).value()}
                </td>
              </tr>
            ))
            .toArray()
            .value()}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
