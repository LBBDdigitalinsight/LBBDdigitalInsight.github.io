var mymap = L.map('mapid').setView([51.505, -0.09], 11);

//var geojsonLayer = new L.GeoJSON.AJAX("geojson/LondonWardsSPI.geojson");

//var londonBoroughs = new L.GeoJSON.AJAX("geojson/LondonBoroughs.geojson");


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'openstreetmap',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

L.geoJSON(London, {
  style: function(feature){
    return {
      color: "black",
      fillOpacity: 0,
      weight: 2
    }
  }
}).addTo(mymap);

var health_wellbeing = L.geoJSON(wards, {
  style: function(feature) { var value = feature.properties.hw2018;
    if        (value >= 90) { return {fillColor: "#006837", color: "black", weight: 0.5};
    } else if (value >= 80) { return {fillColor: "#1a9850", color: "black", weight: 0.5};
    } else if (value >= 70) { return {fillColor: "#66bd63", color: "black", weight: 0.5};
    } else if (value >= 60) { return {fillColor: "#a6d96a", color: "black", weight: 0.5};
    } else if (value >= 50) { return {fillColor: "#d9ef8b", color: "black", weight: 0.5};
    } else if (value >= 40) { return {fillColor: "#fee08b", color: "black", weight: 0.5};
    } else if (value >= 30) { return {fillColor: "#fdae61", color: "black", weight: 0.5};
    } else if (value >= 20) { return {fillColor: "#f46d43", color: "black", weight: 0.5};
    } else if (value >= 10) { return {fillColor: "#d73027", color: "black", weight: 0.5};
    } else {                  return {fillColor: "#a50026", color: "black", weight: 0.5
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
  })

  var personal_safety = L.geoJSON(wards, {
    style: function(feature) { var value = feature.properties.ps2018;
        if        (value >= 90) { return {fillColor: "#006837", color: "black", weight: 0.5};
        } else if (value >= 80) { return {fillColor: "#1a9850", color: "black", weight: 0.5};
        } else if (value >= 70) { return {fillColor: "#66bd63", color: "black", weight: 0.5};
        } else if (value >= 60) { return {fillColor: "#a6d96a", color: "black", weight: 0.5};
        } else if (value >= 50) { return {fillColor: "#d9ef8b", color: "black", weight: 0.5};
        } else if (value >= 40) { return {fillColor: "#fee08b", color: "black", weight: 0.5};
        } else if (value >= 30) { return {fillColor: "#fdae61", color: "black", weight: 0.5};
        } else if (value >= 20) { return {fillColor: "#f46d43", color: "black", weight: 0.5};
        } else if (value >= 10) { return {fillColor: "#d73027", color: "black", weight: 0.5};
        } else {                  return {fillColor: "#a50026", color: "black", weight: 0.5
          }
        }
      }
    }).bindPopup(function(layer) {
          var name = layer.feature.properties.WD11NM;
          var ps2018 = layer.feature.properties.ps2018;
          var syv2018 = layer.feature.properties.SYV2018;
          var ksi2018 = layer.feature.properties.KSI2018;
          var da2018 = layer.feature.properties.DA2018;
          var crime2018 = layer.feature.properties.Crime2018;

          return '<h3>Ward: ' + name + '</h3>' +
                  '<table>' +
                    '<tr> <th>Indicator</th><th>Score</th></tr>' +
                    '<tr> <td><strong>Crime: </strong></td>                         <td>' + crime2018 + '</td> </tr>'+
                    '<tr> <td><strong>Domestic Abuse: </strong></td>                <td>' + da2018 + '</td> </tr>' +
                    '<tr> <td><strong>Killed or Seriously Injured: </strong></td>   <td>' + ksi2018 + '</td> </tr>' +
                    '<tr> <td><strong>Serious Youth Violence: </strong></td>        <td>' + syv2018 + '</td> </tr>' +
                    '<tr> <td><strong>Personal Safety Score: </strong></td>  <td>' + ps2018 + ' </td> </tr>' +
                  '</table>';
    })

  health_wellbeing.addTo(mymap);



  document.getElementById("map_button").addEventListener("click", function(){
      var name = document.getElementById("component").value;
      //console.log(name);

      if (name == 'hwb') {
        document.getElementById("maptitle").innerHTML = 'Health and Wellbeing Component Score';
        mymap.removeLayer(health_wellbeing);
        mymap.removeLayer(personal_safety);
        health_wellbeing.addTo(mymap);

      } else {
        document.getElementById("maptitle").innerHTML = 'Personal Safety Component Score';
        mymap.removeLayer(health_wellbeing);
        mymap.removeLayer(personal_safety);
        personal_safety.addTo(mymap);

      }




  });
