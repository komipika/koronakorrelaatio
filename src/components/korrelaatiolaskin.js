/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/

//Laskee korrelaation kahdelle samankokoiselle datasetille pearsonin korrelaatiokertoimen kaavalla
//Palauttaa olion, joka sisältää tekstiä ja dataa

/*
console.log(hakuData)
console.log(koronaData)
*/

function laskekorrelaatio (hakuData, koronaData) {
	
	let scatterData = []
	
	let koronakeskihajontalaskuri = 0
	let hakukeskihajontalaskuri   = 0
	let koronakeskiarvolaskuri    = 0
	let hakukeskiarvolaskuri 			= 0
	
	let hakupituus   = 0
	let koronapituus = 0
	let uskottavuus = 0

	for(var element in koronaData){
		koronakeskiarvolaskuri += koronaData['' + element]['data']
		koronapituus++
		let solu = [hakuData['' + element] , koronaData['' + element]['data']]
		if (solu[0] !== 0 && solu[1] !== 0) uskottavuus++
		if (!(solu[0] === 0 && solu[1] === 0))scatterData.push(solu)
		hakukeskiarvolaskuri += hakuData['' + element]
		hakupituus++
	}

	//console.log(scatterData)
	
	let hakukeskiarvo = hakukeskiarvolaskuri / hakupituus
	let koronakeskiarvo = koronakeskiarvolaskuri / koronapituus

	for(element in koronaData){
		koronakeskihajontalaskuri += (koronaData['' + element]['data'] - koronakeskiarvo) * (koronaData['' + element]['data'] - koronakeskiarvo)
		hakukeskihajontalaskuri += (hakuData['' + element] - hakukeskiarvo) * (hakuData['' + element] - hakukeskiarvo)
	}

	let hakuhajonta = Math.sqrt(hakukeskihajontalaskuri / hakupituus) 
	let koronahajonta = Math.sqrt(koronakeskihajontalaskuri / koronapituus) 
	let pearsonlaskuri = 0

	for(element in hakuData){
			pearsonlaskuri += (hakuData['' + element] - hakukeskiarvo) * (koronaData['' + element]['data'] - koronakeskiarvo) //* (helement.haku - hakukeskiarvo)
	}
	
	let pearsonjakaja = (koronapituus * koronahajonta * hakuhajonta)
	let pearson = pearsonjakaja !== 0 ? pearsonlaskuri / pearsonjakaja : 0

	/*
	console.log(koronakeskiarvo)
	console.log(koronapituus)
	console.log(koronahajonta)
	console.log(koronakeskihajontalaskuri)
	console.log(pearsonjakaja)
	console.log(pearson)
	*/

	let data = {}
	data.teksti = pearson > 0.7 || pearson < -0.7 ? 
									'muuttujien välillä on selvä lineaarinen yhteys' :
								pearson > 0.3 || pearson < -0.3 ? 
									'muuttujien välillä on jonkin verran lineaarista yhteyttä' :
								pearson > 0.1 || pearson < -0.1 ? 
									'muuttujien välillä ei ole juurikaan lineaarista yhteyttä':
									'muuttujien välillä ei ole lineaarista yhteyttä';
	data.pearson = Math.abs(pearson) 
	data.scatterData = scatterData
	data.uskottavuus = uskottavuus
	//console.log(data)

	return data
}

export default laskekorrelaatio