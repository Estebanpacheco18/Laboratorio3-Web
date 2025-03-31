const fs = require('fs');

// FLujo de lectura
const readable = fs.createReadStream('datos.txt', { encoding: 'utf8' });

readable.on('data', chunk => console.log('Fragmento recibido:', chunk));
readable.on('end', () => console.log('Lectura completa'));
readable.on('error', err => console.error('Error:', err));

// Flujo de escritura
const writable = fs.createWriteStream('salida.txt');
writable.write('Este es un mensaje de prueba.\n');
writable.end('Fin del mensaje.');
writable.on('finish', () => console.log('Escritura completada.'));

// Compresión del archivo entrada.txt
const zlib = require('zlib');
const readStream = fs.createReadStream('entrada.txt');
const writeStream = fs.createWriteStream('entrada.txt.gz');
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);