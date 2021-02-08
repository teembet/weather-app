<template>
  <div id="app">
    
    <weather/>
    <footer>
      <h3 class="footer">Built By Teembet Using Vue Js And SCSS. Deployed with Netlify</h3>
    </footer>
  </div>
</template>

<script>
import Weather from './components/weather.vue';

export default {
  name: 'App',
  components: {

    Weather
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
:root{
  --header-height: 3rem;

  /*========== Colors ==========*/
  --first-color: #f25d13;
  --first-color-alt: #F58D59;
  --title-color: #393939;
  --text-color: #fffded;
  --text-color-light: #A6A6A6;
  --body-color:  #1E2543;
  --container-color: #FFFFFF;

  /*========== Font and typography ==========*/
  --body-font: 'Poppins', sans-serif;
  --biggest-font-size: 5.25rem;
  --h3-font-size: 3.25rem;
  --normal-font-size: 1.6rem;
  --smaller-font-size: .813rem;
  --small-font-size: 1.25rem;

  /*========== Font weight ==========*/
  --font-medium: 500;
  --font-semi-bold: 600;

  /*========== Margenes ==========*/
  --mb-1: .5rem;
  --mb-2: 1rem;
  --mb-3: 1.5rem;
  --mb-4: 2rem;
  --mb-5: 2.5rem;
  --mb-6: 3rem;

  /*========== z index ==========*/
  --z-tooltip: 10;
  --z-fixed: 100;}

  @media (max-width:600px) {
:root{
--biggest-font-size: 3.25rem;
}
    
  }
*{
  box-sizing: border-box;
  
}


body{
  margin: var(--header-height) 0 0 0;
  font-family: var(--body-font);
  /* font-size: var(--normal-font-size); */
  background-color: var(--body-color);
  color: var(--text-color);
  line-height: 1.5;
}
/* .container{
  max-width: 960px;
  width: calc(100% - 2rem);
  /* margin-left: var(--mb-2);
  margin-right: var(--mb-2); 
} */
input{
  border-radius: 8px  !important;
  background-color: white !important;
 border-style: solid !important;
 height: 60px;
 padding: 2px;
  
}
.footer{
  text-align: center;
  font-family: var(--body-font);
  display: flex;
  justify-content: center;
  font-size: var(--smaller-font-size);
  font-weight: 400  !important;
  margin-top: 10px  !important;
}

</style>



