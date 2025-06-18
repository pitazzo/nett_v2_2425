const LEGAL_AGE = 16;

const birthYear = parseInt(process.argv[2]);
const username = process.argv[3];

if (!birthYear) {
  console.error("Úsame así: hello-world.js <año> <nombre>");
  return;
}

if (!username) {
  console.error("Úsame así: hello-world.js <año> <nombre>");
  return;
}

const currentYear = new Date().getFullYear();

const age = currentYear - birthYear;

if (age < LEGAL_AGE) {
  console.log(`hola, ${username}, eres menor de edad`);
} else {
  console.log(`hola, ${username}, eres mayor de edad`);
}
