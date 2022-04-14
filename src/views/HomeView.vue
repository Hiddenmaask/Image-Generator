
<template>
  <!-- Login Screen card with email entry, password entry-->
  <!--
  <div class="login-screen-header" id="formHeader">
    <h1>{{ title }}</h1>
    <div id="arrow"></div>

  </div>
  -->
  <div class="container">
    <div class="login-screen-card" id="form">


      <div class="login-screen-body">


        <div class="form-group">
          <label for="keywords" id="trapezoid" class="trapText">Keywords</label>
          <input type="keywords" class="form-control" id="keywords" placeholder="">

          <label for="size" id="trapezoid" class="trapText">Size</label>
          <!-- size dropdown -->
          <select class="form-control " id="size">
            <option>6</option>
            <option>12</option>
            <option>32</option>
            <option>64</option>
            <option>128</option>
          </select>
        </div>

        <!--page number dropdown -->
        <div class="form-group">
          <label for="page" id="trapezoid" class="trapText">Page</label>
          <select class="form-control trapText" id="page" style="margin-right: 6em ">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>

        <!--pixels dimension entry with seperate entry for width and height-->
        <div class="form-group">
          <label for="pixels" id="trapezoid" class="trapText">Pixels</label>
          <input type="tel"  class="form-control masked" id="pixels" placeholder="****x****" pattern="^[0-9]*$" title="Any X and Y dimensions">

        </div>

        <div class="form-group">
          <label for="zoom" id="trapezoid" class="trapText">Zoom</label>
          <input type="range" class="slider form-control" id="zoom" min="0.1" max="4" step="0.1" value="1">
        </div>



        <div class="form-group">
          <button @click="generateImage()">Submit</button>
        </div>



      </div>

    </div>

    <div class="image-card">
      <canvas id="canvas"></canvas>
    </div>
    <!--
    <div class="sliderForm" id="sliderForm">
      <div class="form-group">
        <label for="zoom" id="trapezoid" class="trapText">Zoom</label>
        <input type="range" class="slider" id="zoom" min="0.1" max="2" step="0.1" value="1">
      </div>
    </div>
    -->
    <!--
    <button class="floating-button" id="floatingButton" @click="showForm()"></button>
    -->
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      title: "Image Search",
    };
  },
  mounted() {
    //disable scrolling
    document.body.style.overflow = "hidden";
    //on zoom change, transform:scale(zoom.value)
    document.getElementById("zoom").addEventListener("input", function() {
      document.getElementById("canvas").style.transform = "scale(" + this.value + ")";
    });



  },
  methods: {
    showForm(){
      //show zoom slider in a sidebar
      //if slider is visable, hide it
      if (document.getElementById("sliderForm").style.display == "block") {
        document.getElementById("sliderForm").style.display = "none";
      } else {
        document.getElementById("sliderForm").style.display = "block";
      }
    },
    generateImage() {
      //get values from form, search internet for image using keywords
      var axios = require("axios").default;
      let keywords = document.getElementById("keywords").value;
      let size = document.getElementById("size").value;
      let pixels = document.getElementById("pixels").value;
      let page = document.getElementById("page").value;

      // make canvas.height and canvas.width equal to pixels by splitting pixels into width and height
      let canvas = document.getElementById("canvas");
      canvas.width = pixels.split("x")[0];
      canvas.height = pixels.split("x")[1];


      var options = {
        method: 'GET',
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        params: {q: keywords, pageNumber: page, pageSize: size, autoCorrect: 'true'},
        headers: {
          'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
          'x-rapidapi-key': '436801be5amshac1799745813e84p14a2b8jsn827e3d46a769'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //loop through response and get image url and draw that image onto canvas in random location
        for (let i = 0; i < response.data.value.length; i++) {
          let image = new Image();
          image.src = response.data.value[i].url;
          image.onload = function () {

            let x = Math.floor(Math.random() * canvas.width);
            let y = Math.floor(Math.random() * canvas.height);


            //add a random effect with random intensity to each image
            let intensity = Math.floor(Math.random() * 10);
            ctx.filter = "blur(" + intensity + "px)";

            ctx.drawImage(image, x, y);

          };
        }
        //once all images have been drawn, sample colours from the whole canvas except for black and replace all black pixels with the samples
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        let r, g, b, a;
        for (let i = 0; i < data.length; i += 4) {
          r = data[i];
          g = data[i + 1];
          b = data[i + 2];
          a = data[i + 3];
          if (r == 0 && g == 0 && b == 0) {
            data[i] = Math.floor(Math.random() * 255);
            data[i + 1] = Math.floor(Math.random() * 255);
            data[i + 2] = Math.floor(Math.random() * 255);
            data[i + 3] = a;
          }
        }
        //add blur to imageData
        ctx.putImageData(imageData, 0, 0);















      }).catch(function (error) {
        console.error(error);
      });





    },

  },

};
</script>

