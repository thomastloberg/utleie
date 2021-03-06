import { useState } from 'react';
import '../css/App.scss';
import Inputrow from '../components/Inputrow';
import Textrow from '../components/Textrow';
import Outputrow from '../components/Outputrow';
import PlanOutputrow from '../components/PlanOutputrow';
import { readableNumber, roundPercent, diffMonths } from '../js/Functions';

function App() {
	// 	State Variables			Default Values
	const default_kjopesum = 2300000;

	const [value, setValue] = useState({
		annonse_url: 			'',
		kjopesum: 				default_kjopesum,
		effektiv_rente: 		2.4,
		har_kausjonist:			false,
		sekundaerbolig:			false,
		kausjonist_kapital:		0,
		egenkapital:			0,
		ekstra_kjopsutgifter:	0,
		dokumentavgift:			2.5,
		inflasjon:				2.24,
		formueverdi:			(default_kjopesum * 0.25),
		skatt_overskudd:		22,
		salgskostnad:			1.75,
		kommunaleavgifter:		15000,
		fellesutgifter:			0,
		vedlikehold:			24000,
		husforsikring:			375,
		soppelhandtering:		200,
		feier:					125,
		eiendomsskatt:			200,
		bruker_over50selv:		false,
		leie1:					8000,
		leie2:					0,
		leie3:					0,
		leie4:					0,
		invistering_lengd:		10,
		nedbetaling_lengd:		30,
	});

	

	/**
	 * Variables calculated based on user-input
	 */
	let getKjopspris 		= Math.round(value['kjopesum'] + 
										  value['ekstra_kjopsutgifter'] +
										  (value['kjopesum'] * value['dokumentavgift'] / 100));
	let getUtgiftervedkjop 	= Math.round(value['ekstra_kjopsutgifter'] + 
										 value['egenkapital'] + 
										 (value['kjopesum'] * (value['dokumentavgift'] / 100)));
	let getLeieInntekter 	= (value['leie1'] + value['leie2'] + value['leie3'] + value['leie4']);
	let getLaan 			= (value['kjopesum'] - value['egenkapital']);
	let getLaan_avkjopssum 	= (((value['kjopesum'] - value['egenkapital']) / value['kjopesum']) * 100);
	let getAvdrag 			= Math.round((getLaan / value['nedbetaling_lengd']) / 12);
	let getRenter 			= Math.round(((getLaan * (value['effektiv_rente'] / 100)) / 12));
	let getKomAvgifter_mnd	= Math.round(value['kommunaleavgifter'] / 12);
	let getVedlikehold_mnd	= Math.round(value['vedlikehold'] / 12);
	let getUtgifter_Skattfri 	= getKomAvgifter_mnd + 
									value['fellesutgifter'] +
									getVedlikehold_mnd + 
									value['husforsikring'] + 
									value['soppelhandtering'] + 
									value['feier']  + 
									value['eiendomsskatt'];
	let getUtgifter_Skattbar 	= getAvdrag + getRenter;
	let getUtgifterTotal	 	= getUtgifter_Skattfri + getUtgifter_Skattbar;

	let getSkattoverskudd	 	= (value['skatt_overskudd'] / 100);
	if(value['bruker_over50selv']) getSkattoverskudd = 0;		// Bruker over 50% selv. Ingen skatt p?? overskudd

	let getLeieInn_Skatt	 	= Math.round((getLeieInntekter - getUtgifter_Skattfri) * getSkattoverskudd);
	if(getLeieInn_Skatt < 0) getLeieInn_Skatt = 0;				// Om skattefri utgifter overstiger leieinntekter

	let getLeieInn_Etterskatt	= (getLeieInntekter - getLeieInn_Skatt);
	let getVerdiokning 		 	= Math.round(value['kjopesum'] * (value['inflasjon'] / 100));
	let getRentegodkjoring 		= Math.round((getRenter * 12) * 0.22); // 22% av renter betalt blir trukket av p?? skatten
	let getTotalFortjeneste_ar  = Math.round((getLeieInn_Etterskatt * 12) - (getUtgifterTotal * 12) + getVerdiokning + getRentegodkjoring);
	let getInflasjon 			= (value['inflasjon'] / 100);

	let getSalgssum 			= value['kjopesum'];
	for(let i = 0; i < value['invistering_lengd']; i++){
		getSalgssum += (getSalgssum * getInflasjon);
	}
	getSalgssum = Math.round(getSalgssum);

	let getSalgsskatt			= Math.round(getSalgssum * (value['salgskostnad'] / 100));
	let getSalgsprofitt			= (getSalgssum - getSalgsskatt);
	let getInvisteringsprofitt	= ((getTotalFortjeneste_ar * value['invistering_lengd']) - getSalgsskatt);

	let getKapitalavkastning	= Math.round(((getSalgsprofitt / (value['egenkapital'] + value['ekstra_kjopsutgifter'])) * 100) - 100) + '%';
	if((value['egenkapital'] + value['ekstra_kjopsutgifter']) === 0) getKapitalavkastning = 'ingen kapital brukt';




	/**
	 * Plan
	 */
	let d 						= new Date();
	let d_endofyear 			= new Date(d.getFullYear()+1,0,1);
	let d_PercentLeftOfYear 	= diffMonths(d, d_endofyear) / 12;

	// Default start values:
	let calcLaan 			= getLaan;
	let calcAvdrag 			= Math.round((calcLaan / value['nedbetaling_lengd']) / 12);
	let calcRenter 			= Math.round(((calcLaan * (value['effektiv_rente'] / 100)) / 12));
	let calcGjenstaandeLan 	= calcLaan;
	let calcVerdiokning 	= Math.round(value['kjopesum'] * (value['inflasjon'] / 100));
	let calcSalgsverdi 		= Math.round(calcLaan + calcVerdiokning);
	let calcUtgifter 		= Math.round(getUtgifterTotal * 12);
	let calcInntekter 		= Math.round(getLeieInn_Etterskatt * 12);
	let calcSkattefratrekk 	= Math.round((calcRenter * 12) * 0.22); // 22% av renter betalt blir trukket av p?? skatten
	let calcFortjeneste 	= Math.round(calcInntekter - calcUtgifter + getVerdiokning + getRentegodkjoring);



	let getPlanTable = [];

	for(let i = 0; i <= value['nedbetaling_lengd']; i++){
		getPlanTable.push(<PlanOutputrow key={readableNumber(i)} rowIndex={readableNumber(i)} 
				display={[
						`${(d.getFullYear() + i)}`,
						`-${readableNumber(calcAvdrag)} kr`,
						`-${readableNumber(calcRenter)} kr`,
						`${readableNumber(calcGjenstaandeLan)} kr`,
						`${readableNumber(calcSalgsverdi)} kr`,
						`-${readableNumber(calcUtgifter)} kr`,
						`${readableNumber(calcInntekter)} kr`,
						`${readableNumber(calcVerdiokning)} kr`,
						`${readableNumber(calcSkattefratrekk)} kr`,
						`${readableNumber(calcFortjeneste)} kr`
					]} 
			/>);
	}



	
	function calcFormue(){
		let nyFormue = (value['kjopesum'] * 0.25);
		setValue({ ...value, formueverdi: nyFormue });
	}


	return (<>
      <div className="ShareContainer">
      	<div className="ContainerContent">
			<div className="DialogHeader">Del</div>
			<div>Delings link:</div>
			<div><input type="text" id="ShareLink" /></div>
			<div className="btnGenerate noselect">Kopier!</div>
		</div>
      </div>


      <div className="InputContainer">
        <div className="RowHeader">Utleiekalkulator</div>
		<div className="AnnonseRow CategorySplit_Short">
			<div className="Annonse_Title">Annonse</div>
			<div className="Annonse_URL">
				<input id="input_annonse" type="text" placeholder="https://" 
					value={value.annonse_url}
					onChange={(e) => setValue({ ...value, annonse_url: e.target.value })} />
			</div>
			<div className="Annonse_Buttons"><span onClick={() => console.log(value)}>Kopier</span> - <span>Se annonse</span></div>
		</div>


        <Inputrow text='Kj??pesum' 			  type='number' 
				  posttext=' kr' state={['kjopesum', value, setValue]} />
		<Inputrow text='Rente p?? l??n' 		  type='number' detail='effektiv' 
				  posttext=' %' state={['effektiv_rente', value, setValue]} />
        <Inputrow text='Egenkapital' 		  type='number' detail='effektiv' posttext=' kr' 
				  seconddetail={(<>Min: 
				  	<font className='button' 
				  			onClick={(e) => setValue({ ...value, egenkapital: (value['sekundaerbolig'] === true ? (value['kjopesum'] * 0.25) : (value['kjopesum'] * 0.15)) })}
					> {(value['sekundaerbolig'] === true ? readableNumber(value['kjopesum'] * 0.25) :  readableNumber(value['kjopesum'] * 0.15))} kr</font></>)}
				  state={['egenkapital', value, setValue]} />
        <Textrow 
			firstcol={(<>Egenkapital:<br /><span>prosent</span></>)} 
			secondcol={(<><div>{roundPercent((value['egenkapital'] / value['kjopesum']) * 100)}%</div></>)} 
		/>
		<Inputrow text='Ekstra kj??psutgifter' type='number' rowclassname='CategorySplit'
				  posttext=' kr' state={['ekstra_kjopsutgifter', value, setValue]} />
        
		
		<Inputrow text='Dokumentavgift' 	  type='number' 
				  posttext=' %' state={['dokumentavgift', value, setValue]} />
        <Inputrow text='Inflasjon' 			  type='number' detail='per ??r' 
				  posttext=' %' state={['inflasjon', value, setValue]} />
        <Inputrow text='Formueverdi' 		  type='number' 
				  posttext={(<>kr<br /><span className='button' onClick={() => calcFormue()}>Estimer</span></>)} 
				  state={['formueverdi', value, setValue]} />
        <Inputrow text='Skatteprosent' 		  type='number' detail='Overskudd' 
				  posttext=' %' state={['skatt_overskudd', value, setValue]} />
        <Inputrow text='Salgskostnad' 		  type='number' detail='Prosent av verdi' rowclassname='CategorySplit' 
				  posttext=' %' state={['salgskostnad', value, setValue]} />
        

		<Inputrow text='Kommunale avgifter'   type='number' detail='per ??r'
				  posttext=' kr' state={['kommunaleavgifter', value, setValue]} />
        <Inputrow text='Fellesutgifter'   	  type='number' detail='per mnd'
				  posttext=' kr' state={['fellesutgifter', value, setValue]} />
        <Inputrow text='Vedlikehold'   	  	  type='number' detail='per ??r'
				  posttext=' kr' state={['vedlikehold', value, setValue]} />
        <Inputrow text='Husforsikring'   	  type='number' detail='per mnd' 
				  posttext=' kr' state={['husforsikring', value, setValue]} />
        <Inputrow text='S??ppelhandtering'     type='number' detail='per mnd' 
				  posttext=' kr' state={['soppelhandtering', value, setValue]} />
        <Inputrow text='Feier'    			  type='number' detail='per mnd' 
				  posttext=' kr' state={['feier', value, setValue]} />
        <Inputrow text='Eiendomsskatt'    	  type='number' detail='per mnd' rowclassname='CategorySplit'
				  posttext=' kr' state={['eiendomsskatt', value, setValue]} />
        

		<Inputrow text='Bruker over 50% av eiendomen selv?' type='checkbox'
				  state={['bruker_over50selv', value, setValue]} />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 1' 
				  posttext=' kr' state={['leie1', value, setValue]} />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 2' 
				  posttext=' kr' state={['leie2', value, setValue]} />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 3'
				  posttext=' kr' state={['leie3', value, setValue]} />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 4' rowclassname='CategorySplit'
				  posttext=' kr' state={['leie4', value, setValue]} />
        

		<Inputrow text='Antall ??r investering'type='select' range='1-30' 
				  posttext='??r' state={['invistering_lengd', value, setValue]} />
        <Inputrow text='Antall ??r nedbetaling'type='select' rowclassname='CategoryEnd' range='1-30' 
				  posttext='??r' state={['nedbetaling_lengd', value, setValue]} />
        
	  </div>


      <div className="OutputContainer">
        <div className="RowHeader">N??kkeltall</div>

		<div className="AnnonseRow CategorySplit">
			<div id='output_annonse'>{(value['annonse_url'] !== '' ? value['annonse_url'] : 'https://')}</div>
		</div>

		<Outputrow firsttext='Kj??pesum' 
				   secondtext={`${readableNumber(getKjopspris)} kr`} />
        <Outputrow firsttext='Forh??ndskostnad' firstdetail='egenkapital + dok.avgift + ekstra' 
				   secondtext={`${readableNumber(getUtgiftervedkjop)} kr`} />
		<Outputrow firsttext='Formueverdi' 
				   secondtext={`${readableNumber(value['formueverdi'])} kr`} />
		<Outputrow firsttext='L??n' 
				   secondtext={`${readableNumber(getLaan)} kr`} />
        <Outputrow  firsttext='L??n' firstdetail='av kj??pesum' rowclassname='CategorySplit' 
				   secondtext={`${roundPercent(getLaan_avkjopssum)} %`} />


		<Outputrow 
			firsttext='Kommunale avgifter' 	
			secondtext={`-${readableNumber(getKomAvgifter_mnd)} kr`}
			firstdetail='per mnd' 				seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Fellesutgifter' 	
			secondtext={`-${readableNumber(value['fellesutgifter'])} kr`}
			firstdetail='per mnd' 				seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Vedlikehold' 	
			secondtext={`-${readableNumber(getVedlikehold_mnd)} kr`}
			firstdetail='per mnd' 				seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Husforsikring' 	
			secondtext={`-${readableNumber(value['husforsikring'])} kr`}
			firstdetail='per mnd' 				seconddetail='skattefritt' />
		<Outputrow 
			firsttext='S??ppelhandtering' 	
			secondtext={`-${readableNumber(value['soppelhandtering'])} kr`}
			firstdetail='per mnd' 				seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Feier' 				
			secondtext={`-${readableNumber(value['feier'])} kr`}
			firstdetail='per mnd' 				seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Eiendomsskatt' 		
			secondtext={`-${readableNumber(value['eiendomsskatt'])} kr`}
			firstdetail='per mnd' 				seconddetail='skattefritt' />	
		<Outputrow firsttext='Avdrag L??n' 		firstdetail='per mnd' secondtext={`-${readableNumber(getAvdrag)} kr`} />
		<Outputrow firsttext='Renter L??n' 		firstdetail='per mnd' secondtext={`-${readableNumber(getRenter)} kr`} />
		<Outputrow firsttext='Totale utgifter' 	firstdetail='per mnd' secondtext={`-${readableNumber(getUtgifterTotal)} kr`} rowclassname='CategorySplit' />


		<Outputrow firsttext='Leieinntekter' 	firstdetail='per mnd' 		secondtext={`${readableNumber(getLeieInntekter)} kr`} />
		<Outputrow firsttext='Skatt' 			firstdetail='' 				secondtext={`-${readableNumber(getLeieInn_Skatt)} kr`} />
		<Outputrow firsttext='Leieinntekter' 	firstdetail='etter skatt' 	secondtext={`${readableNumber(getLeieInn_Etterskatt)} kr`} rowclassname='CategorySplit' />

		
		<Outputrow firsttext='Verdi??kning' 		firstdetail='Inflasjon per ??r' 			secondtext={`${readableNumber(getVerdiokning)} kr`} />
		<Outputrow firsttext='Fradrag p?? skatt' firstdetail='22% av ??rlig rente p?? l??n' secondtext={`${readableNumber(getRentegodkjoring)} kr`} />
		<Outputrow firsttext='Total fortjeneste'firstdetail='per ??r' 	secondtext={`${readableNumber(getTotalFortjeneste_ar)} kr`} rowclassname='CategorySplit' />

		
		<Outputrow firsttext='Salgssum' 			secondtext={`${readableNumber(getSalgssum)} kr`} />
		<Outputrow firsttext='Skatt' 				secondtext={`-${readableNumber(getSalgsskatt)} kr`} />
		<Outputrow firsttext='Salgsgevinst' 		firstdetail='etter skatt' secondtext={`${readableNumber(getSalgsprofitt)} kr`} />
		<Outputrow firsttext='Investeringsgevinst'	firstdetail='etter skatt' secondtext={`${readableNumber(getInvisteringsprofitt)} kr`} />
		<Outputrow firsttext='Egenkapitalavkastning'secondtext={`${getKapitalavkastning}`} rowclassname='CategoryEnd' />
      </div>


      <div className="YearByYearTableContainer">
			<div id="YearByYearTableContainer">
				<div className="RowHeader">
					<div>Plan</div>
					<div><img alt='Share' src='/img/share.png' /><img alt='Print' src='/img/printer.png' /></div>
				</div>

				<div id="YearByYearTableContainerScroll">
					<div className="YearByYearTable_Row">
						<div>??r</div>
						<div>Avdrag</div>
						<div>Renter</div>
						<div>L??n</div>
						<div>Salgsverdi</div>
						<div>Utgifter</div>
						<div>Inntekter</div>
						<div>Verdi??kning</div>
						<div>Rentefradrag</div>
						<div>Fortjeneste</div>
					</div>

					{getPlanTable}
				</div>
			</div>
		</div>
    </>);
}

export default App;
