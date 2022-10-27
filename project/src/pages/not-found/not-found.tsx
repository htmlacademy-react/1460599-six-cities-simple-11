import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

function NotFound() {
  return (
    <>
      <Header />
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' ,flexDirection: 'column', height: 'calc(100vh - 80px)'}}>
        <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', clipPath: 'polygon(0 70%, 100% 30%, 100% 100%, 0 100%)', backgroundColor: '#4481C3', opacity: '0.15'}}></div>
        <h1 style={{position: 'relative', marginTop: '0' ,marginBottom: '50px', color: '#4481C3', fontSize: '80px'}}>PAGE NOT FOUND :|</h1>
        <img src="img/not-found.jpg" alt="" style={{position: 'relative', width: '500px', height: '400px', marginBottom: '55px'}} />
        <Link to="/" style={{ position: 'relative', padding: '15px', textTransform: 'uppercase', backgroundColor: '#4481C3', color: '#fff'}}>На главную!</Link>
      </div>
    </>
  );
}

export default NotFound;
