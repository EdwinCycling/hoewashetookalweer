
// Data for Fuel Prices by year.
// Values are in euros.

export interface RawFuelPriceDetails {
  price_1: number; // Gemiddelde pompprijs Benzine Euro95
  price_2: number; // Gemiddelde pompprijs Diesel
  price_3: number; // Gemiddelde pompprijs LPG
  price_4: number; // Pompprijs snelweg bemand station Benzine Euro95
  price_5: number; // Pompprijs snelweg bemand station Diesel
  price_6: number; // Pompprijs snelweg bemand station LPG
  price_7: number; // Pompprijs niet snelweg bemand station Benzine Euro95
  price_8: number; // Pompprijs niet snelweg bemand station Diesel
  price_9: number; // Pompprijs niet snelweg bemand station LPG
  price_10: number; // Pompprijs niet snelweg onbemand station Benzine Euro95
  price_11: number; // Pompprijs niet snelweg onbemand station Diesel
}

export const MIN_FUEL_PRICES_YEAR = 2006;

export const FUEL_PRICES_BY_YEAR_RAW: Record<number, RawFuelPriceDetails> = {
  2006: {
    price_1: 1.373,
    price_2: 1.043,
    price_3: 0.520,
    price_4: 1.413,
    price_5: 1.077,
    price_6: 0.561,
    price_7: 1.367,
    price_8: 1.038,
    price_9: 0.507,
    price_10: 1.336,
    price_11: 1.010
  },

  "2007": {
    "price_1": 1.415,
    "price_2": 1.060,
    "price_3": 0.538,
    "price_4": 1.458,
    "price_5": 1.097,
    "price_6": 0.581,
    "price_7": 1.409,
    "price_8": 1.055,
    "price_9": 0.524,
    "price_10": 1.374,
    "price_11": 1.026
  },
  "2008": {
    "price_1": 1.476,
    "price_2": 1.241,
    "price_3": 0.599,
    "price_4": 1.521,
    "price_5": 1.280,
    "price_6": 0.644,
    "price_7": 1.471,
    "price_8": 1.236,
    "price_9": 0.584,
    "price_10": 1.435,
    "price_11": 1.207
  },
  "2009": {
    "price_1": 1.354,
    "price_2": 1.013,
    "price_3": 0.509,
    "price_4": 1.401,
    "price_5": 1.053,
    "price_6": 0.562,
    "price_7": 1.348,
    "price_8": 1.008,
    "price_9": 0.492,
    "price_10": 1.312,
    "price_11": 0.978
  },
  "2010": {
    "price_1": 1.503,
    "price_2": 1.171,
    "price_3": 0.644,
    "price_4": 1.552,
    "price_5": 1.212,
    "price_6": 0.705,
    "price_7": 1.497,
    "price_8": 1.166,
    "price_9": 0.624,
    "price_10": 1.460,
    "price_11": 1.134
  },
  "2011": {
    "price_1": 1.640,
    "price_2": 1.348,
    "price_3": 0.700,
    "price_4": 1.692,
    "price_5": 1.392,
    "price_6": 0.765,
    "price_7": 1.632,
    "price_8": 1.342,
    "price_9": 0.679,
    "price_10": 1.595,
    "price_11": 1.310
  },
  "2012": {
    "price_1": 1.759,
    "price_2": 1.444,
    "price_3": 0.769,
    "price_4": 1.818,
    "price_5": 1.495,
    "price_6": 0.828,
    "price_7": 1.751,
    "price_8": 1.440,
    "price_9": 0.740,
    "price_10": 1.718,
    "price_11": 1.410
  },
  "2013": {
    "price_1": 1.736,
    "price_2": 1.421,
    "price_3": 0.732,
    "price_4": 1.799,
    "price_5": 1.475,
    "price_6": 0.786,
    "price_7": 1.728,
    "price_8": 1.416,
    "price_9": 0.703,
    "price_10": 1.693,
    "price_11": 1.385
  },
  "2014": {
    "price_1": 1.695,
    "price_2": 1.401,
    "price_3": 0.757,
    "price_4": 1.757,
    "price_5": 1.457,
    "price_6": 0.807,
    "price_7": 1.693,
    "price_8": 1.401,
    "price_9": 0.739,
    "price_10": 1.658,
    "price_11": 1.370
  },
  "2015": {
    "price_1": 1.558,
    "price_2": 1.230,
    "price_3": 0.619,
    "price_4": 1.629,
    "price_5": 1.295,
    "price_6": 0.663,
    "price_7": 1.557,
    "price_8": 1.231,
    "price_9": 0.605,
    "price_10": 1.520,
    "price_11": 1.198
  },
  "2016": {
    "price_1": 1.477,
    "price_2": 1.134,
    "price_3": 0.571,
    "price_4": 1.559,
    "price_5": 1.210,
    "price_6": 0.620,
    "price_7": 1.475,
    "price_8": 1.134,
    "price_9": 0.554,
    "price_10": 1.439,
    "price_11": 1.100
  },
  "2017": {
    "price_1": 1.552,
    "price_2": 1.221,
    "price_3": 0.633,
    "price_4": 1.642,
    "price_5": 1.304,
    "price_6": 0.686,
    "price_7": 1.550,
    "price_8": 1.222,
    "price_9": 0.612,
    "price_10": 1.514,
    "price_11": 1.186
  },
  "2018": {
    "price_1": 1.618,
    "price_2": 1.335,
    "price_3": 0.685,
    "price_4": 1.710,
    "price_5": 1.419,
    "price_6": 0.736,
    "price_7": 1.616,
    "price_8": 1.338,
    "price_9": 0.666,
    "price_10": 1.579,
    "price_11": 1.300
  },
  "2019": {
    "price_1": 1.647,
    "price_2": 1.356,
    "price_3": 0.633,
    "price_4": 1.750,
    "price_5": 1.451,
    "price_6": 0.685,
    "price_7": 1.645,
    "price_8": 1.359,
    "price_9": 0.613,
    "price_10": 1.610,
    "price_11": 1.321
  },
  "2020": {
    "price_1": 1.562,
    "price_2": 1.237,
    "price_3": 0.605,
    "price_4": 1.680,
    "price_5": 1.346,
    "price_6": 0.661,
    "price_7": 1.560,
    "price_8": 1.241,
    "price_9": 0.584,
    "price_10": 1.518,
    "price_11": 1.196
  },
  "2021": {
    "price_1": 1.815,
    "price_2": 1.461,
    "price_3": 0.783,
    "price_4": 1.945,
    "price_5": 1.582,
    "price_6": 0.859,
    "price_7": 1.812,
    "price_8": 1.471,
    "price_9": 0.756,
    "price_10": 1.768,
    "price_11": 1.422
  },
  "2022": {
    "price_1": 2.072,
    "price_2": 1.956,
    "price_3": 0.929,
    "price_4": 2.210,
    "price_5": 2.087,
    "price_6": 0.967,
    "price_7": 2.077,
    "price_8": 1.968,
    "price_9": 0.920,
    "price_10": 2.032,
    "price_11": 1.917
  },
  "2023": {
    "price_1": 1.921,
    "price_2": 1.712,
    "price_3": 0.785,
    "price_4": 2.081,
    "price_5": 1.863,
    "price_6": 0.816,
    "price_7": 1.924,
    "price_8": 1.723,
    "price_9": 0.778,
    "price_10": 1.881,
    "price_11": 1.676
  },
  "2024": {
    "price_1": 1.969,
    "price_2": 1.722,
    "price_3": 0.795,
    "price_4": 2.156,
    "price_5": 1.893,
    "price_6": 0.824,
    "price_7": 1.984,
    "price_8": 1.740,
    "price_9": 0.792,
    "price_10": 1.938,
    "price_11": 1.692
  }

  // Add more years of data here
  // Example for 2007:
  // 2007: {
  //   price_1: 1.450,
  //   price_2: 1.120,
  //   price_3: 0.580,
  //   ...
  // },
};
