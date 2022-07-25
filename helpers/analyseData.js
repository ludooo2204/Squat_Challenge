const analyseData = data => {
  let dataAnalysées = {};
  let section = [];
  let nbrSection = 1;
  let indexSection = [0];
  let maxSquatSurUneSession = 0;

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
  let jourDuSquat;
  // analyse par session
  for (const iterator of section) {
    let sum = 0;
    let moyenneSquatParSession = 0;

    //TODO
    jourDuSquat =
      new Date(iterator[0]).getDate() +
      '/' +
      new Date(iterator[0]).getMonth() +
      '/' +
      new Date(iterator[0]).getFullYear();
    console.log('jourDuSquat');
    console.log(jourDuSquat);
    for (let i = 0; i < iterator.length - 1; i++) {
      sum += iterator[i + 1] - iterator[i];

      //voir pour squats par jour

      if (datesAreOnSameDay(new Date(iterator[i + 1]), new Date(iterator[i]))) {
        //TODO
        // console.log(new Date(iterator[i + 1]).toLocaleDateString());
      }
    }
    moyenneSquatParSession = sum / iterator.length / 1000;
    console.log(
      'temps moyen entre squats sur cette session => ',
      section.indexOf(iterator),
    );
    console.log(moyenneSquatParSession, ' s');
    console.log(
      'nbr de squat sur cette session => ',
      section.indexOf(iterator),
    );
    console.log(iterator.length);

    // max squats sur une session
    // console.log('iterator.length');
    // console.log(iterator.length);
    maxSquatSurUneSession =
      maxSquatSurUneSession > iterator.length
        ? maxSquatSurUneSession
        : iterator.length;
  }
  console.log('maxSquatSurUneSession');
  console.log(maxSquatSurUneSession);
};
export default analyseData;

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