<style scoped>




.container {  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
}

.image-card { grid-area: 1 / 1 / 2 / 3; }

.login-screen-card { grid-area: 1 / 2 / 2 / 3; }

/*
floating button which when clicked displays zoom slider in a sidebar
 */
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  height: 60px;
  width: 60px;
  background-color: #FF7F50;
  color: #FFFFFF;
  border-radius: 30px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
}

/*form which displays above button after button is clicked*/
.sliderForm {
  position: fixed;
  bottom: 10%;
  right: 0;
  width: 20%;
  height: 20%;
  /*gradient using blue shades from vars from root

   */
  background: white;
  border: 0.5vh solid var(--flickr-pink);
  transition: all cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1000;
  display: none;
}




.slider{

  /*
  hover over top of canvas, be vertical and in the top right corner of canvas
  */



  border-radius: 50%;
  cursor: pointer;
  margin: 0;
  padding: 0;
  z-index: 1;
  /* add white rectangle behind slider */



}

input[type='range']{

}

input[type='range'] {
  overflow: hidden;

  -webkit-appearance: none;
  background: white;


}

input[type='range']::-webkit-slider-runnable-track {

  -webkit-appearance: none;

  border-radius: 10em;
  background: linear-gradient(to right, var(--flickr-pink) 70%, var(--byzantine) 88%, var(--purple) 100%) no-repeat fixed center;
  height: 1em ;
  padding-right: 0.5em;
  padding-left: 0.5em;


}

input[type='range']::-webkit-slider-thumb {

  -webkit-appearance: none;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 0.2em var(--flickr-pink);





}



.login-screen-card {
  /* background as gradient of var from root */
  background: rgba(255, 255, 255, 0.5);
  border: 0.5vh solid rgba(169, 168, 168, 0.44);

  transition: all cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1000;

  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all cubic-bezier(1, 0.8, 0.25, 1);
  /* make card tightly fit form */

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;




  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  margin-right: 2em;

}



.login-screen-header{
  /*background transparent grey hexagon*/
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all cubic-bezier(1, 0.8, 0.25, 1);
  width: 60vh;

  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;



}

.login-screen-logo{
  width: 100px;
  height: 100px;
}

.form-group{
  width: 30vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#trapezoid {
  border-bottom: 2em solid rgba(128, 128, 128, 0.42);
  border-right: 4em solid transparent;

  /*align font to left*/
  text-align: left;

  /*add padding to text*/

  height: 0;
  width: 8em;
  /*align text to center*/
  margin: 0;
  margin-top: 2em;
  padding-left: 2em;





}
#size{
  padding-right: 2vh;
}

.trapText{
  line-height: 2em;
}

/* make labels appear above entry boxes as tabs with boxes around them which have cut corners */
.form-group label{

  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* change font to consolas  */
.form-control {
  font-family: 'Consolas', monospace;
  font-size: 14px;
  border-radius: 0;
  border: none;
  background: #f5f5f5;
  padding: 1vh;
  width: 100%;
  box-shadow: none;
}



button{
  background: var(--flickr-pink);
  border-radius: 0;
  border: none;
  padding: 1vh;
  color: #fff;
  width: 80%;
  box-shadow: none;
  transform: translateX(1vh);
  margin-top: 3vh;
  cursor: pointer;

}

button:hover {

  /* fade in colour change */
  background: var(--byzantine);
  color: #fff;

  transition: all cubic-bezier(0.25, 0.8, 0.25, 1);

}


.form-control-row{
  /*align elements next to each other*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.image-card{
  /* card appears to right of form */
  background: none;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}




</style>
