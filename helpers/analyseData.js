const numeroDeSemaine = timeStamp => {
  let date = new Date(timeStamp);
  //   let options = {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: '2-digit',
  //   };
  let debutdate = new Date(date.getFullYear(), 0, 1);
  let jours = Math.floor((date - debutdate) / (24 * 60 * 60 * 1000));
  let numero_semaine = Math.ceil((date.getDay() + 1 + jours) / 7);
  //   console.log(
  //     'Le numéro de semaine de la date du ' +
  //       date.toLocaleDateString('fr-FR', options) +
  //       ' est ' +
  //       numero_semaine,
  //   );
  return numero_semaine;
};

const analyseData = data => {
  let dataAnalysées = {};
  let section = [];
  let nbrSection = 1;
  let indexSection = [0];
  let maxSquatSurUneSession = 0;
  let dateDuSquat;
  let squatParJour = [];
  let arrayTemp = [];
  let nbrSquatParJour = [];
  for (let i = 0; i < data.length - 1; i++) {
    const element = data[i];
    console.log(numeroDeSemaine(element));
    //faire idem qu'en dessous pour nbr de squat par semaine
    //faire idem qu'en dessous pour nbr de squat par semaine
    //faire idem qu'en dessous pour nbr de squat par semaine
    //faire idem qu'en dessous pour nbr de squat par semaine
    //faire idem qu'en dessous pour nbr de squat par semaine
    //faire idem qu'en dessous pour nbr de squat par semaine
    if (
      dateDuSquat ==
        new Date(element).getDate() +
          '/' +
          new Date(element).getMonth() +
          '/' +
          new Date(element).getFullYear() ||
      !dateDuSquat
    ) {
      arrayTemp.push(element);
    } else {
      squatParJour.push(arrayTemp);
      console.log('nombre de squat au ', dateDuSquat);
      console.log(arrayTemp.length);
      nbrSquatParJour.push({x: data[i - 1], y: arrayTemp.length});
      arrayTemp = [];
    }

    dateDuSquat =
      new Date(element).getDate() +
      '/' +
      new Date(element).getMonth() +
      '/' +
      new Date(element).getFullYear();
    if (data[i + 1] - element > 20000) {
      nbrSection++;
      indexSection.push(i + 1);
    }
  }
  squatParJour.push(arrayTemp);

  /// ya pas un blem la avec data[data.length - 1] ???
  nbrSquatParJour.push({x: data[data.length - 1], y: arrayTemp.length + 2});

  console.log('nombre de squat au ', dateDuSquat);
  console.log(arrayTemp.length + 2);
  console.log('nbrSquatParJour');
  console.log(nbrSquatParJour);

  console.log('tableau des squat repartis par Jour');
  console.log(squatParJour);

  indexSection.push(data.length);
  console.log('nombre de session');
  console.log(nbrSection);
  let moyenneDuréeSquatParSessionArray = [];

  for (let i = 0; i < nbrSection; i++) {
    section.push(data.slice(indexSection[i], indexSection[i + 1]));
  }
  console.log('index des Session');
  console.log(indexSection);
  //   console.log(section);

  for (const iterator of section) {
    let sum = 0;
    let moyenneDuréeSquatParSession = 0;

    for (let i = 0; i < iterator.length - 1; i++) {
      sum += iterator[i + 1] - iterator[i];
    }
    moyenneDuréeSquatParSession =
      Math.round((sum / iterator.length / 1000) * 100) / 100;
    console.log(
      'temps moyen entre squats sur cette session => ',
      section.indexOf(iterator),
    );
    console.log(moyenneDuréeSquatParSession, ' s');
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
    moyenneDuréeSquatParSessionArray.push({
      x: iterator[iterator.length - 1],
      y: moyenneDuréeSquatParSession,
    });
  }
  dataAnalysées.section = section;
  dataAnalysées.nbrSquatParJour = nbrSquatParJour;
  dataAnalysées.squatParJour = squatParJour;
  dataAnalysées.indexSection = indexSection;
  dataAnalysées.moyenneDuréeSquatParSessionArray =
    moyenneDuréeSquatParSessionArray;
  dataAnalysées.maxSquatSurUneSession = maxSquatSurUneSession;
  // dataAnalysées.indexSection = indexSection;
  console.log(dataAnalysées);
};
export default analyseData;
