import MapImg from './maps.png';

export function MaspSmSx() {
  return <>
    <div className="maps">
      <h3 className='maps-title'>I´m from 2 different worlds ...</h3>
      <div className="maps-img">
        <img src={MapImg} alt="map" />
      </div>
      <div className="maps-info">
        <div className='maps-info__cell'>
          Countries of Citizenship:
        </div>
        <div className='maps-info__cell'>
          Mexico, USA
        </div>

        <div className='maps-info__cell'>
          Cities of Residency:
        </div>
        <div className='maps-info__cell'>
          Seattle, Washington Mexico City
        </div>

        <div className='maps-info__cell'>
          Languages:
        </div>
        <div className='maps-info__cell'>
          English, Spanish
        </div>
      </div>
    </div>
  </>
}