<template>
  <div>
  <h1 class="title col-12">Weather Forecast For {{address?address:'N/A'}}</h1> 

  <div class="icons">
<!-- <img class="icon img-fluid" src="../assets/clear-night.svg"/> -->
 <!-- <img id="icon" :src="`http://openweathermap.org/img/wn/` + weather.weather[0].icon + `@2x.png`"/> -->
 <div>
              <canvas style="margin-top: 15px;" id="skycon"  width="150" height="150"></canvas>
             </div>
  </div>
 <div class="row-display">
   <span class="small-display">{{time? time:'N/A'}}</span>
   <span class="small-display"> {{temp? temp:'N/A'}} °C
   </span>
   <span class="small-display">{{type? type:'N/A'}}</span>
 </div>
 <div class="container ">
 <div class="card col-lg-8 col-md-8 col-xs-12 col-sm-12">
<h2 class="title-2 ml-3 col-12">Find a Forecast</h2>
<div class="row col-12">
  <div class="col-lg-8 " >
<p class="has-dynamic-label col-md-12">

  
    <input autocomplete="off"  type="text" class="col-md-12 dynamic-label-input" id="autocomplete"   placeholder="Search for City" required >
    <label for="dynamic-label-input">City</label>
      <!-- icon="search"
      :value="value"
      :placeholder="$t('Your place')" -->        
            
        </p></div>
        <div class="button col-lg-4 mt-3">
<button @click="submit()" class="btn">Search &nbsp; <i class='bx bx-search-alt bx-sm'></i></button>
</div>
</div>
 </div>
 </div>
  </div>
