function placeGif(){
   gif = "https://pierrepapierciseaux.net/.skynet/img/gifs/derp"+Math.floor(Math.random()*590)+".gif";
   l = Math.floor(Math.random()*( $( window ).width() +200)-100  )+"px";
   t = Math.floor(Math.random()*( $( window ).height()+200)-100  )+"px";
   el = "<img src='"+gif+"' class='luckyGif' style='top:"+t+"; left:"+l+";'>"
   $( "#lucky" ).append( el );
  }



  var luckyTimer;
  var howManyLuck=0;

  function iFeelLucky(){

   clearInterval(luckyTimer);

    howManyLuck = 1;

    placeGif();

    //



    luckyTimer = setInterval(function(){ 
     //alert("Hello"); 

     placeGif();
     howManyLuck = howManyLuck +1;

     if (howManyLuck>1000) {
      if (luckyTimer) {
       clearInterval(luckyTimer);
      };
      
     };

    }, 200);

   
  }




  $('#select').on('change', function () {
       console.log(this.selectedOptions[0].value);
       lang = this.selectedOptions[0].value;



   q = $('#isearch').val();

   //console.log(q.replace(/\s/g,""));

      if(q.replace(/\s/g,"") == ""){
        tmp = "https://pierrepapierciseaux.net/.skynet/?lang="+lang;
   }else{
    tmp = "https://pierrepapierciseaux.net/.skynet/?q="+q+"&lang="+lang;
   };
    
      
       window.open(tmp,"_self");


  });
