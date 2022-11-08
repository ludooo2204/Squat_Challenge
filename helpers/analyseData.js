/* eslint-disable prettier/prettier */
const formatedDateWithSemaine = timeStamp => {
	let date = new Date(timeStamp);
	let debutdate = new Date(date.getFullYear(), 0, 1);
	let jours = Math.floor((date - debutdate) / (24 * 60 * 60 * 1000));
	let numero_semaine = Math.ceil((date.getDay() + 1 + jours) / 7);
	return "s" + numero_semaine + "_" + date.getFullYear();
};

const formatedDate = (element) => {
	return new Date(element).getDate() +
		'/' +
		(new Date(element).getMonth() + 1) +
		'/' +
		new Date(element).getFullYear()
}
const formatedDateWithHours = (element) => {
	return new Date(element).getDate() +
		'/' +
		(new Date(element).getMonth() + 1) +

		'/' +
		new Date(element).getFullYear() + " " +
		new Date(element).getHours() + "h"
}


// TODO completer analyse
const analyseData = data => {
	let dataAnalysées = {};
	let section = [];
	let nbrSection = 1;
	let indexSection = [0];
	let maxSquatSurUneSession = 0;
	let maxSquatSurUneJournee = 0;
	let maxSquatSurUneSemaine = 0;
	let maxSquatSurUneHeure = 0;
	let dateDuSquat;
	let semaineDuSquat;
	let heureDuSquat;
	let squatParJour = [];
	let squatParSemaine = [];
	let squatParHeure = [];

	let arrayTemp = [];
	let arrayHourTemp = [];
	let arraySemaineTemp = [];
	let nbrSquatParJour = [];
	let nbrSquatParHeure = [];
	let nbrSquatParSemaine = [];


	// formate les datas
	for (let i = 0; i < data.length - 1; i++) {
		const element = data[i];
		if (
			dateDuSquat == formatedDate(element) ||
			!dateDuSquat
		) {
			arrayTemp.push(element);
		} else {
			squatParJour.push(arrayTemp);
			nbrSquatParJour.push({ x: data[i - 1], y: arrayTemp.length });
			arrayTemp = [];
		}

		if (
			heureDuSquat == formatedDateWithHours(element) ||
			!heureDuSquat
		) {
			arrayHourTemp.push(element);
		} else {
			squatParHeure.push(arrayHourTemp);
			nbrSquatParHeure.push({ x: data[i - 1], y: arrayHourTemp.length });
			arrayHourTemp = [];
		}
		if (
			semaineDuSquat == formatedDateWithSemaine(element) ||
			!semaineDuSquat
		) {
			arraySemaineTemp.push(element);
		} else {
			squatParSemaine.push(arraySemaineTemp);
			nbrSquatParSemaine.push({ x: data[i - 1], y: arraySemaineTemp.length });
			arraySemaineTemp = [];
		}

		dateDuSquat = formatedDate(element)
		semaineDuSquat = formatedDateWithSemaine(element)
		heureDuSquat = formatedDateWithHours(element)
		// increment session/section
		if (data[i + 1] - element > 20000) {
			nbrSection++;
			indexSection.push(i + 1);
		}
	}




	squatParJour.push(arrayTemp);
	squatParHeure.push(arrayHourTemp);
	squatParSemaine.push(arraySemaineTemp);

	/// ya pas un blem la avec data[data.length - 1] ???
	nbrSquatParJour.push({ x: data[data.length - 1], y: arrayTemp.length + 2 });
	nbrSquatParHeure.push({ x: data[data.length - 1], y: arrayHourTemp.length + 2 });
	nbrSquatParSemaine.push({ x: data[data.length - 1], y: arraySemaineTemp.length + 2 });


	// console.log('nbrSquatParJour');
	// console.log(nbrSquatParJour);
	// console.log('squatParJour');
	// console.log(squatParJour)
	console.log('squatParHeure');
	console.log(squatParHeure);
	console.log('nbrSquatParHeure');
	console.log(nbrSquatParHeure)
	// maxSquatSurUneJournee=
	const listeNbrSquatparnbrjour = nbrSquatParJour.map((e, i) => e.y)
	maxSquatSurUneJournee = Math.max(...listeNbrSquatparnbrjour)
	let dateMaxSquatParJour = (formatedDate(nbrSquatParJour.find(e => e.y == maxSquatSurUneJournee).x))
	console.log('dateMaxSquatParJour');
	console.log(dateMaxSquatParJour)
	const listeNbrSquatparHeure = nbrSquatParHeure.map((e, i) => e.y)
	maxSquatSurUneHeure = Math.max(...listeNbrSquatparHeure)
	let dateMaxSquatParHeure = (formatedDateWithHours(nbrSquatParHeure.find(e => e.y == maxSquatSurUneHeure).x))
	console.log('maxSquatSurUneHeure');
	console.log(maxSquatSurUneHeure)
	const listeNbrSquatparSemaine = nbrSquatParSemaine.map((e, i) => e.y)
	maxSquatSurUneSemaine = Math.max(...listeNbrSquatparSemaine)
	let dateMaxSquatParSemaine = (formatedDateWithSemaine(nbrSquatParSemaine.find(e => e.y == maxSquatSurUneSemaine).x))

	console.log('maxSquatSurUneHeure');
	console.log(maxSquatSurUneHeure)

	console.log('dateMaxSquatParHeure');
	console.log(dateMaxSquatParHeure)
	console.log('maxSquat par semaine');
	console.log(maxSquatSurUneSemaine)

	console.log('dateMaxSquatParSemaine');
	console.log(dateMaxSquatParSemaine)

	indexSection.push(data.length);
	console.log('nombre de session');
	console.log(nbrSection);
	let moyenneDuréeSquatParSessionArray = [];

	for (let i = 0; i < nbrSection; i++) {
		section.push(data.slice(indexSection[i], indexSection[i + 1]));
	}

	for (const iterator of section) {
		let sum = 0;
		let moyenneDuréeSquatParSession = 0;

		for (let i = 0; i < iterator.length - 1; i++) {
			sum += iterator[i + 1] - iterator[i];
		}
		moyenneDuréeSquatParSession =
			Math.round((sum / iterator.length / 1000) * 100) / 100;

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
	dataAnalysées.maxSquatSurUneJournee = { nbr: maxSquatSurUneJournee, date: dateMaxSquatParJour };
	dataAnalysées.maxSquatSurUneHeure = { nbr: maxSquatSurUneHeure, date: dateMaxSquatParHeure };
	dataAnalysées.maxSquatSurUneSemaine = { nbr: maxSquatSurUneSemaine, date: dateMaxSquatParSemaine };
	dataAnalysées.moyenneDuréeSquatParSessionArray =
		moyenneDuréeSquatParSessionArray;
	dataAnalysées.maxSquatSurUneSession = maxSquatSurUneSession;
	// dataAnalysées.indexSection = indexSection;
	console.log("dataAnalysées");
	console.log(dataAnalysées);
};
export default analyseData;
