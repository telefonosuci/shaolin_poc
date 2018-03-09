var app = angular.module("app0", ["ngDragDrop","ngSanitize"]);


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

    $scope.operatori=[
        {
            nome:"BT Enia Mobile"
        },
        {
            nome:"BT Italia Full MVNO"
        },
        {
            nome:"Coop Voce"
        },
        {
            nome:"Daily Telecom Mobile"
        },
        {
            nome:"Digi Mobili FULL"
        },
        {
            nome:"Digitel Italia"
        },
        {
            nome:"ERG Mobile"
        },
        {
            nome:"Green ICN"
        },
        {
            nome:"Intematica"
        },
        {
            nome:"Lycamobile Full MVNO"
        },
        {
            nome:"Nextus Telecom"
        },
        {
            nome:"Noitel Italia"
        },
        {
            nome:"Noverca Kena Mobile Telecom"
        },
        {
            nome:"NV Mobile"
        },
        {
            nome:"Postemobile Full"
        },
        {
            nome:"Poste Mobile"
        },
        {
            nome:"Rabona Mobile"
        },
        {
            nome:"RINGO MOBILE"
        },
        {
            nome:"Tim"
        },
        {
            nome:"Tiscali"
        },
        {
            nome:"Tre"
        },
        {
            nome:"UNO Mobile"
        },
        {
            nome:"Vodafone"
        },
        {
            nome:"Welcome Italia"
        },
        {
            nome:"Wind"
        },
        {
            nome:"VEI"
        },
        {
            nome:"Iliad Italia"
        },
        {
            nome:"Optima Italia"
        }
    ];

    $scope.tipoDocumenti=[
        {
            tipo:"Patente"
        },
        {
            tipo:"Passaporto"
        },
        {
            tipo:"Carta di identità"
        }
    ];

    $scope.tipoContratto=[
        {
            nome:"Ricaricabile"
        },
        {
            nome:"Abbonamento"
        }
    ];



    $scope.offerte_configurabili =
        [
            {
                imgSrc: 'imgs/img2.jpg',
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
                tipo_documento:"",
                msisd_nportato:"",
                origine:"",
                operatore:"",
                iccid_donating:"",
                imei:"",
                numero_documento:"",
                flag_tcr:"",
                mnp_disabled:true,
                imei_disabled:true,
                contract_type:"ricaricabile",   //autoricarica|abbonamento|ricaricabile
                terminal_type:"no", //sussidiato|rateale|oneshot
                info:""
            },
            {
                imgSrc: 'imgs/img1.jpg',
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
                tipo_documento:"",
                msis_dnportato:"",
                origine:"",
                operatore:"",
                iccid_donating:"",
                imei:"",
                numero_documento:"",
                flag_tcr:"",
                mnp_disabled:true,
                imei_disabled:false,
                contract_type:"autoricarica",
                terminal_type:"rateale",
                info:"<p><b>Huawei Ascend P7 Black</b></p><p>A 192 euro con rata da 8 euro.</p>"
            },
            {
                //imgSrc: 'imgs/img_mobilefreedom.jpg',
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
                tipo_documento:"",
                msisdn_portato:"",
                origine:"",
                operatore:"",
                iccid_donating:"",
                imei:"",
                numero_documento:"",
                flag_tcr:"",
                mnp_disabled:false,
                imei_disabled:true,
                contract_type:"abbonamento",
                terminal_type:"no",
                info:"Richiesta MNP."
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

    $scope.sampleData= {

            mobile500:{

            },
            moblie250:{

            },
            freedom:{

            }

        };




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

        $(".section-mnp-0 input").prop("disabled", true);
        $(".section-mnp-0 select").prop("disabled", true);
        $(".section-imei-0 input").prop("disabled", true);

        $(".section-imei-1 input").prop("disabled", true);

        $(".section-mnp-2 input").prop("disabled", true);
        $(".section-mnp-2 select").prop("disabled", true);

    };





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

    $scope.iccidFill = function(event, i){

        console.log("Autofill selector: " + "-" + i);
        console.log("Value: " + event.currentTarget.value);

            if(event.currentTarget.value===""){
                $("#msisdn-" + i).val("").trigger('change');
                $("#tipologia-" + i).val("").trigger('change');
            }else{
                if(i==0){
                    $("#msisdn-" + i).val("3341250125").trigger('change');
                    $("#tipologia-" + i).val("Voce e Dati").trigger('change');
                }else if(i == 1){
                    $("#msisdn-" + i).val("3338850898").trigger('change');
                    $("#tipologia-" + i).val("Voce").trigger('change');
                }else if(i == 2){
                    $("#msisdn-" + i).val("3202434432").trigger('change');
                    $("#tipologia-" + i).val("Voce").trigger('change');
                }

            }
    };

    $scope.validateField=function(event){

        console.log("Validate field");
        if(event.currentTarget.value===""){
            event.currentTarget.style.border="1px solid #b73217";
            return false;
        }else{
            event.currentTarget.style.border="";
            return true;
        }
    };

    $scope.validateIMEI=function(event, i){

        console.log("Validate IMEI");

        $("#loading-imei-" + i).attr("hidden", false);

        setTimeout(function(){

            if(event.currentTarget.value.length==15){
                event.currentTarget.style.border="1px solid green";
                $("#error-imei-" + i).html("");
                $("#loading-imei-" + i).attr("hidden", true);
                return true;
            }else{
                event.currentTarget.style.border="1px solid #b73217";
                //var errorSpan = $('<span />').attr('className', 'error-message').html('IMEI non valido.');
                //event.currentTarget.nextSibling=errorSpan;
                $("#error-imei-" + i).html("IMEI non valido.");
                $("#loading-imei-" + i).attr("hidden", true);
                return false;
            }

        }, 3000);
    };


    $scope.validateICCID = function(event, i){

        console.log("Validate ICCID Donating");

        $("#loading-iccid-" + i).attr("hidden", false);

        setTimeout(function(){
            if(event.currentTarget.value.length==19
                || event.currentTarget.value.length==20
            ){
                event.currentTarget.style.border="1px solid green";
                $("#error-iccid-" + i).html("");
                $scope.iccidFill(event, i);
                $("#loading-iccid-" + i).attr("hidden", true);
                return true;

            }else{
                event.currentTarget.style.border="1px solid #b73217";
                $("#error-iccid-" + i).html("ICCID non valido.");
                $("#msisdn-" + i).val("").trigger('change');
                $("#tipologia-" + i).val("").trigger('change');
                $("#loading-iccid-" + i).attr("hidden", true);
                return false;
            }

        }, 3000);
    };

    $scope.validateMSISDN = function(event){

        console.log("Validate ICCID Donating");

        if(
            event.currentTarget.value.length>=9
            || event.currentTarget.value.length>=10
        ){
            event.currentTarget.style.border="1px solid green";
            return true;
        }else{
            event.currentTarget.style.border="1px solid #b73217";
            return false;
        }
    };

    $scope.disableSection = function(i, section){
        $(".section-" + section + "-" + i + " input").prop("disabled", true);
        $(".section-" + section + "-" + i + " select").prop("disabled", true);
    };

    $scope.expandInfo= function(i){

        var tab=$("#offer-tab-"+i);

        if(tab.hasClass("tab-right")){
            tab.removeClass("tab-right");
            tab.addClass("tab-left");
        }else{
            tab.removeClass("tab-left");
            tab.addClass("tab-right");
        }

        $("#offer-info-"+i).toggle(500);

    };

}]);
