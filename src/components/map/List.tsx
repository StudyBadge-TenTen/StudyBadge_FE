import React from 'react';
import { useMapStore } from '../../store/map-store';

const CafeList: React.FC = () => {
  const { locates, selectedLocates, selectLocate } = useMapStore();

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">주변 스터디 카페</h2>
      <div className="max-h-[200px] overflow-y-auto">
        <ul>
          {locates.map((locates) => (
            <li 
              key={locates.id} 
              onClick={() => selectLocate(locates)}
              className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedLocates?.id === locates.id ? 'bg-gray-200' : ''}`}
            >
              {locates.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedLocates && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">선택된 카페</h3>
          <p>이름: {selectedLocates.name}</p>
          <p>주소: {selectedLocates.address}</p>
        </div>
      )}
    </div>
  );
};

export default CafeList;