function Loader() {
  return (
    <div style={{ width: '800px', height: '789px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="lds-ring" style={{ marginLeft: '-32px', marginTop: '-32px' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
