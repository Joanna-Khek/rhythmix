import {React, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import HTMLTooltip from './HTMLTooltip';
import AxiosInstance from './Axios';
import AlertMessage from './AlertMessage';

export default function AdjustAttributes({graphState, setGraphState}) {
  const [acousticness, setAcousticness] = useState(graphState.acousticness);
  const [danceability, setDanceability] = useState(graphState.danceability);
  const [energy, setEnergy] = useState(graphState.energy);
  const [instrumentalness, setInstrumentalness] = useState(graphState.instrumentalness);
  const [liveness, setLiveness] = useState(graphState.liveness);
  const [loudness, setLoudness] = useState(graphState.loudness);
  const [speechiness, setSpeechiness] = useState(graphState.speechiness);
  const [tempo, setTempo] = useState(graphState.tempo);
  const [valence, setValence] = useState(graphState.valence);
  const [message, setMessage] = useState([])

  function valuetext(value) {
    return `${value}`;
  }

  console.log(graphState)

  const handleSubmit = () => {
    const updatedAttributes = {
      acousticness,
      danceability,
      energy,
      instrumentalness,
      liveness,
      loudness,
      speechiness,
      tempo,
      valence
      }


    // Update parent graphState
    setGraphState((prevState) => ({
      ...prevState,
      ...updatedAttributes
    }));

    const payload = {
      attributes_values: {
        ...graphState,       // retain existing values
        ...updatedAttributes // override with new ones
      }
    };

    try {
      const response = AxiosInstance.post(`attributes/`, payload);
      setMessage(
        <AlertMessage
          messageText = {"Successfully updated attributes!"}
          messageSeverity = {"success"}
        />
      )
    } catch (error) {
      setMessage(
        <AlertMessage
          messageText = {"Error updating attributes"}
          messageSeverity = {"error"}
        />
      )
    }
  };


  return (
    <Box sx={{ width: '100%', mt: 5 }}>

      {/* Acousticness */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Acousticness"}
            textMessage={`
              Represents the extent to which a track possesses an acoustic quality.
              Tracks with high acousticness values sound more acoustic (e.g., natural, non-electronic), while
              tracks with low acousticness values sound more electronic (e.g., synthetic, artificial)`}
          />
        </div>

        <Slider
          aria-label="Acousticness"
          getAriaValueText={valuetext}
          value={acousticness}
          onChange={(e, v) => setAcousticness(v)}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="on"
        />
      </Box>

      {/* Danceability */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Danceability"}
            textMessage={`
            Measures how suitable a track is for dancing. Tracks with high
            danceability scores are more energetic and rhythmic, making them ideal for dancing.`}
          />
        </div>

        <Slider
          aria-label="Danceability"
          getAriaValueText={valuetext}
          value={danceability}
          onChange={(e, v) => setDanceability(v)}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="on"
        />
      </Box>

      {/* Energy */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Energy"}
            textMessage={`
            Represents intensity and activity within a song. Tracks with high
            energy tend to be more fast-paced and intense`}
          />
        </div>

        <Slider
          aria-label="Energy"
          getAriaValueText={valuetext}
          value={energy}
          onChange={(e, v) => setEnergy(v)}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="on"
        />
      </Box>

      {/* Instrumentalness */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Instrumentalness"}
            textMessage={`
              Represents the likelihood of a track being instrumental`}
          />
        </div>

        <Slider
          aria-label="Instrumentalness"
          getAriaValueText={valuetext}
          value={instrumentalness}
          onChange={(e, v) => setInstrumentalness(v)}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="on"
        />
      </Box>

      {/* Liveliness */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Liveness"}
            textMessage={`
              Represents the presence of an audience during the recording or
              performance of a track`}
          />
        </div>
        <Slider
          aria-label="Liveness"
          getAriaValueText={valuetext}
          value={liveness}
          onChange={(e, v) => setLiveness(v)}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="on"
        />
      </Box>

      {/* Loudness */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Loudness"}
            textMessage={`
              Indicates how loud or quiet an entire song is in decibels (dB).
              Positive values represent louder songs while negative values suggest quieter ones.`}
          />
        </div>
        <Slider
          aria-label="Loudness"
          getAriaValueText={valuetext}
          value={loudness}
          onChange={(e, v) => setLoudness(v)}
          min={-55}
          max={5}
          valueLabelDisplay="on"
        />
      </Box>

      {/* Speechiness */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Speechiness"}
            textMessage={`
              Represents the presence of spoken words in a track. Songs with
              more spoken words (e.g. rap) have high speechiness values`}
          />
        </div>
        <Slider
          aria-label="Speechiness"
          getAriaValueText={valuetext}
          value={speechiness}
          onChange={(e, v) => setSpeechiness(v)}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="on"
        />
      </Box>

      {/* Tempo */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Tempo"}
            textMessage={`
              Represents the tempo of the track in beats per minute (BPM).`}
          />
        </div>
        <Slider
          aria-label="Tempo"
          getAriaValueText={valuetext}
          value={tempo}
          onChange={(e, v) => setTempo(v)}
          min={0}
          max={243}
          valueLabelDisplay="on"
        />
      </Box>

      {/* Valence */}
      <Box className="SliderBox">
        <div className="SliderBoxText">
          <HTMLTooltip
            textHeader={"Valence"}
            textMessage={`
              Represents the musical positiveness conveyed by a track. Tracks
              with high valence sound more positive (e.g., happy, cheerful, euphoric), while tracks with low
              valence sound more negative (e.g., sad, depressed, angry).`}
          />
        </div>
        <Slider
          aria-label="Valence"
          getAriaValueText={valuetext}
          value={valence}
          onChange={(e, v) => setValence(v)}
          min={0}
          max={1}
          step={0.1}
          valueLabelDisplay="on"
        />
      </Box>

      <Button onClick={handleSubmit} variant="contained">Set Attributes</Button>

      {message}
    </Box>


  );
}