</template>
<script src="https://rawgithub.com/darkskyapp/skycons/master/skycons.js"></script>
<script>
import axios from 'axios'
export default {
  name:'weather',
  data() {
   return{
     city:'',
     lat:'',
     long:'',
     address:'',
     apikey:'AIzaSyBrQVECCj8woyBmEj9C-e61CJLiDDfAK-Q',
     country:'',
     autocomplete:'',
     place:'',
     timezone:'',
     weatherKey:'43c9da3226d96181c283608a2624f91a',
     time:'',
     temp:'',
   type:'',
   skycons: new Skycons({"color":"orange"}),
   weather:''


   
    
    }
  },
   mounted() {
     this.locatorButtonPressed()
     const google = window.google
 this.autocomplete= new google.maps.places.Autocomplete(
    document.getElementById("autocomplete")
  );
  this.autocomplete.setFields(["address_component,geometry"]);
 
  this.autocomplete.addListener("place_changed", this.fillInAddress);
//   let options = {
//     timeZone: new Date().getTimezoneOffset()/60,
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//   },
//   formatter = new Intl.DateTimeFormat([], options);

// console.log(formatter.format(new Date()));
},

  methods:{
    
  fillInAddress() {
    this.place = this.autocomplete.getPlace();
    
    //  if (!this.place.geometry) {
    //   // User entered the name of a Place that was not suggested and
    //   // pressed the Enter key, or the Place Details request failed.
    //   window.alert("No details available for input: '" + this.place.name + "'");
    //   return;
    // }
  console.log(this.place,"place")

  },
    
    submit(){
 this.lat=this.place.geometry.viewport.Va.i
 this.long=this.place.geometry.viewport.Qa.i
 this.address=this.place.address_components[0].long_name
this.getWeather(this.lat,this.long)
// this.getTime(this.lat,this.long)
 
 
//  if (!this.place.geometry) {
//       // User entered the name of a Place that was not suggested and
//       // pressed the Enter key, or the Place Details request failed.
//       window.alert("No details available for input: '" + this.place.name + "'");
//       return;
//     }
    },

    async getStreetAddressFrom(lat, long) {
   try {
      var {
         data
      } = await axios.get(
         "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
         lat +
         "," +
         long +
         "&key=AIzaSyBrQVECCj8woyBmEj9C-e61CJLiDDfAK-Q"
      );
      if (data.error_message) {
         console.log(data.error_message)
      } else {
      
     const n=data.results[0].address_components
   const user_city=  n.filter(city=>
city.types.includes('locality'))[0].long_name
     

         this.address = user_city;
        
         
      }
   } catch (error) {
      console.log(error.message);
   }
},


async getWeather(lat, long) {
   try {
      var {
         data
      } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.weatherKey}`
       
      );
      if (data.error_message) {
         console.log(data.error_message)
      } else {
        this.getTime(lat,long)
    this.temp=Math.round(data.main.temp-273.15)
 this.type = data.weather[0].main;
 this.weather=data
 switch(this.type.toLowerCase()) {
        case "clouds":
          if (this.time >= 19 || this.time <= 4) {
            this.skycons.set("skycon", Skycons.PARTLY_CLOUDY_NIGHT);
          } else {
            this.skycons.set("skycon", Skycons.CLOUDY);
          }
          this.skycons.play();
          break;
        case "rain":
          this.skycons.set("skycon", Skycons.RAIN);
          this.skycons.play();
          break;
        case "drizzle":
          this.skycons.set("skycon", Skycons.RAIN);
          this.skycons.play();
          break;
        case "thunderstorm":
            this.skycons.set("skycon", Skycons.RAIN);
            this.skycons.play();
            break;
        case "snow":
          this.skycons.set("skycon", Skycons.SNOW);
          this.skycons.play();
          break;
        case "clear": 
          if (this.time >= 19 || this.time <= 4) {
            this.skycons.set("skycon", Skycons.CLEAR_NIGHT);
          } else {
            this.skycons.set("skycon", Skycons.CLEAR_DAY);
          }
          this.skycons.play();
          break;
        default:
            this.skycons.set("skycon", Skycons.WIND);
            this.skycons.play();
      
    }
        
      }
   } catch (error) {
      console.log(error.message);
   }
},
  async getTime(lat, long) {
   const  targetDate =new Date(); // Current date/time of user computer
   const timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60; // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
   try {
      var {
         data
      } = await axios.get(
         "https://maps.googleapis.com/maps/api/timezone/json?location=" +
         lat +
         "," +
         long +
         "&timestamp=" + timestamp +
         "&key=AIzaSyBrQVECCj8woyBmEj9C-e61CJLiDDfAK-Q"
      );
      if (data.error_message) {
         console.log(data.error_message)
      } else {
      const offsets = data.dstOffset * 1000 + data.rawOffset * 1000 
            const localdate = new Date(timestamp * 1000 + offsets) 
          this.time=localdate.toLocaleTimeString()
    
      }
   } catch (error) {
      console.log(error.message);
   }
},
locatorButtonPressed() {
   navigator.geolocation.getCurrentPosition(
      position => {
         this.getStreetAddressFrom(position.coords.latitude, position.coords.longitude)
         this.getWeather(position.coords.latitude, position.coords.longitude)
        //  this.getTime(position.coords.latitude, position.coords.longitude)
         
         
      },
      error => {
         console.log(error.message);
      }
   );
}
  },

  created(){



  }
 
 
  

  // props: {
  //   msg: String,
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.icons{
  display: flex;
  justify-content: center;
  
}
.icon{
  width: 20%;
}
.bx-search-alt{
  align-self: center;
      vertical-align: middle;
}

.ml-3{
  margin-left:30px;
}
.small-display{
  color: var(--text-color);
  font-weight:600 ;
  display: flex;
  padding: 10px;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
}
.title{
  color: var(--text-color);
  font: var(--body-font);
  font-size: var(--biggest-font-size);
  
  
  text-align: center;
 
}
.row-display{
  position: relative;
  display: flex;
  text-align: center;
  justify-content:space-evenly;
  margin-left:50px ;
  margin-right: 50px;
  color: var(--text-color);
}
.row{
  position: relative;
  display: flex;
  text-align: center;
 
 
  color: var(--text-color);
}
.card{
  background-color: #54CE37;
  border-radius: 8px;
  padding: 10px;
 justify-content: center;
 position: relative;
  text-align: center;

}


.container{
  /* display: flex;
  text-align: center;
  justify-content: center; */
  display: flex;
  justify-content: center;
  text-align: center;
}
.title-2{
  display: block;
  color: var(--body-color);
  font-family: var(--body-font);
  font-size: var(--h3-font-size);
  font-weight: 100;
  text-align: left;
  
}
@media screen and (max-width:600px) {
  .title-2{
    display: contents;
  }
}

input{
  border-radius: 8px  !important;
  background-color: transparent !important;
 color: var(--body-color);
  
}


input:placeholder-shown + label {
    opacity: 0;
    transform: translateY(1rem);
}

.has-dynamic-label {
    position: relative;
    padding-top: 1.5rem;
}

.has-dynamic-label label {
    position: absolute;
    top: -8px;
    font-size: var(--smaller-font-size);
    opacity: 1;
    transform: translateY(0);
    transition: all 0.2s ease-out;
}
label{
  display: block;
  color: var(--body-color);
}
/* 
.button{
 height: 50px;
    align-self: center;
    text-align: center;
   
  
} */
.btn {
     

	padding:15px 50px;
	width:auto;
	background:var(--body-color);
	border:none;
	color:white;
	cursor:pointer;
	display:inline-block;

	-webkit-transition:0.2s ease all;
	-moz-transition:0.2s ease all;
	-ms-transition:0.2s ease all;
	-o-transition:0.2s ease all;
	transition:0.2s ease all;
}

.btn:hover {
	color: white;
}


</style>

