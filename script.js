const COUNTRY_URL='https://covid19.mathdro.id/api/countries/';

document.getElementById('mybody').onload=function(){
    getCountryData('AFG');
}

let xhr=new XMLHttpRequest();
xhr.open('GET',COUNTRY_URL);
xhr.send();

var select=document.getElementById('my_countries');

xhr.onload=function(){
    if(this.status==200 && this.readyState==4){
     //   console.log(this.responseText);
     //   console.log(JSON.parse(this.responseText));
        populateSelectElement(JSON.parse(this.responseText).countries);
    }
}

function populateSelectElement(countries)
{
    console.log(countries);
    for(var i=0;i<countries.length;i++)
    {
        //console.log(all_countries[i]);
        var option=document.createElement('option');
        option.value=countries[i].iso3;
        option.textContent=countries[i].name;
        select.appendChild(option);
    }
}

function getCountryData(code){
    var xhr=new XMLHttpRequest();
    xhr.open('GET',COUNTRY_URL+code);
    xhr.send();
    xhr.onload=function(){
        if(xhr.status==200 && xhr.readyState==4)
        {
          //  console.log(JSON.parse(xhr.responseText));
          showInDom(JSON.parse(xhr.responseText));
        }
    }
}

var recovered=document.getElementById('recovered');
var deaths=document.getElementById('deaths');
var confirmed=document.getElementById('confirmed');

function showInDom(result)
{
  //  console.log(result);
    recovered.textContent=result.recovered.value;
    deaths.textContent=result.deaths.value;
    confirmed.textContent=result.confirmed.value;
}

select.addEventListener('change',function(event){
    console.log(event);
    getCountryData(event.target.value);
})