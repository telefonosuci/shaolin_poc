var app = angular.module("app0", ["ngDragDrop"]);


app.filter('currency', ['$filter', function($filter) {
    return function(input) {
        input = parseFloat(input);
        input = input.toFixed(input % 1 === 0 ? 0 : 2);
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
}]);



app.controller('ctr0', ["$scope", "$http", function ($scope, $http) {

    $scope.contentPage = "main.html";
    $scope.displayLayout = "horizontal.html";


    $scope.totale = 70;
    $scope.totaleParziale = 0;

    $scope.cartState= "In corso";


    $scope.ricalcolaTotale = function(){

        $scope.totale = 70;
        $scope.totaleParziale = 0;


        $scope.offerte_mandatorie.forEach(function (el, idx) {
            $scope.totale = $scope.totale + el.offerPrice;
            $scope.totaleParziale = $scope.totaleParziale + el.offerPrice;
        });


        $scope.offerte_aggiunte.forEach(function (el, idx) {
            $scope.totale = $scope.totale + el.offerPrice;
            $scope.totaleParziale = $scope.totaleParziale + el.offerPrice;
        });
    };

    $scope.collapseMenu = function(){

        console.log("Collapsing");

        $("#recap-offerte-toggable").toggle({
            duration:500
        });

    };

    $scope.switchLayout = function(){

        console.log("Ciao");
        if($scope.displayLayout==="horizontal.html"){
            $scope.displayLayout = "vertical.html";
        }else{
            $scope.displayLayout = "horizontal.html";
        }

    };


    $scope.offerte_configurabili =
        [
            {
                imgSrc: 'imgs/img0.jpg',
                offerName: 'Mobile 250',
                description:"Ricarica automatica",
                offerPrice:1.95,
                otherPrices:0,
                isMobile: true,
                isValid:false,
                iccid:"",
                msisdn:"",
                tipologia:"",
                nome:"",
                cognome:"",
                cfpiva:"",
                tipo:"",
                msis_dnportato:"",
                origine:"",
                operatore:"",
                iccid_donating:"",
                imei:"",
                numero_documento:"",
                flag_tcr:""
            } ,
            {
                imgSrc: 'imgs/img1.jpg',
                offerName: 'Mobile 500',
                description:"Ricaricabile con Mobile Number Portability",
                offerPrice: 5.95,
                otherPrices:0,
                isMobile: true,
                isValid:false,
                iccid:"",
                msisdn:"",
                tipologia:"",
                nome:"",
                cognome:"",
                cfpiva:"",
                tipo:"",
                msisd_nportato:"",
                origine:"",
                operatore:"",
                iccid_donating:"",
                imei:"",
                numero_documento:"",
                flag_tcr:""

            }

            ,
            {
                imgSrc: 'imgs/img2.jpg',
                offerName: 'Freedom',
                description:"Ricarica automatica con Terminale rateale ( LG G5 Silver )",
                offerPrice: 9.95,
                otherPrices:0,
                isMobile: true,
                isValid:false,
                iccid:"",
                msisdn:"",
                tipologia:"",
                nome:"",
                cognome:"",
                cfpiva:"",
                tipo:"",
                msisdn_portato:"",
                origine:"",
                operatore:"",
                iccid_donating:"",
                imei:"",
                numero_documento:"",
                flag_tcr:""
            }


        ];
    $scope.offerte_mandatorie =
        [
            {
                /*la prima e' la fissa mandatoria */
                imgSrc: 'imgs/img_internettelefono.jpg',
                offerName: 'Internet + telefono',
                offerPrice: 29.95,
                otherPrices:70,
                isMobile: false,
                isValid:true

            },
            {
                /*la seconda e' mobile mandatoria */
                imgSrc: 'imgs/img0.jpg',
                offerName: 'Freedom',
                offerPrice: 9.95,
                otherPrices:0,
                isMobile: true,
                isValid:true
            }
        ];


    $scope.offerte_selezionabili = [
        {
            imgSrc: 'imgs/img0.jpg',
            offerName: 'Mobile 100',
            offerPrice:1.95,
            otherPrices:0,
            isMobile: true,
            isValid:false
        } ,
        {
            imgSrc: 'imgs/img1.jpg',
            offerName: 'Mobile 250',
            offerPrice: 5.95,
            otherPrices:0,
            isMobile: true,
            isValid:false
        },
        {
            imgSrc: 'imgs/img2.jpg',
            offerName: 'Freedom',
            offerPrice: 9.95,
            otherPrices:0,
            isMobile: true,
            isValid:false
        }
    ];


    $scope.offerte_aggiunte = [];



    $scope.$watch('offerte_aggiunte', function() {
        $scope.ricalcolaTotale();
    }, true);



    $scope.eliminaAggiunta = function (index) {
        $scope.offerte_aggiunte.splice(index, 1);
    };


    $scope.configura = function () {

        console.log("Metodo configura");
        $scope.contentPage = "configura.html"

    };

    $scope.procedi = function () {
        console.log("Metodo procedi");


        var mobili = {};


        mobili[$scope.offerte_mandatorie[1].offerName] = {
            offerName: $scope.offerte_mandatorie[1].offerName,
            quantity: 1
        };

        $scope.offerte_aggiunte.forEach(function (el, idx) {
            if (!(el.offerName in mobili)) {
                mobili[el.offerName] = {offerName: el.offerName, quantity: 0};
            }
            mobili[el.offerName].quantity = mobili[el.offerName].quantity + 1;
        });

        var mobili_toappend = [];
        Object.keys(mobili).forEach(function (el, idx) {
            /*per ciascuna delle chiavi */
            mobili_toappend.push(
                mobili[el]
            );
        });


        var toSend =
            {
                fixedOfferName: $scope.offerte_mandatorie[0].offerName,
                mobileOfferList: mobili_toappend
            }

        $scope.contentPage = "riepilogo.html";

    };

    $scope.preCheckout = function () {

        console.log("Metodo preCheckout");

        $scope.contentPage = "configura_carrello.html";
    };

    $scope.checkout = function () {

        console.log("Metodo checkout");

        /*tutte le mobili, raggruppate per label, con il numero di occorrenze */
        /*la prima e' sempre la mandatoria delle mobili */
        var mobili = {};
        mobili[$scope.offerte_mandatorie[1].offerName] = {
            offerName: $scope.offerte_mandatorie[1].offerName,
            quantity: 1
        };

        $scope.offerte_aggiunte.forEach(function (el, idx) {
            if (!(el.offerName in mobili)) {
                mobili[el.offerName] = {offerName: el.offerName, quantity: 0};
            }
            mobili[el.offerName].quantity = mobili[el.offerName].quantity + 1;
        });

        var mobili_toappend = [];
        Object.keys(mobili).forEach(function (el, idx) {
            /*per ciascuna delle chiavi */
            mobili_toappend.push(
                mobili[el]
            );
        });

        var toSend =
            {
                fixedOfferName: $scope.offerte_mandatorie[0].offerName,
                mobileOfferList: mobili_toappend
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
        $("body").css("cursor", "wait");
        $http.post('/cart', toSend).then(
            function (resp) {

                var redirectTo = resp.data;
                $("body").css("cursor", "default");
                document.location.href = redirectTo;

            },
            function () {
                alert("Qualcosa è andato storto");
                $("body").css("cursor", "default");
            }
        );
    };

    $scope.dataLoaded = true;

    $scope.back = function () {
        window.history.back();
    };

    $scope.configura_offerta=function(){
        window.open(
            'https://fastweb01--qapartial--c.cs81.visual.force.com/apex/ne__newOrderStep1?ordId=a4I260000001VAR',
            '_blank' // <- This is what makes it open in a new window.
        );
    };

    $scope.autoFill = function($event, tag, i){

        console.log("Autofill selector: " + tag + "-" + i);
        console.log("Value: " + $event.currentTarget.value);

        if($event.currentTarget.value===""){
            $("#msisdn-" + tag + "-" + i).val("");
            $("#tipologia-" + tag + "-" + i).val("");
            $("#imsi-" + tag + "-" + i).val("");
        }else{
            $("#msisdn-" + tag + "-" + i).val("123456789");
            $("#tipologia-" + tag + "-" + i).val("Automatica");
            $("#imsi-" + tag + "-" + i).val("0000000000");
        }
    };

    $scope.iccidFill = function(event, i){

        console.log("Autofill selector: " + "-" + i);
        console.log("Value: " + event.currentTarget.value);

        if(event.currentTarget.value===""){
            $("#msisdn-" + i).val("").trigger('change');
            $("#tipologia-" + i).val("").trigger('change');
        }else{
            $("#msisdn-" + i).val("123456789").trigger('change');
            $("#tipologia-" + i).val("Automatica").trigger('change');

        }
    };

    $scope.validateField=function(event){
        console.log("Validate field");
        if(event.currentTarget.value===""){
            event.currentTarget.style.border="1px solid red";
        }else{
            event.currentTarget.style.border="";
        }
    };

    $scope.validateIMEI=function(event){
        console.log("Validate IMEI");
        if(event.currentTarget.value==="353841080604242"){
            event.currentTarget.style.border="1px solid green";
        }else{
            event.currentTarget.style.border="1px solid red";
        }
    };
}]);
