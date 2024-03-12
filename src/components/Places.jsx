export default function Places({ title, places, fallbackText, onSelectPlace,isloading,loadingtext}) {
  // console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isloading && <p className="fallback-text">{loadingtext}</p>}
      {!isloading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!isloading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`https://placepicker-backend-2xbl60eqm-sahil-ganis-projects.vercel.app/${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
