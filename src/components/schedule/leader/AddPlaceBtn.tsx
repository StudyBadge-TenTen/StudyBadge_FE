const AddPlaceBtn = (): JSX.Element => {
  return (
    <div className="w-full px-6 mt-8">
      <span className="mr-12">장소</span>
      <button type="button" className="btn-blue px-12">
        지도에서 선택
      </button>
    </div>
  );
};

export default AddPlaceBtn;
