const fs = require('fs');
const zlib = require('zlib');

// Flujo de lectura
const readable = fs.createReadStream('datos.txt', { encoding: 'utf8' });

// Flujo de escritura
const writable = fs.createWriteStream('salida.txt');

// Manejo del flujo de datos
readable.on('data', chunk => {
    if (!writable.write(chunk)) {
        readable.pause();
        writable.on('drain', () => readable.resume());
    }
});

// Manejo del final del flujo e impresión del mensaje
readable.on('end', () => {
    writable.end('Fin del mensaje.'); // En el final se escribe el mensaje
    console.log('Lectura completa y escritura finalizada.'); // Mensaje de finalización en la consola
});

// Manejo de errores en la lectura y escritura
readable.on('error', err => console.error('Error en lectura:', err));
writable.on('error', err => console.error('Error en escritura:', err));

// Compresión del archivo entrada.txt
const readStream = fs.createReadStream('entrada.txt');
const writeStream = fs.createWriteStream('entrada.txt.gz');
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);

// Imprimir mensajes de progreso
writeStream.on('finish', () => console.log('Compresión completada.'));