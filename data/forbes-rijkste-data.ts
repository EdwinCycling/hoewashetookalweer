
export interface ForbesRijksteYearData {
    year: number;
    nr1Name: string;
    nr1Vermogen: string;
    nr1Leeftijd: string;
    nr1Nationaliteit: string;
    nr1Source: string;
    nr1Extra: string;
    top10: string;
}
  
export const FORBES_RIJKSTE_RAW_DATA: { [year: number]: string } = {
    1987: "Yoshiaki Tsutsumi|$20 miljard|53|Japan|Vastgoed|Eigenaar van Seibu Railway Group.|Top 10: 2. Taikichiro Mori, 3. Shigeru Kobayashi, 4. Haruhiko Furukawa, 5. Eitaro Itoyama, 6. Shin Kanemaru, 7. Keizo Saji, 8. Yohachiro Iwasaki, 9. Konosuke Matsushita, 10. Gebroeders Reichmann",
    1988: "Yoshiaki Tsutsumi|$18.9 miljard|54|Japan|Vastgoed||Top 10: 2. Taikichiro Mori, 3. Gebroeders Reichmann, 4. Shin Kanemaru, 5. Shigeru Kobayashi, 6. Eitaro Itoyama, 7. Haruhiko Furukawa, 8. Keizo Saji, 9. Yohachiro Iwasaki, 10. Kenkichi Nakajima",
    1989: "Yoshiaki Tsutsumi|$15 miljard|55|Japan|Vastgoed||Top 10: 2. Taikichiro Mori, 3. Gebroeders Reichmann, 4. Shigeru Kobayashi, 5. Eitaro Itoyama, 6. Shin Kanemaru, 7. Haruhiko Furukawa, 8. Keizo Saji, 9. Yohachiro Iwasaki, 10. Kenkichi Nakajima",
    1990: "Yoshiaki Tsutsumi|$16 miljard|56|Japan|Vastgoed||Top 10: 2. Taikichiro Mori, 3. Gebroeders Reichmann, 4. Shigeru Kobayashi, 5. Eitaro Itoyama, 6. Shin Kanemaru, 7. Haruhiko Furukawa, 8. Keizo Saji, 9. Yohachiro Iwasaki, 10. Kenkichi Nakajima",
    1991: "Taikichiro Mori|$15 miljard|87|Japan|Vastgoed|Oprichter van Mori Building Company.|Top 10: 2. Yoshiaki Tsutsumi, 3. Gebroeders Reichmann, 4. Familie Du Pont, 5. Hans en Gad Rausing, 6. Shin Kanemaru, 7. Sam Walton, 8. Salim bin Laden familie, 9. Kenkichi Nakajima, 10. Eitaro Itoyama",
    1992: "Taikichiro Mori|$13 miljard|88|Japan|Vastgoed||Top 10: 2. Yoshiaki Tsutsumi, 3. Gebroeders Reichmann, 4. Sam Walton en familie, 5. Hans en Gad Rausing, 6. Koningin Elizabeth II, 7. Kenneth Thomson, 8. Eitaro Itoyama, 9. Warren Buffett, 10. Karl en Theo Albrecht",
    1993: "Yoshiaki Tsutsumi|$9 miljard|59|Japan|Vastgoed||Top 10: 2. Taikichiro Mori (overleden), 3. Bill Gates, 4. Warren Buffett, 5. Koningin Elizabeth II, 6. Hans en Gad Rausing, 7. Kenneth Thomson, 8. Karl en Theo Albrecht, 9. Eitaro Itoyama, 10. Lee Shau Kee",
    1994: "Yoshiaki Tsutsumi|$8.5 miljard|60|Japan|Vastgoed||Top 10: 2. Bill Gates, 3. Warren Buffett, 4. Koningin Elizabeth II, 5. Hans en Gad Rausing, 6. Kenneth Thomson, 7. Karl en Theo Albrecht, 8. Lee Shau Kee, 9. Tsai Wan-lin, 10. Paul Sacher",
    1995: "Bill Gates|$12.9 miljard|39|VS|Microsoft|Medeoprichter van Microsoft.|Top 10: 2. Warren Buffett, 3. Yoshiaki Tsutsumi, 4. Hans en Gad Rausing, 5. Paul Sacher, 6. Tsai Wan-lin, 7. Kenneth Thomson, 8. Lee Shau Kee, 9. Karl en Theo Albrecht, 10. Yasuo Takei",
    1996: "Bill Gates|$18 miljard|40|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Paul Sacher, 4. Tsai Wan-lin, 5. Lee Shau Kee, 6. Kenneth Thomson, 7. Karl en Theo Albrecht, 8. Robert en Li Ka-shing, 9. Yasuo Takei, 10. Chung Ju-yung",
    1997: "Bill Gates|$36.4 miljard|41|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Paul Sacher, 4. Lee Shau Kee, 5. Tsai Wan-lin, 6. Kenneth Thomson, 7. Karl en Theo Albrecht, 8. Robert en Li Ka-shing, 9. Chung Ju-yung, 10. Prins Alwaleed Bin Talal Alsaud",
    1998: "Bill Gates|$51 miljard|42|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Familie Walton, 4. Paul Allen, 5. Karl en Theo Albrecht, 6. Prins Alwaleed Bin Talal Alsaud, 7. Li Ka-shing, 8. Lee Shau Kee, 9. Kenneth Thomson, 10. Forrest Mars Sr. en familie",
    1999: "Bill Gates|$90 miljard|43|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Paul Allen, 4. Steve Ballmer, 5. Philip Anschutz, 6. Michael Dell, 7. S. Robson Walton, 8. Larry Ellison, 9. Jim Walton, 10. John Walton",
    2000: "Bill Gates|$60 miljard|44|VS|Microsoft||Top 10: 2. Larry Ellison, 3. Paul Allen, 4. Warren Buffett, 5. Karl en Theo Albrecht, 6. Prins Alwaleed Bin Talal Alsaud, 7. Familie Walton, 8. Masayoshi Son, 9. Michael Dell, 10. Kenneth Thomson",
    2001: "Bill Gates|$58.7 miljard|45|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Paul Allen, 4. Larry Ellison, 5. Karl en Theo Albrecht, 6. Prins Alwaleed Bin Talal Alsaud, 7. Familie Walton, 8. Jim Walton, 9. John Walton, 10. S. Robson Walton",
    2002: "Bill Gates|$52.8 miljard|46|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Karl en Theo Albrecht, 4. Paul Allen, 5. Larry Ellison, 6. Familie Walton, 7. Jim Walton, 8. John Walton, 9. S. Robson Walton, 10. Alice Walton",
    2003: "Bill Gates|$40.7 miljard|47|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Karl en Theo Albrecht, 4. Paul Allen, 5. Prins Alwaleed Bin Talal Alsaud, 6. Larry Ellison, 7. Familie Walton, 8. Alice Walton, 9. Helen Walton, 10. Jim Walton",
    2004: "Bill Gates|$46.6 miljard|48|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Karl Albrecht, 4. Prins Alwaleed Bin Talal Alsaud, 5. Paul Allen, 6. Alice Walton, 7. Helen Walton, 8. Jim Walton, 9. John Walton, 10. S. Robson Walton",
    2005: "Bill Gates|$46.5 miljard|49|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Carlos Slim Helú, 4. Ingvar Kamprad, 5. Paul Allen, 6. Karl Albrecht, 7. Larry Ellison, 8. Prins Alwaleed Bin Talal Alsaud, 9. Kenneth Thomson en familie, 10. Li Ka-shing",
    2006: "Bill Gates|$50 miljard|50|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Carlos Slim Helú, 4. Ingvar Kamprad, 5. Lakshmi Mittal, 6. Paul Allen, 7. Bernard Arnault, 8. Prins Alwaleed Bin Talal Alsaud, 9. Kenneth Thomson en familie, 10. Li Ka-shing",
    2007: "Bill Gates|$56 miljard|51|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Carlos Slim Helú, 4. Ingvar Kamprad, 5. Lakshmi Mittal, 6. Sheldon Adelson, 7. Bernard Arnault, 8. Amancio Ortega, 9. Li Ka-shing, 10. David Thomson en familie",
    2008: "Warren Buffett|$62 miljard|77|VS|Berkshire Hathaway|Investeerder en zakenman.|Top 10: 2. Carlos Slim Helú, 3. Bill Gates, 4. Lakshmi Mittal, 5. Mukesh Ambani, 6. Anil Ambani, 7. Ingvar Kamprad, 8. KP Singh, 9. Oleg Deripaska, 10. Karl Albrecht",
    2009: "Bill Gates|$40 miljard|53|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Carlos Slim Helú, 4. Larry Ellison, 5. Ingvar Kamprad, 6. Karl Albrecht, 7. Mukesh Ambani, 8. Lakshmi Mittal, 9. Theo Albrecht, 10. Amancio Ortega",
    2010: "Carlos Slim Helú|$53.5 miljard|70|Mexico|Telecommunicatie|Eigenaar van América Móvil.|Top 10: 2. Bill Gates, 3. Warren Buffett, 4. Mukesh Ambani, 5. Lakshmi Mittal, 6. Larry Ellison, 7. Bernard Arnault, 8. Eike Batista, 9. Amancio Ortega, 10. Karl Albrecht",
    2011: "Carlos Slim Helú|$74 miljard|71|Mexico|Telecommunicatie||Top 10: 2. Bill Gates, 3. Warren Buffett, 4. Bernard Arnault, 5. Larry Ellison, 6. Lakshmi Mittal, 7. Amancio Ortega, 8. Eike Batista, 9. Mukesh Ambani, 10. Christy Walton en familie",
    2012: "Carlos Slim Helú|$69 miljard|72|Mexico|Telecommunicatie||Top 10: 2. Bill Gates, 3. Warren Buffett, 4. Bernard Arnault, 5. Amancio Ortega, 6. Larry Ellison, 7. Eike Batista, 8. Stefan Persson, 9. Li Ka-shing, 10. Karl Albrecht",
    2013: "Carlos Slim Helú|$73 miljard|73|Mexico|Telecommunicatie||Top 10: 2. Bill Gates, 3. Amancio Ortega, 4. Warren Buffett, 5. Larry Ellison, 6. Charles Koch, 7. David Koch, 8. Li Ka-shing, 9. Liliane Bettencourt, 10. Bernard Arnault",
    2014: "Bill Gates|$76 miljard|58|VS|Microsoft||Top 10: 2. Carlos Slim Helú, 3. Amancio Ortega, 4. Warren Buffett, 5. Larry Ellison, 6. Charles Koch, 7. David Koch, 8. Sheldon Adelson, 9. Christy Walton, 10. Jim Walton",
    2015: "Bill Gates|$79.2 miljard|59|VS|Microsoft||Top 10: 2. Carlos Slim Helú, 3. Warren Buffett, 4. Amancio Ortega, 5. Larry Ellison, 6. Charles Koch, 7. David Koch, 8. Christy Walton, 9. Jim Walton, 10. Liliane Bettencourt",
    2016: "Bill Gates|$75 miljard|60|VS|Microsoft||Top 10: 2. Amancio Ortega, 3. Warren Buffett, 4. Carlos Slim Helú, 5. Jeff Bezos, 6. Mark Zuckerberg, 7. Larry Ellison, 8. Michael Bloomberg, 9. Charles Koch, 10. David Koch",
    2017: "Bill Gates|$86 miljard|61|VS|Microsoft||Top 10: 2. Warren Buffett, 3. Jeff Bezos, 4. Amancio Ortega, 5. Mark Zuckerberg, 6. Carlos Slim Helú, 7. Larry Ellison, 8. Charles Koch, 9. David Koch, 10. Michael Bloomberg",
    2018: "Jeff Bezos|$112 miljard|54|VS|Amazon|Oprichter en CEO van Amazon.|Top 10: 2. Bill Gates, 3. Warren Buffett, 4. Bernard Arnault, 5. Mark Zuckerberg, 6. Amancio Ortega, 7. Carlos Slim Helú, 8. Charles Koch, 9. David Koch, 10. Larry Ellison",
    2019: "Jeff Bezos|$131 miljard|55|VS|Amazon||Top 10: 2. Bill Gates, 3. Warren Buffett, 4. Bernard Arnault, 5. Carlos Slim Helú, 6. Amancio Ortega, 7. Larry Ellison, 8. Mark Zuckerberg, 9. Michael Bloomberg, 10. Larry Page",
    2020: "Jeff Bezos|$113 miljard|56|VS|Amazon||Top 10: 2. Bill Gates, 3. Bernard Arnault en familie, 4. Warren Buffett, 5. Larry Ellison, 6. Amancio Ortega, 7. Mark Zuckerberg, 8. Jim Walton, 9. Alice Walton, 10. Robson Walton",
    2021: "Jeff Bezos|$177 miljard|57|VS|Amazon||Top 10: 2. Elon Musk, 3. Bernard Arnault en familie, 4. Bill Gates, 5. Mark Zuckerberg, 6. Warren Buffett, 7. Larry Ellison, 8. Larry Page, 9. Sergey Brin, 10. Mukesh Ambani",
    2022: "Elon Musk|$219 miljard|50|VS|Tesla, SpaceX|CEO van Tesla en SpaceX.|Top 10: 2. Jeff Bezos, 3. Bernard Arnault en familie, 4. Bill Gates, 5. Warren Buffett, 6. Larry Page, 7. Sergey Brin, 8. Larry Ellison, 9. Steve Ballmer, 10. Mukesh Ambani",
    2023: "Bernard Arnault & familie|$211 miljard|74|Frankrijk|LVMH|Luxe goederen conglomeraat.|Top 10: 2. Elon Musk| 3. Jeff Bezos| 4. Larry Ellison| 5. Warren Buffett| 6. Bill Gates| 7. Michael Bloomberg| 8. Carlos Slim Helu & familie| 9. Mukesh Ambani| 10. Steve Ballmer",
    2024: "Bernard Arnault & familie|$233 miljard|75|Frankrijk|LVMH|Luxe goederen conglomeraat.|Top 10: 2. Elon Musk| 3. Jeff Bezos| 4. Mark Zuckerberg| 5. Larry Ellison| 6. Warren Buffett| 7. Bill Gates| 8. Steve Ballmer| 9. Mukesh Ambani| 10. Larry Page"
};
  
export const MIN_FORBES_YEAR = 1987;
  
  
