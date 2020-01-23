
/*
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
*/


var layerWMS = new ol.layer.Tile({
        title: "maerkte",
      source: new ol.source.TileWMS({        
             url: 'http://141.64.197.87/geoserver/maerkte/wms?',
             params: {'LAYERS': 'maerkte:weihnachtsmarktshape', 'TILED': true},
             serverType: 'geoserver'
            })
        });


var satellite = new ol.layer.Tile({
      source: new ol.source.XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
      })
    });
		

var view = new ol.View({
          center: ol.proj.fromLonLat([13.35, 52.5]),
          zoom: 12
         });
var map = new ol.Map({
        target: 'map',
        layers: [satellite,layerWMS],
        view: view
        
});






map.setView(view);
map.on('singleclick', function(evt) {
  document.getElementById('gfi').innerHTML = '';
  var viewResolution = view.getResolution();
  var url = layerWMS.getSource().getGetFeatureInfoUrl(
    evt.coordinate, viewResolution, view.getProjection(),
    {'INFO_FORMAT': 'text/html'});
  if (url) {
    fetch(url)
      .then(function (response) { return response.text(); })
      .then(function (html) {
        document.getElementById('gfi').innerHTML = html;
      });
  }
});


/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
/*closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};
*/

/**
 * Create the map.
 */
/*var map = new Map({
  layers: [
    new TileLayer({
      source: new TileJSON({
        url: 'https://api.tiles.mapbox.com/v4/mapbox.natural-earth-hypso-bathy.json?access_token=' + key,
        crossOrigin: 'anonymous'
      })
    })
  ],
  
  overlays: [overlay],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
*/

popup = new OpenLayers.Popup("chicken",
                   new OpenLayers.LonLat(13,52),
                   new OpenLayers.Size(200,200),
                   "example popup",
                   true);
		map.addPopup(popupp);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function(evt) {
  var coordinate = evt.coordinate;
  var hdms = ol.coordinate.toStringHDMS(coordinate);

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms+
  '</code>';
  overlay.setPosition(coordinate);
});
/*toLonLat*/






