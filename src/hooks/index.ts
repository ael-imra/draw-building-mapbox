import mapbox, { FillExtrusionLayer, GeoJSONSource, LineLayer, Map } from 'mapbox-gl';
import * as turf from '@turf/turf';
import { useEffect, useRef, useState } from 'react';
import { SettingsState } from '../Components/SettingsModal/types';
import { INITIAL_STATE } from '../Components/SettingsModal';

mapbox.accessToken = process.env.REACT_APP_MAP_KEY as string;

export const useMap = (geoJson: any) => {
  const map = useRef<Map | null>(null);
  const container = useRef<any | null>(null);

  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    if (!map.current) {
      map.current = new mapbox.Map({
        container: container.current,
        style: 'mapbox://styles/brave123/cldlnbhah004c01t9f6j38t4j',
      });
    }
  }, []);

  useEffect(() => {
    if (geoJson && map.current) {
      clearSource();
      map.current.addSource('source_1', {
        type: 'geojson',
        data: geoJson,
      });
      const bbox = turf.bbox(geoJson);
      map.current.flyTo({
        center: [bbox[2], bbox[3]],
        zoom: 18,
        pitch: 60,
      });
      addConverage(INITIAL_STATE);
      addFloors(INITIAL_STATE);
      resizeFloors(INITIAL_STATE);
    }
    // eslint-disable-next-line
  }, [geoJson]);

  const addLayer = (props: LineLayer | FillExtrusionLayer) => {
    if (map.current && geoJson) {
      if (map.current.getLayer(props.id)) {
        if (props.paint) {
          for (const [key, value] of Object.entries(props.paint)) {
            map.current.setPaintProperty(props.id, key, value);
          }
        }
      } else map.current.addLayer(props);
    }
  };

  const addFloors = (settings: SettingsState) => {
    const { floorNumber, floorHeight } = settings;
    if (map.current && geoJson) {
      for (let i = 0; i < floorNumber; i++) {
        addLayer({
          id: `layer_${i}`,
          type: 'fill-extrusion',
          paint: {
            'fill-extrusion-color': '#f9d272',
            'fill-extrusion-height': floorHeight * (i + 1),
            'fill-extrusion-base': i * floorHeight + 1,
          },
          source: 'source_1',
        });
      }
      getStatistics(settings);

      const buildingHeight = floorHeight * floorNumber;
      if (buildingHeight > 0) {
        const zoom = 17 - Math.log2(buildingHeight / 150);
        map.current?.setZoom(zoom);
      }
    }
  };

  const resizeFloors = (settings: SettingsState) => {
    const { floorNumber, floorHeight } = settings;
    if (map.current && geoJson) {
      for (let i = 0; i < floorNumber; i++) {
        map.current.setPaintProperty(`layer_${i}`, 'fill-extrusion-height', floorHeight * (i + 1));
        map.current.setPaintProperty(`layer_${i}`, 'fill-extrusion-base', i * floorHeight + 1);
      }
      getStatistics(settings);
      const buildingHeight = floorHeight * floorNumber;
      if (buildingHeight > 0) {
        const zoom = 17 - Math.log2(buildingHeight / 150);
        map.current?.setZoom(zoom);
      }
    }
  };

  const addConverage = (settings: SettingsState) => {
    if (map.current && geoJson) {
      const bbox = turf.transformScale(geoJson, settings.coverage / 100 + 1);
      const source = map.current.getSource('coverage') as GeoJSONSource;
      if (source) source.setData(bbox);
      else
        map.current?.addSource('coverage', {
          type: 'geojson',
          data: bbox,
        });
      addLayer({
        id: 'coverage',
        type: 'fill-extrusion',
        paint: {
          'fill-extrusion-color': '#dcf0e1',
        },
        source: 'coverage',
      });
      addLayer({
        id: 'coverage_border',
        type: 'line',
        paint: {
          'line-color': '#5d605c',
          'line-width': 3,
          'line-dasharray': [7, 3, 4],
        },
        source: 'coverage',
      });
      getStatistics(settings);
    }
  };

  const clearSource = () => {
    if (map.current) {
      const { layers } = map.current.getStyle();
      for (const layer of layers)
        if (layer.id.indexOf('layer_') > -1 || layer.id.indexOf('coverage') > -1) map.current.removeLayer(layer.id);
      if (map.current.getSource('source_1')) map.current.removeSource('source_1');
      if (map.current.getSource('coverage')) map.current.removeSource('coverage');
    }
  };

  const getStatistics = (settings: SettingsState) => {
    if (geoJson) {
      const { floorHeight, floorNumber } = settings;

      const buildingArea = turf.round(turf.area(geoJson));
      const bboxTransformed = turf.transformScale(geoJson, settings.coverage / 100 + 1);
      const landArea = turf.round(turf.area(bboxTransformed));
      const height = floorHeight * floorNumber + floorNumber;
      setStatistics({
        landArea,
        buildingArea,
        buildingFloorArea: floorNumber * buildingArea,
        volume: buildingArea * height,
        buildingHeight: height,
      });
    }
  };

  return {
    map: map.current,
    container,
    statistics,
    addFloors,
    resizeFloors,
    addConverage,
  };
};
