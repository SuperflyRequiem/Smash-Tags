import React, { useState } from 'react';
import _ from 'lodash';

import FilterField from './component/FilterField.js';
import CharacterTable from './component/CharacterTable.js';
import characterFile from './data/characters.json';

import tagFile from './data/tags.json';

function App() {
  console.log(tagFile);
  const [tags, setTags] = useState([]);

  const addTag = tag => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = tag => {
    if (tags.includes(tag)) {
      setTags(_.filter(tags, v => v !== tag));
    }
  };

  const onFilterToggle = tagName => tagState => {
    tagState ? addTag(tagName) : removeTag(tagName);
  };

  return (
    <div className="bg-gray-900 m-0 p-4 min-h-screen">
      <div className="bg-gray-700 p-4 rounded bg-white text-gray-200">
        <div className="font-bold text-3xl">Smash Tag Search <span className="text-base">Check out this project on <a className="underline text-blue-300 hover:text-blue-500" href="https://github.com/SuperflyRequiem/Smash-Tags">Github</a></span></div>
        <div className="font-bold text-xl">Choose tags to include</div>
        <div className="flex flex-wrap">
          {_(tagFile)
            .mapValues((v, k) => (
              <FilterField key={k} name={v.name} onChange={onFilterToggle(k)} />
            ))
            .toArray()
            .value()}
        </div>
        <CharacterTable characters={characterFile} filterTags={tags} />
      </div>
    </div>
  );
}

export default App;
