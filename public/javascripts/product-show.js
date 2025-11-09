 mapboxgl.accessToken = 'pk.eyJ1IjoibWFrdHBuIiwiYSI6ImNtaG5ybGIzMjAzMG8yaXNpOTBwZ3BxN3QifQ.zL-xsr61P461W4oGBf4TpQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: product.coordinates,
      zoom: 4
    });

    var el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker(el)
      .setLngLat(product.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      .setHTML('<h5>' + product.title + '</h5><p>' + product.location + '</p>'))
      .addTo(map);

    // Carousel + Thumbnails Sync
    const carousel = document.getElementById('productCarousel');
    const carouselInstance = new bootstrap.Carousel(carousel);
    const thumbs = document.querySelectorAll('.thumb-img');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const index = parseInt(thumb.dataset.index);
        carouselInstance.to(index);
      });
    });

    carousel.addEventListener('slide.bs.carousel', function (e) {
      thumbs.forEach(t => t.classList.remove('thumb-active'));
      thumbs[e.to].classList.add('thumb-active');
    });