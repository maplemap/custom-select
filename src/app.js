import {CustomSelect} from './components/custom-select';
import './styles/main.scss';

const options = Array.from({ length: 100000 }, (_, index) => `Option ${index + 1}`);

const App = () => {
  const handleSelectChange = (selectedOption) => {
    console.log('Selected option:', selectedOption);
  };

  return (
    <div className="App">
      <h1>Custom Select Component</h1>
      <div style={{width: '300px'}}>
        <CustomSelect options={options} onChange={handleSelectChange}/>
      </div>
    </div>
  );
};

export default App;
