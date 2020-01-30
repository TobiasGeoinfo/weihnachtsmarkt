


var layerWMS = new ol.layer.Tile({
        title: "maerkte",
      source: new ol.source.TileWMS({        
             url: 'http://141.64.205.251:8080/geoserver/maerkte/wms?',
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






/*	

map.on('singleclick', function(evt) {

    // Hide existing popup and reset it's offset
    popup.hide();
    popup.setOffset([0, 0]);

    // Attempt to find a marker from the planningAppsLayer
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
    });

    if (feature) {

        var coord = feature.getGeometry().getCoordinates();
        var props = feature.getProperties();
        var info = "<h2><a href='" + props.caseurl + "'>" + props.casereference + "</a></h2>";
            info += "<p>" + props.locationtext + "</p>";
            info += "<p>Status: " + props.status + " " + props.statusdesc + "</p>";
        // Offset the popup so it points at the middle of the marker not the tip
        popup.setOffset([0, -22]);
        popup.show(coord, info);

    } else {

        var url = layerWMS
                    .getSource()
                    .getGetFeatureInfoUrl(
                        evt.coordinate,
                        map.getView().getResolution(),
                        map.getView().getProjection(),
                        {
                            'INFO_FORMAT': 'application/json',
                            'propertyName': 'NAME,AREA_CODE,DESCRIPTIO'
                        }
                    );

        reqwest({
            url: url,
            type: 'json',
        }).then(function (data) {
            var feature = data.features[0];
            var props = feature.properties;
            var info = "<h2>" + props.NAME + "</h2><p>" + props.DESCRIPTIO + "</p>";
            popup.show(evt.coordinate, info);
        });

    }

});

*/



