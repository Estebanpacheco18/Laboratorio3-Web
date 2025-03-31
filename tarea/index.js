const fs = require('fs');
const { Transform } = require('stream');

// Crear un Transform Stream que convierta el texto a mayusculas
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

// Crear un flujo de lectura para el archivo original
const readStream = fs.createReadStream('texto.txt');

// Crear un flujo de escritura para el archivo de salida
const writeStream = fs.createWriteStream('texto_mayusculas.txt');

// Conectar los streams: leer, transformar y escribir
readStream.pipe(transformStream).pipe(writeStream);

// Mensaje al finalizar la escritura
writeStream.on('finish', () => console.log('Transformación a mayusculas completada.'));