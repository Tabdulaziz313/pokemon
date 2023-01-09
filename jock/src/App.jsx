import PropTypes from 'prop-types';
import { useState } from 'react'
import "./App.css"
import pacemon from "./assets/pakemon.json";

function App() {
  // const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [selectItem, setSelectItem] = useState(null);

  const PocRow = ({ el, onSelect }) => (
    <tr key={el.id} >
      <td>{el.name.english}</td>
      <td>{el.type.join(", ")}</td>
      <td><button onClick={() => onSelect(el)}> Select ! </button></td>
    </tr>

  );



  PocRow.propTypes = {
    pacemon: PropTypes.shape({
      name: PropTypes.shape({
        english: PropTypes.string.isRequired,
      }),
      type: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
    onSelect: PropTypes.func.isRequired,
  }



  const PokemonInfo = ({ name, base }) => (
    <div >
      <h2>{name.english} </h2>
      <table>
        {Object.keys(base).map((key) =>(
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
          ))}
      </table>
    </div>
  )


  PokemonInfo.propTypes = {
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    base: PropTypes.shape({
      HP: PropTypes.number.isRequired,
      Attack: PropTypes.number.isRequired,
      Defense: PropTypes.number.isRequired,
      "Sp. Attack": PropTypes.number.isRequired,
      "Sp. Defense": PropTypes.number.isRequired,
      Speed: PropTypes.number.isRequired
    })
  }




  return (
    <div className='pack' >
      <h1>salom</h1>

      <div style={{ display: "grid", gridTemplateColumns: "70% 30%", gridColumnGap: "1rem", }}>
        <div>
          <input value={filter} onChange={(e) => setFilter(e.target.value)} className='input' />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pacemon
                .filter((el) => el.name.english.toLowerCase().includes(filter.toLowerCase()))
                .slice(0, 20).map((el) => (
                  <PocRow el={el} key={el.id} onSelect={(el) => setSelectItem(el)} />
                ))}
            </tbody>
          </table>
        </div>
        {selectItem && (<PokemonInfo  {...selectItem} />)}
      </div>
    </div>
  )
}

export default App
