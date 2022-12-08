function Loader(): JSX.Element {
  return (
    <div data-testid="loader-element" className="lds-ring" style={{ marginLeft: '-32px', marginTop: '-32px' }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
