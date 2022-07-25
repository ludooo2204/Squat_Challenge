const analyseData = data => {
  let dataAnalysées = {};
  let section = [];
  let nbrSection = 1;
  let indexSection = [0];
  for (let i = 0; i < data.length - 1; i++) {
    const element = data[i];
    if (data[i + 1] - element > 20000) {
      nbrSection++;
      indexSection.push(i + 1);
    }
  }
  indexSection.push(data.length);
  console.log('nbrSection');
  console.log(nbrSection);
  console.log('indexSection');
  console.log(indexSection);
  for (let i = 0; i < nbrSection; i++) {
    section.push(data.slice(indexSection[i], indexSection[i + 1]));
  }
  console.log(section);
  dataAnalysées.section = section;
  for (const iterator of section) {
    let sum = 0;
    let moyenne = 0;
    for (let i = 0; i < iterator.length - 1; i++) {
      sum += iterator[i + 1] - iterator[i];
    }
    moyenne = sum / iterator.length / 1000;
    console.log('moyenne');
    console.log(moyenne);
    console.log('nbr de squat par session');
    console.log(iterator.length);
  }
};
export default analyseData;
