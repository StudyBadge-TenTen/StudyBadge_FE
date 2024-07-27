declare namespace kakao.maps {
  function load(callback: () => void): void;

  class LatLng {
    constructor(lat: number, lng: number);
    getLat(): number;
    getLng(): number;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    setLevel(level: number): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  class Marker {
    constructor(options: MarkerOptions);
    getPosition(): LatLng;
  }

  interface MarkerOptions {
    position: LatLng;
    map: Map;
    title?: string;
  }

  class CustomOverlay {
    constructor(options: CustomOverlayOptions);
    setMap(map: Map | null): void;
    getContent(): HTMLElement;
  }

  interface CustomOverlayOptions {
    map: Map;
    position: LatLng;
    content: HTMLElement | string;
    xAnchor?: number;
    yAnchor?: number;
    zIndex?: number;
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions);
    open(map: Map, marker: Marker): void;
    setContent(content: string): void;
  }

  interface InfoWindowOptions {
    content: string;
  }

  namespace event {
    function addListener(target: any, type: string, handler: Function): void;
  }

  namespace services {
    class Places {
      constructor(map: Map);
      categorySearch(
        category: string,
        callback: (data: any[], status: services.Status, pagination: any) => void,
        options?: { useMapBounds: boolean },
      ): void;
    }

    enum Status {
      OK = "OK",
      ZERO_RESULT = "ZERO_RESULT",
      ERROR = "ERROR",
    }

    class Geocoder {
      addressSearch(address: string, callback: (result: GeocoderResult[], status: Status) => void): void;
    }

    interface GeocoderResult {
      address_name: string;
      y: string;
      x: string;
    }
  }
}
