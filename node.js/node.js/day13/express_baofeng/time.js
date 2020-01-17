let time = new Date().getTime();
let rand = Math.round(Math.random() * 1000);
let rand_1 = Math.round(Math.random() * 10);
if (rand_1 > 5) {
	console.log(time + rand);
} else {
	console.log(time - rand);
}
