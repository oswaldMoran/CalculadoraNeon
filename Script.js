const pantalla = document.querySelector('.pantalla');
const botones = document.querySelectorAll('.btn');
const MAX_CARACTERES_VISIBLES = 12; // Dígitos visibles sin scroll
const TAMANO_FUENTE_NORMAL = '2.5rem';
const TAMANO_FUENTE_PEQUENO = '1.8rem';

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const botonApretado = boton.textContent;

        // Limpiar pantalla
        if (boton.id === 'c') {
            pantalla.textContent = '0';
            resetearEstiloPantalla();
            return;
        }

        // Borrar último dígito
        if (boton.id === 'borrar') {
            if (pantalla.textContent.length === 1 || pantalla.textContent === 'ERROR') {
                pantalla.textContent = '0';
                resetearEstiloPantalla();
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
                ajustarTamanoFuente();
            }
            return;
        }

        // Calcular resultado
        if (boton.id === 'igual') {
            try {
                const resultado = eval(pantalla.textContent.replace('×', '*'));
                mostrarResultado(resultado);
            } catch {
                pantalla.textContent = 'ERROR';
                resetearEstiloPantalla();
            }
            return;
        }

        // Añadir dígitos/operadores
        if (pantalla.textContent === '0' || pantalla.textContent === 'ERROR') {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
        
        ajustarTamanoFuente();
    });
});

// Funciones auxiliares
function ajustarTamanoFuente() {
    if (pantalla.textContent.length > MAX_CARACTERES_VISIBLES) {
        pantalla.style.fontSize = TAMANO_FUENTE_PEQUENO;
        pantalla.style.justifyContent = 'flex-start';
        pantalla.scrollLeft = pantalla.scrollWidth;
    } else {
        resetearEstiloPantalla();
    }
}

function resetearEstiloPantalla() {
    pantalla.style.fontSize = TAMANO_FUENTE_NORMAL;
    pantalla.style.justifyContent = 'flex-end';
    pantalla.scrollLeft = 0;
}

function mostrarResultado(resultado) {
    const resultadoStr = resultado.toString();
    
    if (resultadoStr.length > MAX_CARACTERES_VISIBLES) {
        pantalla.textContent = parseFloat(resultado.toPrecision(6));
    } else {
        pantalla.textContent = resultadoStr;
    }
    
    resetearEstiloPantalla();
}