<template>
  <div class="gym-info-page">
    <div class="title">
      <h4>Seattle</h4>
      <h4 class="last">Bouldering Project</h4>
      <a href="https://www.google.com/maps/place/Seattle+Bouldering+Project/@47.5936592,-122.3129877,17z/data=!3m1!4b1!4m2!3m1!1s0x54906a94784bad57:0xcb96c8b95f9ea169">
        900 Poplar Pl S, Seattle, WA 98144
      </a>
    </div>
    <div class="hours">
      <h4>Hours</h4>
      <div class="range">
        <p class="date">Monday - Friday</p>
        <p class="time">6:00am - 11:00pm</p>
      </div>
      <div class="range">
        <p class="date">Saturday</p>
        <p class="time">9:00am - 10:00pm</p>
      </div>
      <div class="range">
        <p class="date">Sunday</p>
        <p class="time">9:00am - 10:00pm</p>
      </div>
    </div>
    <div class="rates">
      <h4>Rates</h4>
      <p class="monthly">MONTHLY MEMBERSHIPS (EFT)</p>
      <div class="range">
        <p class="date">Adult Monthly Membership</p>
        <p class="time">$68</p>
      </div>
      <div class="range">
        <p class="date">Student & Youth Monthly Membership</p>
        <p class="time">$56</p>
      </div>
    </div>
  </div>
</template>

<script>

 import BaseComponent from '../base/baseComponent.vue'

 var GymInfoPage = BaseComponent.extend({
   name: 'GymInfoPage',
   data(){
     return {

     }
   },
   components: {

   },
   created(){

   },
   ready(){
     this.notifications.notify('Navbar.setHeader', "GYM INFO");
     this.notifications.notify('GymPage.setActiveTab', 'none');
     $("body").css("overflow", "hidden");
   },
   methods: {
   },

   beforeDestroy(){
     $("body").css("overflow", "auto");
   }
 });

 export default GymInfoPage
</script>

<style lang="scss">
 @import '../../styles/main.scss';

 .gym-info-page {
   display: flex;
   flex-wrap: wrap;
   padding: 2em;
   color: rgba(0, 0, 0, .5);

   .title {
     padding-top: 1em;
     padding-bottom: 1.4em;
     border-bottom: $component-border;
     h4 {
       padding-bottom: .2em;

       &.last {
         padding-bottom: .5em;
       }
     }

     a {
       font-size: .9em;
       text-decoration: underline;
       color: $color-base-orange;
     }
   }

   .hours {
     padding-top: 1.4em;
     padding-bottom: 1.4em;
     display: flex;
     flex-wrap: wrap;
     border-bottom: $component-border;

     h4 {
       flex-basis: 100%;
       padding-bottom: 1em;
     }
     .range {
       display: flex;
       flex-grow: 1;
       flex-basis: 100%;
       align-content: center;

       .date {
         display: flex;
       }
       .time {
         margin-left: auto !important;
         display: flex;
       }
     }
   }

   .rates {
     padding-top: 1.4em;
     padding-bottom: 1.4em;
     display: flex;
     flex-wrap: wrap;

     h4 {
       padding-bottom: 1em;
     }

     p.monthly {
       flex-basis: 100%;
       color: rgba(0, 0, 0, .4);
     }

     p {
       padding-bottom: .4em !important;
     }

     .range {
       display: flex;
       flex-basis: 100%;
       flex-grow: 1;
       align-content: center;

       .date {
         display: flex;
         flex-grow: 1;
       }
       .time {
         margin-left: auto !important;
         display: flex;
       }
     }
   }

   h4 {
     color: rgba(0, 0, 0, .8);
     font-weight: 300;
     font-size: 1.4em;
   }

 }
</style>
