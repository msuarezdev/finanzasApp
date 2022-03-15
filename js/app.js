const ingresos = [
    new Ingreso('salario', 128000.00),
    new Ingreso('Venta pagina web',40000.00)
];

const egresos = [
    new Egreso('Pago alquiler', 40000.00),
    new Egreso('Compra de ropa', 6000.00)
];

let cargarApp = ()=>{
    cargarHeader();
    cargarIngresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarHeader = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto); 
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso());
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos()); 
}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-AR',{style:'currency', currency:'ARS', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-AR',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = () =>{
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
        
    }
    document.getElementById('lista__ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresosHTML = `
    <div class="elemento limpiarEstilos" >
                    <div class="elemento__descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento__valor">
                            ${formatoMoneda(ingreso.valor)}
                        </div>
                        <div class="elemento__eliminar">
                            <button class="elemento__eliminar--btn">
                                <ion-icon name="close-circle-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return ingresosHTML
}

let agregarDato = ()=>{
    let forma = document.forms['form'];
    let tipo = form['tipo'];
    let descripcion = form['descripcion']; 
    let valor = form['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if (tipo.value === 'ingreso') {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarHeader();
            cargarIngreso();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarHeader();
            cargarEgreso();
        }
    }
    
}