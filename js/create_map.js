function draw_map(level, comp, vr, op){

  if (level == 'ward') {
    var map_l = wards;
  } else if(level == 'borough') {
    var map_l = london_boroughs_SPI;
  } else {
    var map_l = London_STP_SPI;
  }

  var map_layer = L.geoJSON(map_l, {
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
      return {fillColor: getColor(value), color: "black", weight: 0.5, fillOpacity: op};
    }
  }).bindPopup(function(layer) {
      if (comp == 'hwb') {
          var name = layer.feature.properties.NAME;
          var hw2018 = precise_round(layer.feature.properties.hw2018,1);
          var fle2018 = precise_round(layer.feature.properties.FLE2018,1);
          var mle2018 = precise_round(layer.feature.properties.MLE2018,1);
          var rcp2018 = precise_round(layer.feature.properties.Rcp2018,1);
          var yr62018 = precise_round(layer.feature.properties.Yr62018,1);

          return '<h3>Area Name: ' + name + '</h3>' +
                  '<table>' +
                    '<tr> <th>Indicator</th><th>Score</th></tr>' +
                    '<tr> <td><strong>Male Life Expectancy:</strong></td>         <td>' + mle2018 + '</td> </tr>'+
                    '<tr> <td><strong>Female Life Expectancy: </strong></td>      <td>' + fle2018 + '</td> </tr>' +
                    '<tr> <td><strong>Obesity in Year 6: </strong></td>           <td>' + yr62018 + '</td> </tr>' +
                    '<tr> <td><strong>Obesity in Reception: </strong></td>        <td>' + rcp2018 + '</td> </tr>' +
                    '<tr> <td><strong>Health and Wellbeing Score: </strong></td>  <td>' + hw2018 + ' </td> </tr>' +
                  '</table>';
        } else {
          var name = precise_round(layer.feature.properties.WD11NM,1);
          var ps2018 = precise_round(layer.feature.properties.ps2018,1);
          var syv2018 = precise_round(layer.feature.properties.SYV2018,1);
          var ksi2018 = precise_round(layer.feature.properties.KSI2018,1);
          var da2018 = precise_round(layer.feature.properties.DA2018,1);
          var crime2018 = precise_round(layer.feature.properties.Crime2018,1);

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
