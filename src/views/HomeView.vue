<template>
  <!-- Login Screen card with email entry, password entry-->
  <div class="login-screen-header">
    <h1>{{ title }}</h1>
  </div>
  <div class="login-screen-card">


    <div class="login-screen-body">


      <div class="form-group">
        <label for="keywords" id="trapezoid">Keywords</label>
        <input type="keywords" class="form-control" id="keywords" placeholder="">

        <label for="size" id="trapezoid">Size</label>
        <!-- size dropdown -->
        <select class="form-control" id="size">
          <option>6</option>
          <option>12</option>
          <option>32</option>
          <option>64</option>
        </select>
      </div>

      <!--pixels dimension entry with seperate entry for width and height-->
      <div class="form-group">
        <label for="pixels" id="trapezoid">Pixels</label>
        <input type="pixels" class="form-control" id="pixels" placeholder="">
      </div>


      <div class="form-group">
        <button @click="generateImage()">Submit</button>
      </div>

    </div>

  </div>

  <div class="image-card">
    <canvas id="canvas"></canvas>
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
  methods: {
    generateImage() {
      //get values from form, search internet for image using keywords
      var axios = require("axios").default;
      let keywords = document.getElementById("keywords").value;
      let size = document.getElementById("size").value;
      let pixels = document.getElementById("pixels").value;

      // make canvas.height and canvas.width equal to pixels by splitting pixels into width and height
      let canvas = document.getElementById("canvas");
      canvas.width = pixels.split("x")[0];
      canvas.height = pixels.split("x")[1];


      var options = {
        method: 'GET',
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        params: {q: keywords, pageNumber: '1', pageSize: size, autoCorrect: 'true'},
        headers: {
          'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
          'x-rapidapi-key': '436801be5amshac1799745813e84p14a2b8jsn827e3d46a769'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
        //loop through response and get image url and draw that image onto canvas in random location
        for (let i = 0; i < response.data.value.length; i++) {
          let image = new Image();
          image.src = response.data.value[i].url;
          image.onload = function () {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext("2d");
            let x = Math.floor(Math.random() * canvas.width);
            let y = Math.floor(Math.random() * canvas.height);
            //blur image before drawing
            //randomize blur amount
            let blur = Math.floor(Math.random() * 10);
            ctx.filter = "blur(" + blur + "px)";
            //randomize image dimensions
            let width = Math.floor(Math.random() * canvas.width);
            let height = Math.floor(Math.random() * canvas.height);


            ctx.drawImage(image, x, y, width, height);
          };
        }




        //document.getElementById("bgImage").style.backgroundImage = "url("+response.data.value[random].url+"";
      }).catch(function (error) {
        console.error(error);
      });
    }
},
};
</script>

<style scoped>
.login-screen-card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 60vh;
  height: 35vh;
  margin: auto;


  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}



.login-screen-header{
  /*background transparent grey hexagon*/
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  border-bottom: 2vh solid rgba(128, 128, 128, 0.42);
  border-right: 5vh solid transparent;
  /*align font to left*/
  text-align: left;
  /*add padding to text*/

  height: 0;
  width: 8vh;
  /*align text to center*/
  margin: 0;
  margin-top: 2vh;
  padding-left: 2vh;





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
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

button{
  background: #00bcd4;
  border-radius: 0;
  border: none;
  padding: 1vh;
  color: #fff;
  width: 80%;
  box-shadow: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateX(1vh);
  margin-top: 3vh;
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
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: auto;
  height: auto;
  margin: auto;
  margin-top: 2vh;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}


</style>