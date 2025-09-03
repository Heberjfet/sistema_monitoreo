function validateLuxes(lux, observations) {
    if (lux < 0) {
        return "El valor de lux no puede ser negativo.";
    }
    if (observations.length > 200) {
        return "Las observaciones no pueden exceder los 200 caracteres.";
    }
    return null;
}

function validateInrows(fpm, temperature, observations) {
    if (fpm < 0) {
        return "El valor de FPM no puede ser negativo.";
    }
    if (temperature < -50 || temperature > 50) {
        return "La temperatura debe estar entre -50 y 50 grados.";
    }
    if (observations.length > 200) {
        return "Las observaciones no pueden exceder los 200 caracteres.";
    }
    return null;
}

function validateEmergencyLamps(functioning, lux, observations) {
    if (typeof functioning !== 'boolean') {
        return "El estado de funcionamiento debe ser verdadero o falso.";
    }
    if (lux < 0) {
        return "El valor de lux no puede ser negativo.";
    }
    if (observations.length > 200) {
        return "Las observaciones no pueden exceder los 200 caracteres.";
    }
    return null;
}

function validateAirConditioners(usageTime, observations) {
    if (usageTime < 0) {
        return "El tiempo de uso no puede ser negativo.";
    }
    if (observations.length > 200) {
        return "Las observaciones no pueden exceder los 200 caracteres.";
    }
    return null;
}