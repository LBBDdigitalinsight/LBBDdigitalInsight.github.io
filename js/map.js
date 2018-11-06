var mymap = L.map('mapid').setView([51.505, -0.09], 11);
var op = parseFloat(document.getElementById("myRange").value);

var slider = '<p>Set Map Opacity:</p><input type="range" min=0 max=100 value=90 class="slider" id="myRange">'

document.querySelector('#component').value = 'hwb';
document.querySelector('#variable').value = 'hwb';

function getColor(d) {
    return d > 90  ? '#006837' :
           d > 80  ? '#1a9850' :
           d > 70  ? '#66bd63' :
           d > 60  ? '#a6d96a' :
           d > 50  ? '#d9ef8b' :
           d > 40  ? '#fee08b' :
           d > 30  ? '#fdae61' :
           d > 20  ? '#f46d43' :
           d > 10  ? '#d73027' :
                     '#a50026';
}

var var_drop_hwb = '<select class="map_item" name="variable" id="variable">' +
  '<option value="mle">Male Life Expectancy</option>' +
  '<option value="fle">Female Life Expectancy</option>' +
  '<option value="y6ob">Obesity in Year 6</option>' +
  '<option value="rob">Obesity in Reception</option>' +
  '<option value="hwb" selected>Health & Wellbeing Score</option>' +
'</select>' + slider;

var var_drop_perc = '<select class="map_item" name="variable" id="variable">' +
  '<option value="crm">Crime</option>' +
  '<option value="da">Domestic Abuse</option>' +
  '<option value="ksi">Killed or Seriously Injured</option>' +
  '<option value="syv">Serious Youth Violence</option>' +
  '<option value="pers" selected>Personal Safety Score</option>' +
'</select>' + slider;


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18,
    id: 'openstreetmap',
    accessToken: 'this variable is required but not used!'
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

var map_layer = draw_map('hwb', 'hwb', 0.9);
map_layer.addTo(mymap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);


document.getElementById("map_button").addEventListener("click", function(){
      var name = document.getElementById("component").value;
      //console.log(name);
      //console.log(document.getElementById("variable").value);

      op = parseFloat(document.getElementById("myRange").value) / 100;

      if (name == 'hwb') {
        var display_name = 'Health and Wellbeing, ';
        mymap.removeLayer(map_layer);
        map_layer = draw_map(document.getElementById("component").value, document.getElementById("variable").value, op);
        map_layer.addTo(mymap);

        if (document.getElementById("variable").value == 'mle') {
          display_name += 'Male Life Expectancy';
        } else if (document.getElementById("variable").value == 'fle') {
          display_name += 'Female Life Expectancy';
        } else if (document.getElementById("variable").value == 'y6ob') {
          display_name += 'Obesity in Year 6';
        } else if (document.getElementById("variable").value == 'rob') {
          display_name += 'Obesity in Reception';
        } else {
          display_name += 'Component Score';
        }

      } else {

        var display_name = document.getElementById("maptitle").innerHTML = 'Personal Safety, ';
        mymap.removeLayer(map_layer);
        map_layer = draw_map(document.getElementById("component").value, document.getElementById("variable").value, op);
        map_layer.addTo(mymap);

        if (document.getElementById("variable").value == 'crm') {
          display_name += 'Crime';
        } else if (document.getElementById("variable").value == 'da') {
          display_name += 'Domestic Abuse';
        } else if (document.getElementById("variable").value == 'ksi') {
          display_name += 'Killed or Seriously Injured';
        } else if (document.getElementById("variable").value == 'syv') {
          display_name += 'Serious Youth Violence';
        } else {
          display_name += 'Component Score';
        }
      }

      document.getElementById("maptitle").innerHTML = display_name;
  });



document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[name="comp"]').onchange=changeEventHandler;
},false);

function changeEventHandler(event) {
if (this.value == 'hwb') {
    document.getElementById('var_select').innerHTML = var_drop_hwb;
    //console.log(this.value);
} else {
    document.getElementById('var_select').innerHTML = var_drop_perc;
    //console.log(this.value);
  }
}
