const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.skor');
let tanahSebelumnya;
let selesai; //variabel agar kemunculan tikus bisa berhenti
let skor;

//fungsi untuk merandom nomor tanah
function randomTanah(tanah){
	const t = Math.floor(Math.random() * tanah.length); 
	const tRandom = tanah[t];
   		
//batasi agar nilai random berikutnya tidak sama dengan nilai random sebelumnya
	  if(tRandom == tanahSebelumnya){ //tidak akan jalan pada nilai random pertama karena nilai tanahSebelumnya masih dianggap undefined
		 	randomTanah(tanah); 
		}

	tanahSebelumnya = tRandom;
	return tRandom;
}
//fungsi untuk membuat waktu kemunculan tikus random
function randomWaktu(max, min){
	return Math.round(Math.random() * (max - min) + min);
}

//fungsi untuk memunculkan tikus
function munculkanTikus(){
	const noTanah = randomTanah(tanah);  //mengambil nilai/hasil dari fungsi randomTanah yaitu tanah[noTanah]
	const wRandom = randomWaktu(300, 1500);
	noTanah.classList.add("muncul"); //menambahkan kelas muncul pada kelas tanah
	setTimeout(() => {
		noTanah.classList.remove("muncul");
		if(!selesai){ //selesai = false
			munculkanTikus();
		} 
	}, wRandom)
}

function mulai(){
	selesai = false;
	skor = 0;
	papanSkor.textContent = 0; //textContent = innerHtml
	munculkanTikus();
	setTimeout(()=>{
		selesai = true;
		alert("Waktu Habis!! score : "+ skor);
		papanSkor.textContent = 0;
	}, 10000)
}

function pukul(){
	skor++;
	papanSkor.textContent = skor;
	// console.log(this);
	this.parentNode.classList.remove("muncul");
}

tikus.forEach(t => {
	t.addEventListener('click', pukul);
})