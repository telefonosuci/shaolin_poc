var app = angular.module("app0", ["ngDragDrop"]);


app.controller('ctr0', ["$scope", "$http", function ($scope, $http) {

    $scope.contentPage = "main.htm";

    $scope.totale = 0;
    $scope.totaleParziale = 0;

    $scope.droppato = function(){
        alert("ciao");
    };

    $scope.ricalcolaTotale = function(){

        $scope.totale = 0;
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

    $scope.offerte_mandatorie =
        [
            {
                /*la prima e' la fissa mandatoria */
                imgSrc: 'imgs/img_internettelefono.jpg',
                offerName: 'Fastweb Special',
                offerPrice: 20,
                isMobile: false

            },
            {
                /*la seconda e' mobile mandatoria */
                imgSrc: 'imgs/img0.jpg',
                offerName: 'Mobile 100',
                offerPrice: 0.95,
                isMobile: true
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
            offerPrice: 5.95,
            isMobile: true
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


        $scope.totale = 0;
        $scope.totaleParziale = 0;


        $scope.offerte_mandatorie.forEach(function (el, idx) {
            $scope.totale = $scope.totale + el.offerPrice;
            $scope.totaleParziale = $scope.totaleParziale + el.offerPrice;
        });

        $scope.offerte_aggiunte.forEach(function (el, idx) {
            $scope.totale = $scope.totale + el.offerPrice;
            $scope.totaleParziale = $scope.totaleParziale + el.offerPrice;
        });


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


        $scope.totale = 0;
        $scope.totaleParziale = 0;

        $scope.offerte_mandatorie.forEach(function (el, idx) {
            $scope.totale = $scope.totale + el.offerPrice;
            $scope.totaleParziale += el.offerPrice;
        });

        $scope.offerte_aggiunte.forEach(function (el, idx) {
            $scope.totale = $scope.totale + el.offerPrice;
            $scope.totaleParziale += el.offerPrice;
        });


        $scope.contentPage = "riepilogo.html"

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
}]);
