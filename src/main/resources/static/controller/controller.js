var app = angular.module("app0", [  "ngDragDrop" ]);

app.controller('ctr0', ["$scope","$http",function($scope,$http){
  
  $scope.offerte_mandatorie = 
  [
   { /*la prima e' la fissa mandatoria */
	   imgSrc : 'imgs/img_internettelefono.jpg',
	   offerName : 'Fastweb Special',
   },
   {	/*la seconda e' mobile mandatoria */
	   imgSrc : 'imgs/img0.jpg',
	   offerName : 'Mobile 100',
		   
   }
   
   ];
  
  
  $scope.offerte_selezionabili = [
      /*{
        imgSrc: 'imgs/img0.jpg',
        offerName: 'Mobile 100',
      } ,
      {
    	  imgSrc: 'imgs/img1.jpg',
    	  offerName: 'Mobile 250',
      },*/
      {
    	  imgSrc: 'imgs/img2.jpg',
    	  offerName: 'Mobile 500 3GB',
      }
       
    ];
  
  
  
  
  $scope.offerte_aggiunte =   [];
  
  $scope.eliminaAggiunta = function(index)
  {
	  $scope.offerte_aggiunte.splice(index,1);
  }
   
  $scope.checkout = function()
  {
	  
	  /*tutte le mobili, raggruppate per label, con il numero di occorrenze */
	  /*la prima e' sempre la mandatoria delle mobili */
	  var mobili = {};
	  mobili[$scope.offerte_mandatorie[1].offerName] = {offerName : $scope.offerte_mandatorie[1].offerName, quantity : 1};
	  
	  $scope.offerte_aggiunte.forEach(function(el,idx){
		  if( !(el.offerName in mobili) )
		  {
			  mobili[el.offerName] = {offerName : el.offerName, quantity : 0};
		  }
		  mobili[el.offerName].quantity = mobili[el.offerName].quantity +1;
	  });
	  
	  var mobili_toappend = [];
	  Object.keys(mobili).forEach(function(el,idx){
		  /*per ciascuna delle chiavi */
		  mobili_toappend.push(
			  mobili[el]
		   );
	  });
	  
	  	var toSend = 
	  	{
	  			fixedOfferName : $scope.offerte_mandatorie[0].offerName ,
	  			mobileOfferList : mobili_toappend
	  	}
	  	
	  	/*$http({
	  		method : 'POST',
	  		params : toSend,
	  		url : 'cart',
	  	}).success(function(resp){
	  		
	  	}).error(function(){
	  		alert("Qualcosa è andato storto");
	  	});*/
	  	
	  	/*metto il cursore in caricamento */
	  	$("body").css("cursor","wait");
	  	$http.post('/cart',toSend).then(
	  			function(resp){
	  		  		
	  				var redirectTo = resp.data;
	  			  	$("body").css("cursor","default");
	  				document.location.href = redirectTo;
	  				
	  		  	},
	  		    function(){
	  		  		alert("Qualcosa è andato storto");
	  			  	$("body").css("cursor","default");
	  		  	}
	  	);
	  
	  
  }
  
  $scope.dataLoaded = true;
  
}]);
