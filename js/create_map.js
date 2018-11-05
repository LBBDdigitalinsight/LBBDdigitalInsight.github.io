function draw_map(comp, vr){

  var map_layer = L.geoJSON(wards, {
    style: function(feature) {
      if (vr == 'hwb') {
        var value = feature.properties.hw2018;
      } else if (vr == 'mle') {
        var value = feature.properties.MLE2018;
      } else if (vr == 'fle') {
        var value = feature.properties.FLE2018;
      } else if (vr == 'y6ob') {
        var value = feature.properties.Yr62018;
      } else if (vr == 'rob') {
        var value = feature.properties.Rcp2018;
      } else if (vr == 'crm') {
        var value = feature.properties.Crime2018;
      } else if (vr == 'syv') {
        var value = feature.properties.SYV2018;
      } else if (vr == 'ksi') {
        var value = feature.properties.KSI2018;
      } else if (vr == 'da') {
        var value = feature.properties.DA2018;
      } else {
        var value = feature.properties.ps2018;
      }

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
      if (comp == 'hwb') {
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
        } else {
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
        }
    })

    return(map_layer);
  }
