import { useState } from 'react';
import '../css/App.scss';
import Inputrow from '../components/Inputrow';
import Textrow from '../components/Textrow';
import Outputrow from '../components/Outputrow';

function App() {
	const[Annonse_URL, setAnnonse_URL] = useState('');

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
					value={Annonse_URL}
					onChange={(e) => setAnnonse_URL(e.target.value)} />
			</div>
			<div className="Annonse_Buttons"><span>Kopier</span> - <span>Se annonse</span></div>
		</div>


        <Inputrow text='Kjøpesum' 			  type='number' defaultvalue='2300000' posttext=' kr' />
        <Inputrow text='Rente på lån' 		  type='number' detail='effektiv' defaultvalue='1.89' posttext=' %' />
        <Inputrow text='Egenkapital' 		  type='number' detail='effektiv' defaultvalue='345000' posttext={(<>kr<br /><span>Min: <font id="output_Egenkapital_Minimum"></font></span></>)} />
        <Textrow 
			firstcol={(<>Egenkapital:<br /><span>prosent</span></>)} 
			secondcol={(<><div id="output_Egenkapital_Percent">15%</div></>)} 
		/>
		<Inputrow text='Ekstra kjøpsutgifter' type='number' defaultvalue='0' posttext=' kr' rowclassname='CategorySplit' />
        
		
		<Inputrow text='Dokumentavgift' 	  type='number' defaultvalue='2.5' posttext=' %' />
        <Inputrow text='Inflasjon' 			  type='number' detail='per år' defaultvalue='2.24' posttext=' %' />
        <Inputrow text='Formueverdi' 		  type='number' defaultvalue='500000' posttext=' kr' />
        <Inputrow text='Skatteprosent' 		  type='number' detail='Overskudd' defaultvalue='22' posttext=' %' />
        <Inputrow text='Salgskostnad' 		  type='number' rowclassname='CategorySplit' detail='Prosent av verdi' defaultvalue='1.75' posttext=' %' />
        

		<Inputrow text='Kommunale avgifter'   type='number' detail='per år' defaultvalue='15000' posttext=' kr' />
        <Inputrow text='Fellesutgifter'   	  type='number' detail='per mnd' defaultvalue='0' posttext=' kr' />
        <Inputrow text='Vedlikehold'   	  	  type='number' detail='per år' defaultvalue='15000' posttext=' kr' />
        <Inputrow text='Husforsikring'   	  type='number' detail='per mnd' defaultvalue='375' posttext=' kr' />
        <Inputrow text='Søppelhandtering'     type='number' detail='per mnd' defaultvalue='200' posttext=' kr' />
        <Inputrow text='Feier'    			  type='number' detail='per mnd' defaultvalue='125' posttext=' kr' />
        <Inputrow text='Eiendomsskatt'    	  type='number' rowclassname='CategorySplit' detail='per mnd' defaultvalue='200' posttext=' kr' />
        

		<Textrow 
			firstcol={(<><input type='checkbox' id='input_leieinntekterskattefritt' /><span className='noselect'>Bruker over 50% av eiendomen selv?</span></>)} 
		/>
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 1' defaultvalue='8000' posttext=' kr' />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 2' defaultvalue='0' posttext=' kr' />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 3' defaultvalue='0' posttext=' kr' />
		<Inputrow text='Leieinntekter'    	  type='number' rowclassname='CategorySplit' detail='Leilighet nr. 4' defaultvalue='0' posttext=' kr' />
        

		<Inputrow text='Antall år investering'type='select' range='1-30' defaultvalue='10' posttext='år' />
        <Inputrow text='Antall år nedbetaling'type='select' rowclassname='CategoryEnd' range='1-30' defaultvalue='30' posttext='år' />
        
	  </div>


      <div className="OutputContainer">
        <div className="RowHeader">Nøkkeltall</div>

		<div className="AnnonseRow CategorySplit">
			<div id="output_annonse">https://</div>
		</div>

		<Outputrow firsttext='Kjøpesum' secondtext=' kr' />
        <Outputrow firsttext='Forhåndskostnad' firstdetail='egenkapital + dok.avgift + ekstra' secondtext=' kr' />
		<Outputrow firsttext='Formueverdi' secondtext=' kr' />
		<Outputrow firsttext='Lån' secondtext=' kr' />
        <Outputrow  firsttext='Lån' firstdetail='av kjøpesum' secondtext='%' rowclassname='CategorySplit' />


		<Outputrow 
			firsttext='Kommunale avgifter' 	secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Vedlikehold' 	secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Fellesutgifter' 	secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Husforsikring' 	secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Søppelhandtering' 	secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Feier' 				econdtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Eiendomsskatt' 		secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Kommunale avgifter' 	secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Kommunale avgifter' 	secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' />
		<Outputrow 
			firsttext='Kommunale avgifter' 	secondtext=' kr'
			firstdetail='per mnd' 			seconddetail='skattefritt' rowclassname='CategorySplit' />

		
		<Outputrow firsttext='Avdrag Lån' 		firstdetail='per mnd' secondtext=' kr' />
		<Outputrow firsttext='Renter Lån' 		firstdetail='per mnd' secondtext=' kr' />
		<Outputrow firsttext='Totale utgifter' 	firstdetail='per mnd' secondtext=' kr' rowclassname='CategorySplit' />


		<Outputrow firsttext='Leieinntekter' 	firstdetail='per mnd etter skatt' secondtext=' kr' rowclassname='CategorySplit' />

		
		<Outputrow firsttext='Verdiøkning' 		firstdetail='Inflasjon per år' secondtext=' kr' />
		<Outputrow firsttext='Fradrag på skatt' firstdetail='22% av årlig rente på lån' secondtext=' kr' />
		<Outputrow firsttext='Total fortjeneste'firstdetail='per mnd' secondtext=' kr' />
		<Outputrow firsttext='Total fortjeneste'firstdetail='per år' secondtext=' kr' rowclassname='CategorySplit' />

		
		<Outputrow firsttext='Salgssum' 			secondtext=' kr' />
		<Outputrow firsttext='Salgsgevinst' 		firstdetail='etter skatt' secondtext=' kr' />
		<Outputrow firsttext='Skatt av salg' 		secondtext=' kr' />
		<Outputrow firsttext='Egenkapitalavkastning'secondtext=' kr' rowclassname='CategoryEnd' />
      </div>


      <div className="YearByYearTableContainer">
			<div id="YearByYearTableContainer">
				<div className="RowHeader">
					<div>Plan</div>
					<div><img alt='Share' src='/img/share.png' /><img alt='Print' src='/img/printer.png' /></div>
				</div>

				<div id="YearByYearTableContainerScroll">
					<div className="YearByYearTable_Row">
						<div>År</div>
						<div>Avdrag</div>
						<div>Renter</div>
						<div>Gjenstående Lån</div>
						<div>Salgsverdi</div>
						<div>Utgifter</div>
						<div>Inntekter</div>
						<div>Verdiøkning</div>
						<div>Skattefratrekk<br /><span>22% av renter</span></div>
						<div>Fortjeneste<br /><span>Inntekter + Verdiøkning - Utgifter</span></div>
					</div>
				</div>
			</div>
		</div>
    </>);
}

export default App;
