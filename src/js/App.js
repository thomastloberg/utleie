import '../css/App.scss';
import Rowinput from '../components/Rowinput';

function App() {
  return (
    <>
      <div className="ShareContainer">
      ShareContainer
      </div>


      <div className="InputContainer">
        <div className="RowHeader">Utleiekalkulator</div>
        <Rowinput text='Kjøpesum' defaultvalue='2300000' />
        <Rowinput text='Rente på lån' detail='effektiv' defaultvalue='1.89' />
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
