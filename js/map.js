var mymap = L.map('mapid').setView([51.505, -0.09], 11);

document.querySelector('#component').value = 'hwb';
document.querySelector('#variable').value = 'hwb';

var var_drop_hwb = '<select class="map_item" name="variable" id="variable">' +
  '<option value="mle">Male Life Expectancy</option>' +
  '<option value="fle">Female Life Expectancy</option>' +
  '<option value="y6ob">Obesity in Year 6</option>' +
  '<option value="rob">Obesity in Year 6</option>' +
  '<option value="hwb">Health & Wellbeing Score</option>' +
'</select>'

var var_drop_perc = '<select class="map_item" name="variable" id="variable">' +
  '<option value="crm">Crime</option>' +
  '<option value="da">Domestic Abuse</option>' +
  '<option value="ksi">Killed or Seriously Injured</option>' +
  '<option value="syv">Serious Youth Violence</option>' +
  '<option value="pers">Personal Safety Score</option>' +
'</select>'



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


var map_layer = draw_map(document.getElementById("component").value, document.getElementById("var_select").value);
map_layer.addTo(mymap);


document.getElementById("map_button").addEventListener("click", function(){
      var name = document.getElementById("component").value;
      //console.log(name);
      //console.log(document.getElementById("variable").value);

      if (name == 'hwb') {
        var display_name = 'Health and Wellbeing, ';
        mymap.removeLayer(map_layer);
        map_layer = draw_map(document.getElementById("component").value, document.getElementById("variable").value);
        map_layer.addTo(mymap);

        if (document.getElementById("variable").value == 'mle') {
          display_name += 'Male Life Expectancy';
        } else if (document.getElementById("variable").value == 'fle') {
          display_name += 'Female Life Expectancy';
        } else if (document.getElementById("variable").value == 'yrob') {
          display_name += 'Obesity in Year 6';
        } else if (document.getElementById("variable").value == 'rob') {
          display_name += 'Obesity in Reception';
        } else {
          display_name += 'Component Score';
        }
        
      } else {

        var display_name = document.getElementById("maptitle").innerHTML = 'Personal Safety, ';
        mymap.removeLayer(map_layer);
        map_layer = draw_map(document.getElementById("component").value, document.getElementById("variable").value);
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
