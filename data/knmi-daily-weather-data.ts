
export interface KnmiDailyRecord {
  station_code: number;
  date: string; // YYYY-MM-DDTHH:mm:ss.sssZ
  DDVEC?: number | null; // Windrichting in graden
  FG?: number | null;    // Etmaalgemiddelde windsnelheid (in 0.1 m/s)
  FHX?: number | null;   // Hoogste uurgemiddelde windsnelheid (in 0.1 m/s)
  FXX?: number | null;   // Hoogste windstoot (in 0.1 m/s)
  TG?: number | null;    // Etmaalgemiddelde temperatuur (in 0.1 graden Celsius)
  TN?: number | null;    // Minimum temperatuur (in 0.1 graden Celsius)
  TX?: number | null;    // Maximum temperatuur (in 0.1 graden Celsius)
  T10N?: number | null;  // Minimum temperatuur op 10 cm hoogte (in 0.1 graden Celsius)
  SQ?: number | null;    // Zonneschijnduur (in 0.1 uur) (-1 voor <0.05 uur)
  SP?: number | null;    // Percentage van de langst mogelijke zonneschijnduur
  DR?: number | null;    // Duur van de neerslag (in 0.1 uur)
  RH?: number | null;    // Etmaalsom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm)
  PG?: number | null;    // Etmaalgemiddelde luchtdruk herleid tot zeeniveau (in 0.1 hPa)
  NG?: number | null;    // Etmaalgemiddelde bewolking (bedekkingsgraad in achtsten, 9=onzichtbaar)
  UG?: number | null;    // Etmaalgemiddelde relatieve vochtigheid (in procenten)
}

// De data wordt nu gefetcht uit /public/data/knmi_daily_weather_full.json
// in de server action src/actions/knmi-daily-weather-action.ts.
// Deze file dient nu enkel nog voor de KnmiDailyRecord interface.
