import MapImg from './maps.png';

export function MaspMdLg() {
  return <>
    <div className="maps">
      <h3 className='maps-title'>I´m from 2 different worlds ...</h3>
      <div className="maps-img">
        <img src={MapImg} alt="map" />
      </div>
      <div className="maps-info">
        <div>
          Countries of Citizenship:
        </div>
        <div>
          Mexico, USA
        </div>

        <div>
          Cities of Residency:
        </div>
        <div>
          Seattle, Washington Mexico City
        </div>

        <div>
          Languages:
        </div>
        <div>
          English, Spanish
        </div>
      </div>
    </div>
  </>
}