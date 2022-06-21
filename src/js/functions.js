function RemoveSpaces(inputString) {
    return inputString.replace(/\s/g, '');
}
function ReadableNumber(inputString) {
    return String(Math.round(inputString)).replace(/ /g,"").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function RoundPercent(inputInteger) {
    return Math.round(inputInteger * 100) / 100;;
}
function diff_months(dt1, dt2) {
    //var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    //diff /= (60 * 60 * 24 * 7 * 4);
    //return Math.abs(Math.round(diff));
    var diffyear = (dt2.getYear() - dt1.getYear());
    return ((dt2.getMonth() - dt1.getMonth() - 1) + (diffyear * 12));
}
function RunNumbers(){
    /*
    
    input_annonse
    * input_kjopesum
    * input_effektivrente
    * input_egenkapital
    * input_kjopsutgifter
    * input_dokumentavgiftprosent
    * input_inflasjon
    * input_formueverdi
    * input_skatteprosent_overskudd
    * input_salgskostnad_prosent
    * input_kommunaleavgifter
    * input_fellesutgifter
    * input_soppelhandtering
    * input_husforsikring
    * input_feier
    * input_eiendomsskatt
    * input_leieinntekterskattefritt
    * input_leieinntekt_leilighet1
    * input_leieinntekt_leilighet2
    * input_leieinntekt_leilighet3
    * input_leieinntekt_leilighet4
    * input_vedlikehold
    * input_antallarinvestering
    * input_antallarnedbetaling
    
    
    output_annonse
    * output_kjopspris
    * output_utgiftervedkjop
    * output_formueverdi
    * output_lan
    * output_MinimumEgenkapital
    * output_lanprosentavkjopesum
    * output_kommunaleavgifter_permnd
    * output_vedlikehold_permnd
    * output_fellesutgifter_permnd
    * output_husforsikring_permnd
    * output_soppel_permnd
    * output_feier_permnd
    * output_eiendomsskatt_permnd
    * output_lannedbetaling
    * output_lanerenter
    * output_utgifterpermnd
    * output_inntektpermnd
    * output_fradragpåskatt
    * output_inflasjon
    * output_fortjeneste_permnd
    * output_fortjeneste_perar
    * output_salgssum
    * output_salgsgevinst
    * output_salgsgevinstskatt
    * output_egenkapitalprosent
    * output_egenkapitalavkastningprosent
    * YearByYearTableContainer

    */
    
    var inputelement = document.getElementsByTagName("input");

    for (var i = 0; i < inputelement.length; i++){
        if(inputelement[i].id == "input_annonse" || inputelement[i].id == "ShareLink"){
        } else if(inputelement[i].value == ""){
            inputelement[i].style.border = "1px solid #ff0000";
            inputelement[i].style.outline = "none";
            BlankOutput();
            return;
        } else {
            inputelement[i].style.border = "1px solid #fff";
            inputelement[i].style.outline = "";
        }
    }

    
    if(document.getElementById("input_annonse").value == ""){
        document.getElementById("output_annonse").innerHTML = "https://";
    } else {
        document.getElementById("output_annonse").innerHTML = document.getElementById("input_annonse").value;
    }
    
    var ret_output_kjopspris = parseInt(RemoveSpaces($("#input_kjopesum").val())) +
        parseInt(RemoveSpaces($("#input_kjopsutgifter").val())) +
        parseInt(RemoveSpaces($("#input_kjopesum").val())) * ($("#input_dokumentavgiftprosent").val() / 100);
    
    document.getElementById("output_kjopspris").innerHTML = ReadableNumber(ret_output_kjopspris) + " kr";
    
    var ret_utgiftervedkjop = parseInt(RemoveSpaces($("#input_kjopsutgifter").val())) +
                            parseInt(RemoveSpaces($("#input_egenkapital").val()))	+ 
                            (RemoveSpaces($("#input_kjopesum").val()) * (RemoveSpaces($("#input_dokumentavgiftprosent").val()) / 100));
    
    
    document.getElementById("output_utgiftervedkjop").innerHTML = ReadableNumber(ret_utgiftervedkjop) + " kr";
    
    document.getElementById("output_formueverdi").innerHTML = ReadableNumber(RemoveSpaces($("#input_formueverdi").val())) + " kr";
    
    var ret_output_lan = parseInt(RemoveSpaces($("#input_kjopesum").val())) - parseInt(RemoveSpaces($("#input_egenkapital").val()));
    document.getElementById("output_lan").innerHTML = ReadableNumber(ret_output_lan) + " kr";
    
    var ret_output_lanprosentavkjopesum = (ret_output_lan / parseInt(RemoveSpaces($("#input_kjopesum").val()))) * 100;
    document.getElementById("output_lanprosentavkjopesum").innerHTML = RoundPercent(ret_output_lanprosentavkjopesum) + "%";
    
    
    document.getElementById("output_MinimumEgenkapital").innerHTML = ReadableNumber(RemoveSpaces($("#input_kjopesum").val()) * 0.15) + " kr";
    document.getElementById("output_egenkapitalprosent").innerHTML = RoundPercent(((RemoveSpaces($("#input_egenkapital").val()) / RoundPercent(RemoveSpaces($("#input_kjopesum").val())))) * 100) + "%";
    
    
    
    
    var ret_InntekterPerMnd = parseInt(RemoveSpaces($("#input_leieinntekt_leilighet1").val())) +
        parseInt(RemoveSpaces($("#input_leieinntekt_leilighet2").val())) +
        parseInt(RemoveSpaces($("#input_leieinntekt_leilighet3").val())) +
        parseInt(RemoveSpaces($("#input_leieinntekt_leilighet4").val()));
    
    // Kommunale avgifter per år 	skattefritt
    // Vedlikehold per år 			skattefritt
    // Fellesutgifter per mnd 		skattefritt
    // Husforsikring				skattefritt
    // Eiendomsskatt				skattefritt
    // Feier						skattefritt
    // Søppelhandtering				skattefritt
    
    var ret_LanNedbetaling = ((ret_output_lan / parseInt($("#input_antallarnedbetaling").val())) / 12);
    var ret_LaneRenter = ((ret_output_lan * (RemoveSpaces($("#input_effektivrente").val()) / 100)) / 12);
    var ret_SkattfriUtgifterPerMnd = (parseInt(RemoveSpaces($("#input_kommunaleavgifter").val())) / 12)
                                    + parseInt(RemoveSpaces($("#input_fellesutgifter").val()))
                                    + (parseInt(RemoveSpaces($("#input_vedlikehold").val())) / 12)
                                    + parseInt(RemoveSpaces($("#input_soppelhandtering").val()))
                                    + parseInt(RemoveSpaces($("#input_husforsikring").val()))
                                    + parseInt(RemoveSpaces($("#input_feier").val()))
                                    + parseInt(RemoveSpaces($("#input_eiendomsskatt").val()));
    
    var Skatt_permnd = 0;
    if(ret_InntekterPerMnd <= ret_SkattfriUtgifterPerMnd){
        Skatt_permnd = 0;
    } else {
        Skatt_permnd = ((ret_InntekterPerMnd - ret_SkattfriUtgifterPerMnd) * ($("#input_skatteprosent_overskudd").val() / 100));	// Skatt av overskudd etter skattefratrekk
    }
    
    
    var ret_InntekterPerMnd_MinusSkatt = ret_InntekterPerMnd;
    
    
    if(document.getElementById("input_leieinntekterskattefritt").checked == true){ 	// Ingen skatt på leieinntekter
    } else if(ret_InntekterPerMnd > (20000 / 12)){ 									// Skatt kun av overskudd
        ret_InntekterPerMnd_MinusSkatt = ret_InntekterPerMnd - Skatt_permnd;
    }
    
    
    
    
    
    document.getElementById("output_kommunaleavgifter_permnd").innerHTML = "-" + ReadableNumber((parseInt(RemoveSpaces($("#input_kommunaleavgifter").val())) / 12)) + " kr<br /><span>skattefritt</span>";
    document.getElementById("output_fellesutgifter_permnd").innerHTML = "-" + ReadableNumber(RemoveSpaces($("#input_fellesutgifter").val())) + " kr<br /><span>skattefritt</span>";
    document.getElementById("output_vedlikehold_permnd").innerHTML = "-" + ReadableNumber(parseInt(RemoveSpaces($("#input_vedlikehold").val())) / 12) + " kr<br /><span>skattefritt</span>";
    document.getElementById("output_husforsikring_permnd").innerHTML = "-" + ReadableNumber(RemoveSpaces($("#input_husforsikring").val())) + " kr<br /><span>skattefritt</span>";
    document.getElementById("output_soppel_permnd").innerHTML = "-" + ReadableNumber(RemoveSpaces($("#input_soppelhandtering").val())) + " kr<br /><span>skattefritt</span>";
    document.getElementById("output_feier_permnd").innerHTML = "-" + ReadableNumber(RemoveSpaces($("#input_feier").val())) + " kr<br /><span>skattefritt</span>";
    document.getElementById("output_eiendomsskatt_permnd").innerHTML = "-" + ReadableNumber(RemoveSpaces($("#input_eiendomsskatt").val())) + " kr<br /><span>skattefritt</span>";
    
    document.getElementById("output_lannedbetaling").innerHTML = "-" + ReadableNumber(ret_LanNedbetaling) + " kr";
    document.getElementById("output_lanerenter").innerHTML = "-" + ReadableNumber(ret_LaneRenter) + " kr";
    
    document.getElementById("output_utgifterpermnd").innerHTML = "-" + ReadableNumber(ret_SkattfriUtgifterPerMnd + ret_LanNedbetaling + ret_LaneRenter) + " kr";
    
    
    
    document.getElementById("output_inntektpermnd").innerHTML = ReadableNumber(ret_InntekterPerMnd_MinusSkatt) + " kr";
    document.getElementById("output_fradragpaskatt").innerHTML = ReadableNumber(ret_output_lan * (RemoveSpaces($("#input_effektivrente").val()) / 100) * 0.22) + " kr";
    document.getElementById("output_inflasjon").innerHTML = ReadableNumber(parseInt(RemoveSpaces($("#input_kjopesum").val())) * ($("#input_inflasjon").val() / 100)) + " kr";
    
    
    var ret_Fortjeneste_permnd = (((ret_output_lan * (RemoveSpaces($("#input_effektivrente").val()) / 100) * 0.22) / 12)
                                  + ret_InntekterPerMnd_MinusSkatt
                                  - ret_SkattfriUtgifterPerMnd
                                  - ret_LanNedbetaling
                                  - ret_LaneRenter
                                  + (((parseInt(RemoveSpaces($("#input_kjopesum").val())) * ($("#input_inflasjon").val() / 100))) / 12));
    
    document.getElementById("output_fortjeneste_permnd").innerHTML = ReadableNumber(ret_Fortjeneste_permnd) + " kr";
    document.getElementById("output_fortjeneste_perar").innerHTML = ReadableNumber(ret_Fortjeneste_permnd * 12) + " kr";
    
    
    
    var ret_Salgssum = parseInt(RemoveSpaces($("#input_kjopesum").val()));
    for(i = 0; i < $("#input_antallarinvestering").val(); i++){
        ret_Salgssum += (ret_Salgssum * ($("#input_inflasjon").val() / 100));
    }
    document.getElementById("output_salgssum").innerHTML = ReadableNumber(ret_Salgssum) + " kr";
    
    /*var ret_Salgsgevinst = ((ret_Salgssum * (1 - ($("#input_salgskostnad_prosent").val() / 100))) - parseInt(RemoveSpaces($("#input_kjopesum").val())));
    var ret_Salgsgevinst = (ret_Salgssum - (parseInt(RemoveSpaces($("#input_kjopesum").val())) * (1 + ($("#input_dokumentavgiftprosent").val() / 100))));
        */ 
    
    var ret_Salgsgevinst = ((ret_Salgssum * (1 - ($("#input_salgskostnad_prosent").val() / 100))) - (parseInt(RemoveSpaces($("#input_kjopesum").val())) * (1 + ($("#input_dokumentavgiftprosent").val() / 100))));
    
    var ret_Salgsgevinst_etterskatt = ret_Salgsgevinst * (1 - ($("#input_skatteprosent_overskudd").val() / 100));
    var ret_Salgsgevinst_skatt = ret_Salgsgevinst * ($("#input_skatteprosent_overskudd").val() / 100);
    
    document.getElementById("output_salgsgevinst").innerHTML = ReadableNumber(ret_Salgsgevinst_etterskatt) + " kr";
    document.getElementById("output_salgsgevinstskatt").innerHTML = ReadableNumber(ret_Salgsgevinst_skatt) + " kr";
    

    var ret_output_egenkapitalavkastning_prosent = ((ret_Salgsgevinst_etterskatt / RemoveSpaces($("#input_egenkapital").val())) * 100) - 100;
    document.getElementById("output_egenkapitalavkastningprosent").innerHTML = ReadableNumber(ret_output_egenkapitalavkastning_prosent) + "%";
    
    
    
    
    // Plan
    
    
    
    
    var d = new Date();
    var d_endofyear = new Date(d.getFullYear()+1,0,1);
    var d_PercentLeftOfYear = diff_months(d, d_endofyear) / 12;

    
    var varGjenståendeLan = ret_output_lan;
    var varAvdrag = (ret_output_lan / parseInt($("#input_antallarnedbetaling").val())) * d_PercentLeftOfYear;
    var varRenter = (varGjenståendeLan * (RemoveSpaces($("#input_effektivrente").val()) / 100)) * d_PercentLeftOfYear;
    var varSkattefradrag = (varRenter * 0.22);
    
    
    
    ret_LanNedbetaling = ((varGjenståendeLan / parseInt($("#input_antallarnedbetaling").val())) / 12) * d_PercentLeftOfYear;
    ret_LaneRenter = (varGjenståendeLan * (RemoveSpaces($("#input_effektivrente").val()) / 100) / 12) * d_PercentLeftOfYear;
    ret_SkattfriUtgifterPerMnd = (parseInt(RemoveSpaces($("#input_kommunaleavgifter").val())) / 12)
                                    + parseInt(RemoveSpaces($("#input_fellesutgifter").val()))
                                    + (parseInt(RemoveSpaces($("#input_vedlikehold").val())) / 12)
                                    + parseInt(RemoveSpaces($("#input_soppelhandtering").val()))
                                    + parseInt(RemoveSpaces($("#input_husforsikring").val()))
                                    + parseInt(RemoveSpaces($("#input_feier").val()))
                                    + parseInt(RemoveSpaces($("#input_eiendomsskatt").val()));
    
    
    
    
    
    Skatt_permnd = 0;
    if(ret_InntekterPerMnd <= ret_SkattfriUtgifterPerMnd){
        Skatt_permnd = 0;
    } else {
        Skatt_permnd = ((ret_InntekterPerMnd - ret_SkattfriUtgifterPerMnd) * ($("#input_skatteprosent_overskudd").val() / 100));	// Skatt av overskudd etter skattefratrekk
    }
    
    ret_InntekterPerMnd_MinusSkatt = ret_InntekterPerMnd;
    
    if(document.getElementById("input_leieinntekterskattefritt").checked == true){ 	// Ingen skatt på leieinntekter
    } else if(ret_InntekterPerMnd > (20000 / 12)){ 									// Skatt kun av overskudd
        ret_InntekterPerMnd_MinusSkatt = ret_InntekterPerMnd - Skatt_permnd;
    }
    
    
    
    
    
    var varUtgifter = ((ret_SkattfriUtgifterPerMnd * 12) + varAvdrag + varRenter) * d_PercentLeftOfYear;
    var varInntekter = ((ret_InntekterPerMnd_MinusSkatt * 12) * d_PercentLeftOfYear);
    var varVerdiokning = 0;
    var varHusVerdi = parseInt(RemoveSpaces($("#input_kjopesum").val())) + varVerdiokning;
    
    /*var ret_Fortjeneste_permnd = (((ret_output_lan * (RemoveSpaces($("#input_effektivrente").val()) / 100) * 0.22) / 12)
                                  + ret_InntekterPerMnd_MinusSkatt
                                  - ret_SkattfriUtgifterPerMnd
                                  - ret_LanNedbetaling
                                  - ret_LaneRenter
                                  + (((parseInt(RemoveSpaces($("#input_kjopesum").val())) * ($("#input_inflasjon").val() / 100))) / 12));*/
    
    
    var varFortjeneste = (varInntekter - varUtgifter) + varSkattefradrag;
    var varEndYear = parseInt($("#input_antallarinvestering").val()) +1;
    var varTotalFortjeneste = varFortjeneste;
    
    var retContainer = "";
    
    
    retContainer = "<div class=\"RowHeader\">" +
                                                                    "	<div>Plan</div>" +
                                                                    "	<div><img src=\"/icon/share.png\" onClick=\"Share();\" /><img src=\"/icon/printer.png\" onClick=\"window.print();\" /></div>" +
                                                                    "</div>" +
                                                                    "<div id=\"YearByYearTableContainerScroll\">" +
                                                                    "	<div class=\"YearByYearTable_Row\">" +
                                                                    "		<div>År</div>" +
                                                                    "		<div>Avdrag</div>" +
                                                                    "		<div>Renter</div>" +
                                                                    "		<div>Gjenstående Lån</div>" +
                                                                    "		<div>Salgsverdi</div>" +
                                                                    "		<div>Utgifter</div>" +
                                                                    "		<div>Inntekter</div>" +
                                                                    "		<div>Verdiøkning</div>" +
                                                                    "		<div><div>Skattefratrekk<br /><span>22% av renter</span></div></div>" +
                                                                    "		<div>Fortjeneste<br /><span>Inntekter - Utgifter</span></div>" +
                                                                    "	</div>";
    
    for(i = 0; i <= varEndYear; i++){
        retContainer += 											"<div class=\"YearByYearTable_Row\">" +
                                                                        "	<div><span>" + ReadableNumber(i) + ".</span> " + (d.getFullYear() + i) + "</div>" +
                                                                        "	<div>-" + ReadableNumber(Math.round(varAvdrag)) + " kr</div>" +
                                                                        "	<div>-" + ReadableNumber(Math.round(varRenter)) + " kr</div>" +
                                                                        "	<div>" + ReadableNumber(Math.round(varGjenståendeLan)) + " kr</div>" +
                                                                        "	<div>" + ReadableNumber(Math.round(varHusVerdi)) + " kr</div>" +
                                                                        "	<div>-" + ReadableNumber(Math.round(varUtgifter)) + " kr</div>" +
                                                                        "	<div>" + ReadableNumber(Math.round(varInntekter)) + " kr</div>" +
                                                                        "	<div>" + ReadableNumber(Math.round(varVerdiokning)) + " kr</div>" +
                                                                        "	<div>" + ReadableNumber(Math.round(varSkattefradrag)) + " kr</div>" +
                                                                        "	<div>" + ReadableNumber(Math.round(varFortjeneste)) + " kr</div>" +
                                                                        "</div>";
        
        varGjenståendeLan -= varAvdrag;
        if(varGjenståendeLan <= 0){
            varGjenståendeLan = 0;
            
            if(i > parseInt($("#input_antallarnedbetaling").val())){
                varAvdrag = 0;
            } else {
                varAvdrag = (ret_output_lan / parseInt($("#input_antallarnedbetaling").val())) * (1-d_PercentLeftOfYear);
            }
        } else {
            varAvdrag = (ret_output_lan / parseInt($("#input_antallarnedbetaling").val()));
        }
        varRenter = (varGjenståendeLan * (RemoveSpaces($("#input_effektivrente").val()) / 100));
        varSkattefradrag = (varRenter * 0.22);
        
        varUtgifter = ((ret_SkattfriUtgifterPerMnd * 12) + varAvdrag + varRenter);
        varInntekter = (ret_InntekterPerMnd_MinusSkatt * 12);
        varVerdiokning = (varHusVerdi * ($("#input_inflasjon").val() / 100));
        varHusVerdi += varVerdiokning;
        varFortjeneste = (varInntekter - varUtgifter) + varVerdiokning + varSkattefradrag;
        varTotalFortjeneste += varFortjeneste;
    }
    document.getElementById("YearByYearTableContainer").innerHTML = retContainer + "<div class=\"YearByYearTable_Row\">" +
                                                                        "<div><span>" + ReadableNumber(i) + ".</span> " + (d.getFullYear() + i) + "</div>" +
                                                                        "<div></div>" +
                                                                        "<div></div>" +
                                                                        "<div></div>" +
                                                                        "<div>" + ReadableNumber(Math.round(varHusVerdi)) + " kr</div>" +
                                                                        "<div></div>" +
                                                                        "<div></div>" +
                                                                        "<div></div>" +
                                                                        "<div></div>" +
                                                                        "<div>" + ReadableNumber(Math.round(varTotalFortjeneste)) + " kr</div>" +
                                                                        "</div>" +
                                                                    "</div>";
}
    
function BlankOutput(){			
    document.getElementById("output_kjopspris").innerHTML 						= "-";
    document.getElementById("output_formueverdi").innerHTML 					= "-";
    document.getElementById("output_lan").innerHTML 							= "-";
    document.getElementById("output_MinimumEgenkapital").innerHTML 				= "-";
    document.getElementById("output_lanprosentavkjopesum").innerHTML 			= "-";
    document.getElementById("output_kommunaleavgifter_permnd").innerHTML 		= "-<br /><span>skattefritt</span>";
    document.getElementById("output_vedlikehold_permnd").innerHTML 				= "-<br /><span>skattefritt</span>";
    document.getElementById("output_fellesutgifter_permnd").innerHTML 			= "-<br /><span>skattefritt</span>";
    document.getElementById("output_husforsikring_permnd").innerHTML 			= "-<br /><span>skattefritt</span>";
    document.getElementById("output_soppel_permnd").innerHTML 					= "-<br /><span>skattefritt</span>";
    document.getElementById("output_feier_permnd").innerHTML 					= "-<br /><span>skattefritt</span>";
    document.getElementById("output_eiendomsskatt_permnd").innerHTML 			= "-<br /><span>skattefritt</span>";
    document.getElementById("output_lannedbetaling").innerHTML 					= "-";
    document.getElementById("output_lanerenter").innerHTML 						= "-";
    document.getElementById("output_utgifterpermnd").innerHTML 					= "-";
    document.getElementById("output_inntektpermnd").innerHTML 					= "-";
    document.getElementById("output_fradragpaskatt").innerHTML 					= "-";
    document.getElementById("output_inflasjon").innerHTML 						= "-";
    document.getElementById("output_fortjeneste_permnd").innerHTML 				= "-";
    document.getElementById("output_fortjeneste_perar").innerHTML				= "-";
    document.getElementById("output_salgssum").innerHTML 						= "-";
    document.getElementById("output_salgsgevinst").innerHTML 					= "-";
    document.getElementById("output_salgsgevinstskatt").innerHTML 				= "-";
    document.getElementById("output_egenkapitalprosent").innerHTML 				= "-";
    document.getElementById("output_egenkapitalavkastningprosent").innerHTML 	= "-";
    
    
    document.getElementById("YearByYearTableContainer").innerHTML = "<div class=\"RowHeader\">" +
                                                                    "	<div>Plan</div>" +
                                                                    "	<div><img src=\"/icon/share.png\" onClick=\"Share();\" /><img src=\"/icon/printer.png\" onClick=\"window.print();\" /></div>" +
                                                                    "</div>" +
                                                                    "<div id=\"YearByYearTableContainerScroll\">" +
                                                                    "	<div class=\"YearByYearTable_Row\">" +
                                                                    "		<div>År</div>" +
                                                                    "		<div>Avdrag</div>" +
                                                                    "		<div>Renter</div>" +
                                                                    "		<div>Gjenstående Lån</div>" +
                                                                    "		<div>Salgsverdi</div>" +
                                                                    "		<div>Utgifter</div>" +
                                                                    "		<div>Inntekter</div>" +
                                                                    "		<div>Verdiøkning</div>" +
                                                                    "		<div><div>Skattefratrekk<br /><span>22% av renter</span></div></div>" +
                                                                    "		<div>Fortjeneste<br /><span>Inntekter + Verdiøkning - Utgifter</span></div>" +
                                                                    "	</div>" +
                                                                    "</div>";
}
function NyFormue(){
    /*
    input_kjopesum
    input_formueverdi
    */
    
    
    if(!isNaN(parseInt(RemoveSpaces($("#input_kjopesum").val())))){
        console.log("ny formue");
        document.getElementById("input_formueverdi").value = ReadableNumber(parseInt(RemoveSpaces($("#input_kjopesum").val())) * 0.25);
    }
}

function Share(){
    Share_GenerateLink();
    $('.ShareContainer').css('display', 'grid');
    $('body').css('overflow', 'hidden');
}
function ShareClose(){
    $('.ShareContainer').css('display', 'none');
    $('body').css('overflow', 'auto');
}
function copyToClipboard(element) {
    /* Get the text field */
    var copyText = document.getElementById(element);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    
    
    ShareClose();
    alert('Kopiert!');
}
function Share_GenerateLink(){
    var inputelement = document.getElementsByTagName("input");
    var selectelement = document.getElementsByTagName("select");
    var ShareKey = "";

    for (var i = 0; i < inputelement.length; i++){
        if(inputelement[i].id == "ShareLink"){
        } else if(inputelement[i].id != ""){
            if(ShareKey != ""){ ShareKey += "&"; }
            
            ShareKey += inputelement[i].id + "=" + RemoveSpaces(inputelement[i].value);
        }
    }
    for (var i = 0; i < selectelement.length; i++){
        if(selectelement[i].id != ""){
            if(ShareKey != ""){ ShareKey += "&"; }
            
            ShareKey += selectelement[i].id + "=" + RemoveSpaces(selectelement[i].value);
        }
    }
    
    $("#ShareLink").val("https://utleie.tloberg.net/?" + ShareKey);
}
    
function ViewAd(){
    if(document.getElementById("input_annonse").value != ""){
        window.open(document.getElementById("input_annonse").value, '_blank');
    }
}