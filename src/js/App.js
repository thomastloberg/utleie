import '../css/App.scss';
import Inputrow from '../components/Inputrow';
import Textrow from '../components/Textrow';

function App() {
  return (
    <>
      <div className="ShareContainer">
      ShareContainer
      </div>


      <div className="InputContainer">
        <div className="RowHeader">Utleiekalkulator</div>
        <Inputrow text='Kjøpesum' 			  type='number' defaultvalue='2300000' posttext=' kr' />
        <Inputrow text='Rente på lån' 		  type='number' detail='effektiv' defaultvalue='1.89' posttext=' %' />
        <Inputrow text='Egenkapital' 		  type='number' detail='effektiv' defaultvalue='345000' posttext={(<>kr<br /><span>Min: <font id="output_Egenkapital_Minimum"></font></span></>)} />
        <Textrow 
			firstcol={(<>Egenkapital:<br /><span>prosent</span></>)} 
			secondcol={(<><div id="output_Egenkapital_Percent">15%</div></>)} 
		/>
		<Inputrow text='Ekstra kjøpsutgifter' type='number' defaultvalue='0' posttext=' kr' />
        <Inputrow text='Dokumentavgift' 	  type='number' defaultvalue='2.5' posttext=' %' />
        <Inputrow text='Inflasjon' 			  type='number' detail='per år' defaultvalue='2.24' posttext=' %' />
        <Inputrow text='Formueverdi' 		  type='number' defaultvalue='500000' posttext=' kr' />
        <Inputrow text='Skatteprosent' 		  type='number' detail='Overskudd' defaultvalue='22' posttext=' %' />
        <Inputrow text='Salgskostnad' 		  type='number' detail='Prosent av verdi' defaultvalue='1.75' posttext=' %' />
        <Inputrow text='Kommunale avgifter'   type='number' detail='per år' defaultvalue='15000' posttext=' kr' />
        <Inputrow text='Fellesutgifter'   	  type='number' detail='per mnd' defaultvalue='0' posttext=' kr' />
        <Inputrow text='Vedlikehold'   	  	  type='number' detail='per år' defaultvalue='15000' posttext=' kr' />
        <Inputrow text='Husforsikring'   	  type='number' detail='per mnd' defaultvalue='375' posttext=' kr' />
        <Inputrow text='Søppelhandtering'     type='number' detail='per mnd' defaultvalue='200' posttext=' kr' />
        <Inputrow text='Feier'    			  type='number' detail='per mnd' defaultvalue='125' posttext=' kr' />
        <Inputrow text='Eiendomsskatt'    	  type='number' detail='per mnd' defaultvalue='200' posttext=' kr' />
        
		<Textrow 
			firstcol={(<><input type='checkbox' id='input_leieinntekterskattefritt' /><span className='noselect'>Bruker over 50% av eiendomen selv?</span></>)} 
		/>
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 1' defaultvalue='8000' posttext=' kr' />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 2' defaultvalue='0' posttext=' kr' />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 3' defaultvalue='0' posttext=' kr' />
		<Inputrow text='Leieinntekter'    	  type='number' detail='Leilighet nr. 4' defaultvalue='0' posttext=' kr' />
        
		<Inputrow text='Antall år investering'type='select' range='1-30' defaultvalue='10' posttext='år' />
        <Inputrow text='Antall år nedbetaling'type='select' range='1-30' defaultvalue='30' posttext='år' />
        
	  </div>


      <div className="OutputContainer">
        <div className="RowHeader">Nøkkeltall</div>
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
    </>
  );
}

export default App;
