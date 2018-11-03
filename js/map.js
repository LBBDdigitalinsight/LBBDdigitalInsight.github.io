var mymap = L.map('mapid').setView([51.505, -0.09], 11);

//var geojsonLayer = new L.GeoJSON.AJAX("geojson/LondonWardsSPI.geojson");

//var londonBoroughs = new L.GeoJSON.AJAX("geojson/LondonBoroughs.geojson");


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'openstreetmap',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

//geojsonLayer.addTo(mymap);
//londonBoroughs.addTo(mymap);

//L.geoJSON(wards).bindPopup(function (layer) {
//    return layer.feature.properties.WD11NM;}
//  ).addTo(mymap);

L.geoJSON(London, {
  style: function(feature){
    return {
      color: "black",
      fillOpacity: 0,
      weight: 2
    }
  }
}).addTo(mymap);

L.geoJSON(wards, {
  style: function(feature) {
      var value = feature.properties.hw2018;
      if (value >= 75) {
        return {
          fillColor: "green",
          color: "black",
          weight: 0.5
        };
      }
      else if (value >= 50) {
        return {
          fillColor: "yellow",
          color: "black",
          weight: 0.5
        };
      } else if (value >= 25) {
        return {
          fillColor: "orange",
          color: "black",
          weight: 0.5
        };
      } else {
        return {
          fillColor: "red",
          color: "black",
          weight: 0.5
        }
      }
    }
  }).bindPopup(function(layer) {
        var name = layer.feature.properties.WD11NM;
        var hw2018 = layer.feature.properties.hw2018;
        var fle2018 = layer.feature.properties.FLE2018;
        var mle2018 = layer.feature.properties.MLE2018;
        var rcp2018 = layer.feature.properties.Rcp2018;
        var yr62018 = layer.feature.properties.Yr62018;

        return '<h3>Ward: ' + name + '</h3>' +
                '<table>' +
                  '<tr> <th>Indicator</th><th>Score</th></tr>' +
                  '<tr> <td><strong>Male Life Expectancy:</strong></td>         <td>' + mle2018 + '</td> </tr>'+
                  '<tr> <td><strong>Female Life Expectancy: </strong></td>      <td>' + fle2018 + '</td> </tr>' +
                  '<tr> <td><strong>Obesity in Year 6: </strong></td>           <td>' + yr62018 + '</td> </tr>' +
                  '<tr> <td><strong>Obesity in Reception: </strong></td>        <td>' + rcp2018 + '</td> </tr>' +
                  '<tr> <td><strong>Health and Wellbeing Score: </strong></td>  <td>' + hw2018 + ' </td> </tr>' +
                '</table>';
  }).addTo(mymap);
