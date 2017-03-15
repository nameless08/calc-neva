'use strict';
        
        ;(function($, undefined){ 

            var optAC = { // опции вентилятора
                
                wheel : {

                    select : getEl('#wheelDiameter', false),
                    options : getEl('#wheelDiameter').options, // все диаметры
                    diameter : 0,
                    index : 0

                },
    
                flow : [ 'До 6', 'До 7', 'До 23', 'До 25', 'До 45', 'До 50', 'До 60', 'До 70', 'До 200' ], // расход

                pressure : [ // напор

                    ['До 350', '350 – 400'],
                    ['До 300', '300 – 350'],
                    ['До 300', '300 – 450', '450 – 530'],
                    ['До 190', '190 – 260', '260 – 310'],
                    ['До 250', '250 – 340', '340 – 420'],
                    ['До 280', '280 – 400', '400 – 500'],
                    ['До 230', '230 – 320', '320 – 400'],
                    ['До 260', '260 – 380', '380 – 475'],
                    ['До 300', '300 – 420', '420 – 530']

                ],

                blades : [

                    ['4', '6'],
                    ['4', '6'],
                    ['4', '6', '8'],
                    ['4', '6', '8'],
                    ['4', '6', '8'],
                    ['4', '6', '8'],
                    ['4', '6', '8'],
                    ['4', '6', '8'],
                    ['4', '6', '8']

                ],   

                cost : [

                    ['23100', '28000'],
                    ['26500', '31000'],
                    ['46200', '58800', '64000'],
                    ['54600', '69300', '75000'],
                    ['58800', '74600', '87000'],
                    ['60900', '76600', '94500'],
                    ['75600', '95500', '123900'],
                    ['78800', '98700', '128100'],
                    ['180000', '210000', '245000']

                ],

                size : {

                    const1: 'ВО',
                    wheelD: '800',
                    numB: '4',
                    const2: 'AL',
                    climatic: 'У1',

                },

                climaticFactor : 1,

            },

            airFlowInput = getEl('#airFlow', false),
            pressure = getEl('#pressure', false),
            marking,
            climaticVer = getEl('#climaticVer', false),
            airSize = getEl('.air-size div', false);

            optAC.wheel.select.addEventListener('change', generatePressure, false);
            pressure.addEventListener('change', generateBlades, false);
            climaticVer.addEventListener('change', generateClimatic, false);

            function generatePressure(){
                
                var pressure = getEl('#pressure', false);

                for (var i = 0; i < optAC.wheel.options.length; i++){

                    if(optAC.wheel.options[i].selected){
                        optAC.wheel.diameter = optAC.wheel.options[i].value;
                        optAC.size.wheelD = optAC.wheel.diameter;
                        optAC.wheel.index = optAC.wheel.options[i].index;
                    }

                }
                
                pressure.options[0].selected = true;
                generateBlades();

                airSize.innerHTML = formationSize();

                airFlowInput.value = optAC.flow[optAC.wheel.index];
                clearCollection(pressure);

                creatNewCollection(pressure, optAC.wheel.index);
                generateCost();

            }
        
            function generateClimatic(){

                for (var i = 0; i < climaticVer.options.length; i++){

                    if(climaticVer.options[i].selected){
                       optAC.size.climatic = climaticVer.options[i].text;
                    }

                }

                airSize.innerHTML = formationSize();
                generateCost();

            }

            function generateBlades(){
                
                var pressure = getEl('#pressure', false),
                    blades = getEl('#numBlades', false),
                    idx;

                for (var i = 0; i < pressure.options.length; i++){

                    if(pressure.options[i].selected){
                        idx = pressure.options[i].index;
                    }

                }

                optAC.size.numB = optAC.blades[optAC.wheel.index][idx]
                airSize.innerHTML = formationSize();
                generateCost();
               
            }

            function generateCost(){

                var pressure = getEl('#pressure', false),
                    idx, currentPrice, toDisplayPrice,
                    screen = getEl('.calc__output-screen span'),
                    climaticVer = getEl('#climaticVer', false),
                    climaticVal;

                for (var i = 0; i < climaticVer.options.length; i++){

                    if(climaticVer.options[i].selected){
                       climaticVal = parseFloat(climaticVer.options[i].value);
                    }

                }

                console.log(climaticVal);

                for (var i = 0; i < pressure.options.length; i++){

                    if(pressure.options[i].selected){
                        idx = pressure.options[i].index;
                    }

                }

                currentPrice = (optAC.cost[optAC.wheel.index][idx] * climaticVal).toFixed(0);
                toDisplayPrice = currentPrice + ' p.';

                console.log(toDisplayPrice.length);
                

                if(toDisplayPrice.length < 9){
                    
                   toDisplayPrice =  toDisplayPrice.substring(0,2) + ' ' + toDisplayPrice.substring(2,9);

                }else if(toDisplayPrice.length == 9){

                    toDisplayPrice =  toDisplayPrice.substring(0,3) + ' ' + toDisplayPrice.substring(3,10);

                }

                screen.innerHTML = toDisplayPrice;
                

            }

            function getEl(s, g) {
                var cE, el; 
                if(g){
                    cE = document.querySelectorAll(s); 
                    return cE;
                }else{
                    el = document.querySelector(s);
                    return el;
                }
            }

            function clearCollection(sel){

                var opts = sel.options;

                while(opts.length > 0){

                    opts[opts.length-1] = null;

                }
            }
            
            function creatNewCollection(sel, idx){

                for(var i = 0; i < optAC.pressure[idx].length; i++){

                  sel.options[i] = new Option(optAC.pressure[idx][i], i);

                }

                sel.options[0].selected = true;
            }

            function formationSize(){
               return marking = optAC.size.const1 + '-' + optAC.size.wheelD + '\/' + optAC.size.numB + '-' + optAC.size.climatic;
            }
    

        })(jQuery);
