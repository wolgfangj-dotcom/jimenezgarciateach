document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado. Iniciando script...');

    // --- Referencias a elementos del DOM (Declaración ÚNICA para cada uno) ---
    const loginForm = document.getElementById('loginForm');
    const loginScreen = document.getElementById('login-screen');
    const mainMenuScreen = document.getElementById('main-menu-screen');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const loggedInUserSpan = document.getElementById('loggedInUser');

    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clientNameSpan = document.getElementById('clientName');
    const clientDocTypeSpan = document.getElementById('clientDocType');
    const clientDocNumSpan = document.getElementById('clientDocNum');
    const clientPhoneSpan = document.getElementById('clientPhone');
    const clientEmailSpan = document.getElementById('clientEmail');

    // Resumen 360
    const resumenTrac = document.getElementById('resumenTrac');
    const resumenClaroPuntos = document.getElementById('resumenClaroPuntos');
    const resumenSegmento = document.getElementById('resumenSegmento');
    const resumenObservado = document.getElementById('resumenObservado');
    const resumenMiClaro = document.getElementById('resumenMiClaro');

    // Información para Ventas
    const ventasLineas = document.getElementById('ventasLineas');
    const ventasPlan = document.getElementById('ventasPlan');

    // Información para Experiencia
    const experienciaCumpleanios = document.getElementById('experienciaCumpleanios');
    const experienciaPuntosVencer = document.getElementById('experienciaPuntosVencer');
    const experienciaPagoVencido = document.getElementById('experienciaPagoVencido');

    // Contactabilidad
    const numeroOrigenLlamadaInput = document.getElementById('numeroOrigenLlamada');
    const serialNumberInput = document.getElementById('serialNumber');
    const guardarContactabilidadBtn = document.getElementById('guardarContactabilidadBtn');
    const contactabilidadMessage = document.getElementById('contactabilidad-message');

    // Modales
    const nuevoClienteBtn = document.getElementById('nuevoClienteBtn');
    const newClientModal = document.getElementById('new-client-modal');
    const generarOportunidadBtn = document.getElementById('generarOportunidadBtn');
    const generarOportunidadModal = document.getElementById('generar-oportunidad-modal');
    const closeButtons = document.querySelectorAll('.modal .close-button');

    // Referencias a los selects de Diagnóstico
    const diagTipoSolicitud = document.getElementById('diagTipoSolicitud');
    const diagSubMotivo0 = document.getElementById('diagSubMotivo0');
    const diagSubMotivo1 = document.getElementById('diagSubMotivo1');
    const diagMotivoCancelacion = document.getElementById('diagMotivoCancelacion');
    const diagSubMotivo2 = document.getElementById('diagSubMotivo2');
    const diagSubMotivo3 = document.getElementById('diagSubMotivo3');

    // Referencias a los selects de Oferta de la Competencia
    const ofertaCompetenciaSelect = document.getElementById('ofertaCompetencia');
    const ofertaCFPlanCompetencia = document.getElementById('ofertaCFPlanCompetencia');
    const ofertaMedioComunicacion = document.getElementById('ofertaMedioComunicacion');
    const ofertaOperador = document.getElementById('ofertaOperador');
    const ofertaAceptacionPublicitaria = document.getElementById('ofertaAceptacionPublicitaria');
    const telefonoAGestionarInput = document.getElementById('telefonoAGestionar');
    const lineaAdicionalInput = document.getElementById('lineaAdicional');

    // Referencias a los selects y campos de Despacho / Instalación
    const despachoTipoDespacho = document.getElementById('despachoTipoDespacho');
    const despachoPuntoVenta = document.getElementById('despachoPuntoVenta');
    const despachoUbigeo = document.getElementById('despachoUbigeo');
    const despachoFechaSolicitada = document.getElementById('despachoFechaSolicitada');
    const despachoHoraSolicitada = document.getElementById('despachoHoraSolicitada');
    const despachoFechaPrometida = document.getElementById('despachoFechaPrometida');
    const despachoDireccionEntrega = document.getElementById('despachoDireccionEntrega');
    const despachoReferenciaDireccion = document.getElementById('despachoReferenciaDireccion');

    // Referencias a los selects y campos de Producto / Gestión de Pedido
    const productoTipoOperacion = document.getElementById('productoTipoOperacion');
    const productoNumSecInicial = document.getElementById('productoNumSecInicial');

    // Referencias a la tabla de Acciones de Retención y Etapa
    const addRowBtn = document.getElementById('addRowBtn');
    const accionesRetencionTableBody = document.getElementById('accionesRetencionTableBody');
    const totalRowsSpan = document.getElementById('totalRows');
    const etapaSelect = document.getElementById('etapa');
    const detalleEtapaSelect = document.getElementById('detalleEtapa');
    let rowCount = 0;

    // Referencias a la tabla de Oportunidades Generadas
    const oportunidadesTableBody = document.getElementById('oportunidadesTableBody');

    // Referencia al nuevo contenedor de mensajes personalizados
    const customMessageBox = document.getElementById('custom-message-box');


    // Verificar que los elementos principales existen al inicio
    if (!loginScreen || !mainMenuScreen || !loginForm || !usernameInput || !passwordInput || !errorMessage) {
        console.error('Error CRÍTICO: No se encontraron todos los elementos principales para el login. Verifique los IDs en index.html.');
        console.log({loginScreen, mainMenuScreen, loginForm, usernameInput, passwordInput, errorMessage});
        return; // Detener la ejecución si no se encuentran elementos críticos
    }
    console.log('Elementos principales del login encontrados.');

    // Credenciales genéricas
    const VALID_USERNAME = 'user01';
    const VALID_PASSWORD = 'formaciona365';
    const DISPLAY_USERNAME = 'c27032';

    // --- Función para mostrar mensajes personalizados (reemplazo de alert) ---
    /**
     * Muestra un mensaje temporal en la parte superior de la pantalla.
     * @param {string} message El texto del mensaje.
     * @param {string} type 'success' para verde, 'error' para rojo.
     * @param {number} duration Duración en milisegundos antes de que el mensaje se oculte (por defecto 3000ms).
     */
    function showMessage(message, type = 'success', duration = 3000) {
        if (!customMessageBox) {
            console.error('showMessage: Elemento customMessageBox no encontrado.');
            // Fallback a console.log si no se puede mostrar en la UI
            console.log(`Mensaje (${type}): ${message}`);
            return;
        }

        customMessageBox.textContent = message;
        customMessageBox.className = 'custom-message-box show'; // Resetear clases y añadir 'show'

        if (type === 'error') {
            customMessageBox.classList.add('error');
        } else {
            customMessageBox.classList.remove('error');
        }

        setTimeout(() => {
            customMessageBox.classList.remove('show');
        }, duration);
    }

    // --- Datos de Tipificación (Árbol de Diagnóstico) ---
    const diagnosticoData = {
        "CALIDAD DE LA VENTA": { //motivo de cancelacion
            "Le vendieron Chip con nombre incorrecto": [],
            "Me dijeron que era servicio postpago pero es Prepago": [],
			"Mala informacion": {
				"NO ME INFORMARON DE LA EXISTENCIA DE UN CONTRATO": [],
				"CONTENIDO DEL PLAN": []
			},
            "incumplimiento de Ofrecimiento": {
				"NO SE LE ENTREGO EL DESCUENTO OFRECIDO": [],
				"NO SE LE ENTREGO EL BONO DE GB OFRECIDO": []
			}
        },
        "PROBLEMAS CON EL USO DEL SERVICIO": { // Motivo de Cancelación
            "MI EQUIPO ESTA FALLANDO": [], // Sub Motivo de Cancelación 1 (final)
			"PROBLEMAS CON EL OTRO SERCICIO": {
				"Servicio corporativo movil": [],
				"Servicio fijo": [],
				"Servicio postpago movil": []
			},
	        "PROBLEMAS DE COBERTURA": { // Sub Motivo de Cancelación 1
	            "INTERNET": {// Sub Motivo de Cancelación 2
	                "Intermitencia en el servicio Indoor": ["Escalado por celdas AT", "No escalado por celdas AT"], // Sub Motivo de Cancelación 3 (FINAL)
					"Intermitencia en el servicio Outdoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
	                "Lentitud en el servicio Indoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
					"Lentitud en el servicio Outdoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
	                "Sin señal Indoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
					"Sin señal Outdoor": ["Escalado por celdas AT", "No escalado por celdas AT"]
	            },
	            "INTERNET + LLAMADAS": {
	                "Intermitencia en el servicio Indoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
					"Intermitencia en el servicio Outdoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
	                "Sin señal Indoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
					"Sin señal Outdoor": ["Escalado por celdas AT", "No escalado por celdas AT"]
				},
	            "LLAMADAS": {
	                "Intermitencia en el servicio Indoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
					"Intermitencia en el servicio Outdoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
	                "Sin señal Indoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
					"Sin señal Outdoor": ["Escalado por celdas AT", "No escalado por celdas AT"]
	            },
	            "MENSAJES": {
	                "Sin señal Indoor": ["Escalado por celdas AT", "No escalado por celdas AT"],
					"Sin señal Outdoor": ["Escalado por celdas AT", "No escalado por celdas AT"]
	            }
	        }
	    },
		"PRECIO Y CONTENIDO": {
            "CONTENIDO PREPAGADO": {
				"BONO PREPAGADO NO ENTREGADO": [],
				"BONO PREPAGO NO ENTREGADO": [],
				"LA RECARGA ME DURA POCOS DIAS": [],
				"NO RECIBO BONO OR RECARGAR": [],
				"NO RECIBIO SU RECARGA": []
			},
			"EVALUACIONES CREDITICIAS": {
				"SIN FACILIDADES PARA MIGRAR A POSTPAGO": [],
				"SIN FACILIDADES PARA MIGRAR A POSTPAGO CON EQUIPO": [],
			},
			"NO DESEA RENOVAR": [],
            "PLANES CAROS": [],
            "PROMOCIONES INSUFICIENTES": [],
			"OFERTA DE LA COMPETENCIA": {
				"ME OFRECEN PORTAR CON DESCUENTO Y/O BONO": [],
				"ME OFRECEN PORTAR CON DESCUENTO Y/O BONO + EQUIPO": [],
				"ME OFRECIERON DESCUENTO EN LINEAS ADICIONALES": [],
				"ME OFRECEN PORTAR CON EQUIPO": []
			},
			"CONTENIDO DEL PLAN": {
				"NO UTILIZO LA TOTALIDAD DE MIS GB": [],
				"LOS GB DE MI PLAN NO SON SUFICIENTES": []
			}
        },
        "FACTURACION, PAGOS Y POSTVENTA": { // Motivo de Cancelación
            "NO ESTOY DEACUERDO CON EL COBRO": {
				"RECONEXION DEL SERVICIO":[],
				"SERVICIO DE VALOR AGREGADO": [],
				"PAQUETES ADICIONALES (ON TOP)": [],
				"PRORRATEO": {
					"CAMBIO DE PLAN": [],
					"BLOQUEO POR COBRANZA": []
				},
				"INCREMENTO EN EL CARGO FIJO": []
			},
			"INCUMPLIMIENTO EN LA ATENCION DE SOLICITUD": {
				"NO SE EJECUTO SUSPENCION TEMPORAL": [],
				"NO SE EJECUTO BAJA DEL SERVICIO": [],
				"NO SE EJECUTO CAMBIO DE PLAN": [],
				"NO SE EJECUTO BENEFICIO FULL CLARO": [],
				"NO SE APLICO DESCUENTO POR RETENCION": []
			},
			"NO ME LLEGA EL RECIBO": [],
			"NO ESTOY DE ACUERDO CON LA GESTION DE COBRANZA": [],
			"NO ESTOY DE ACUERDO CON LA FECHA DE PAGO": [],
            "GESTIÓN DE LA DEMANDA": {
				"ATENCIÓN AL CLIENTE": [],
				"TIEMPO DE ESPERA": [],
				"NO RESOLVIERON MI PROBLEMA": []
			}
        },
        "ECONOMICO/NECESIDAD": {
            "NO NECESITO EL SERVICIO POST PAGO": {
				"LA USABA OTRA PERSONA Y YA NO LA NECESITA": [],
				"POR VIAJE AL EXTRANJERO": [],
				"LINEAS CON ORO OPERADOR": [],
				"YA TERMINO EL CONTRATO DEL EQUIPO": [],
				"TENGO INTERNET EN CASA": []
			},
            "ESTOY CON PROBLEMAS ECONOMICOS": [],
            "CONSTANTEMENTE RECIBO LLAMADAS NO DESEADAS": []
        }
    };


    const ofertaCompetenciaOptions = {
        "MOVISTAR": ["PLAN 29.90", "PLAN 39.90", "PLAN 49.90"],
        "ENTEL": ["PLAN 25.00", "PLAN 35.00", "PLAN 45.00"],
        "BITEL": ["PLAN 20.00", "PLAN 30.00", "PLAN 40.00"],
        "TUENTI": ["PLAN 19.90", "PLAN 29.90"],
        "CLARO": ["PLAN 29.90", "PLAN 39.90", "PLAN 49.90"]
    };

    const medioComunicacionData = ["TELEFÓNICO", "PRESENCIAL", "DIGITAL", "REDES SOCIALES"];
    const operadorData = ["MOVISTAR", "ENTEL", "BITEL", "TUENTI", "CLARO"];
    const aceptacionPublicitariaData = ["Acepto", "No Acepto"];

    const tipoOperacionData = ["Portabilidad", "Renovación"];

    const accionesRetencionData = [
        "Renovación", "Ajuste OCC", "Bono de retención", "Ajuste NC", "Informativo",
        "Solicitudes", "Atención de problemas tecnológicos", "Portabilidad",
        "Cambio de Plan", "Upgrade + Descuento promocional"
    ];

    const estadoFinalData = ["Atendido", "No Atendido", "En Proceso", "Pendiente"];
    const detalleEstadoFinalData = {
        "Atendido": ["TRANSFERENCIA EXITOSA", "VENTA CERRADA", "SERVICIO ACTIVADO"],
        "No Atendido": ["NO INTERESADO", "NO CUMPLE REQUISITOS", "CLIENTE INACCESIBLE"],
        "En Proceso": ["PENDIENTE DE DOCUMENTOS", "VALIDACIÓN PENDIENTE"],
        "Pendiente": ["SEGUIMIENTO", "REAGENDADO"]
    };

    const etapaData = ["Retenido", "No Retenido", "Conforme", "En Proceso"];
    const detalleEtapaData = {
        "Retenido": ["RENOVACION EXITOSA", "AJUSTE DE PLAN", "BONO APLICADO"],
        "No Retenido": ["CANCELACION DE LINEA", "PORT OUT REALIZADO", "MIGRACION A PREPAGO"],
        "Conforme": ["CLIENTE SATISFECHO", "NO REQUIERE ACCION"],
        "En Proceso": ["VALIDACION PENDIENTE", "DOCUMENTACION EN REVISION"]
    };

    const puntosDeVentaData = [
        "427 - CAC CHICLAYO I", "428 - CAC LIMA CENTRO", "429 - CAC AREQUIPA",
        "430 - CAC TRUJILLO", "431 - CAC CUSCO"
    ];


    // --- Funciones de Utilidad para Datos Aleatorios ---
    function generateRandomNumber(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function generateRandomDate() {
        const start = new Date(2000, 0, 1);
        const end = new Date();
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    function generateRandomClientData() {
        return {
            name: 'CLIENTE DE PRUEBA',
            docType: 'DNI',
            docNum: generateRandomNumber(8), // 8 dígitos para DNI
            phone: '9' + generateRandomNumber(8), // 9 dígitos para teléfono
            email: 'cliente.aleatorio' + generateRandomNumber(3) + '@example.com',
            resumenTrac: generateRandomString(5),
            resumenClaroPuntos: generateRandomNumber(4),
            resumenSegmento: 'Postpago',
            resumenObservado: 'No',
            resumenMiClaro: 'Activo',
            ventasLineas: Math.floor(Math.random() * 3) + 1, // 1 a 3 líneas
            ventasPlan: 'Plan Max ' + (Math.floor(Math.random() * 10) + 5) + 'GB',
            experienciaCumpleanios: Math.random() > 0.5 ? generateRandomDate() : 'N/A',
            experienciaPuntosVencer: Math.random() > 0.3 ? generateRandomNumber(3) : '0',
            experienciaPagoVencido: Math.random() > 0.7 ? 'Sí' : 'No',
            // Datos para el modal de oportunidad (pueden ser aleatorios o fijos para simular)
            oppClientName: 'CLIENTE DE PRUEBA FORMATIVO',
            oppClientDocType: 'DNI',
            oppClientDocNum: '72361429',
            oppClientPhone: '932144904',
            oppClientEmail: 'cliente.prueba365@gmail.com',
            oppClientEmailSec: 'secundario@example.com',
            oppClientGender: 'Masculino',
            oppClientBirthDate: '01/01/1990',
            oppClientLegalRep: 'N/A',
            oppServiceCustomerId: generateRandomNumber(10),
            oppServiceContract: generateRandomNumber(8),
            oppServiceCurrentPlan: 'Plan Max 29.90',
            oppServiceActivationDate: generateRandomDate(),
            oppServiceBillingCycle: '10',
            oppServiceImr: '0.5',
            oppServiceConsolidatedBehavior: 'Activo',
            oppServicePreviousQuery: Math.random() > 0.5 ? 'Sí' : 'No',
            oppServiceHasAdjustment: Math.random() > 0.5 ? 'Sí' : 'No',
        };
    }

    // Función para mostrar datos del cliente
    function displayClientData(data) {
        if(clientNameSpan) clientNameSpan.textContent = data.name;
        if(clientDocTypeSpan) clientDocTypeSpan.textContent = data.docType;
        if(clientDocNumSpan) clientDocNumSpan.textContent = data.docNum;
        if(clientPhoneSpan) clientPhoneSpan.textContent = data.phone;
        if(clientEmailSpan) clientEmailSpan.textContent = data.email;

        if(resumenTrac) resumenTrac.textContent = data.resumenTrac;
        if(resumenClaroPuntos) resumenClaroPuntos.textContent = data.resumenClaroPuntos;
        if(resumenSegmento) resumenSegmento.textContent = data.resumenSegmento;
        if(resumenObservado) resumenObservado.textContent = data.resumenObservado;
        if(resumenMiClaro) resumenMiClaro.textContent = data.resumenMiClaro;

        if(ventasLineas) ventasLineas.textContent = data.ventasLineas;
        if(ventasPlan) ventasPlan.textContent = data.ventasPlan;

        if(experienciaCumpleanios) experienciaCumpleanios.textContent = data.experienciaCumpleanios;
        if(experienciaPuntosVencer) experienciaPuntosVencer.textContent = data.experienciaPuntosVencer;
        if(experienciaPagoVencido) experienciaPagoVencido.textContent = data.experienciaPagoVencido;
    }

    // Función para llenar los datos en el modal de Generar Oportunidad
    function fillOpportunityModal(data) {
        if(document.getElementById('oppClientName')) document.getElementById('oppClientName').textContent = data.oppClientName;
        if(document.getElementById('oppClientDocType')) document.getElementById('oppClientDocType').textContent = data.oppClientDocType;
        if(document.getElementById('oppClientDocNum')) document.getElementById('oppClientDocNum').textContent = data.oppClientDocNum;
        if(document.getElementById('oppClientPhone')) document.getElementById('oppClientPhone').textContent = data.oppClientPhone;
        if(document.getElementById('oppClientEmail')) document.getElementById('oppClientEmail').textContent = data.oppClientEmail;
        if(document.getElementById('oppClientEmailSec')) document.getElementById('oppClientEmailSec').textContent = data.oppClientEmailSec || 'N/A';
        if(document.getElementById('oppClientGender')) document.getElementById('oppClientGender').textContent = data.oppClientGender || 'N/A';
        if(document.getElementById('oppClientBirthDate')) document.getElementById('oppClientBirthDate').textContent = data.oppClientBirthDate || 'N/A';
        if(document.getElementById('oppClientLegalRep')) document.getElementById('oppClientLegalRep').textContent = data.oppClientLegalRep || 'N/A';

        if(document.getElementById('oppServiceCustomerId')) document.getElementById('oppServiceCustomerId').textContent = data.oppServiceCustomerId;
        if(document.getElementById('oppServiceContract')) document.getElementById('oppServiceContract').textContent = data.oppServiceContract;
        if(document.getElementById('oppServiceCurrentPlan')) document.getElementById('oppServiceCurrentPlan').textContent = data.oppServiceCurrentPlan;
        if(document.getElementById('oppServiceActivationDate')) document.getElementById('oppServiceActivationDate').textContent = data.oppServiceActivationDate;
        if(document.getElementById('oppServiceBillingCycle')) document.getElementById('oppServiceBillingCycle').textContent = data.oppServiceBillingCycle;
        if(document.getElementById('oppServiceImr')) document.getElementById('oppServiceImr').textContent = data.oppServiceImr;
        if(document.getElementById('oppServiceConsolidatedBehavior')) document.getElementById('oppServiceConsolidatedBehavior').textContent = data.oppServiceConsolidatedBehavior;
        if(document.getElementById('oppServicePreviousQuery')) document.getElementById('oppServicePreviousQuery').textContent = data.oppServicePreviousQuery;
        if(document.getElementById('oppServiceHasAdjustment')) document.getElementById('oppServiceHasAdjustment').textContent = data.oppServiceHasAdjustment;

        // Limpiar y rellenar campos del formulario de oportunidad
        // Diagnóstico
        if(diagTipoSolicitud) {
            diagTipoSolicitud.innerHTML = '<option value="PORT OUT">PORT OUT</option>';
            diagTipoSolicitud.value = 'PORT OUT'; // Asegurarse de que el valor esté seteado
            diagTipoSolicitud.disabled = true; // Deshabilitar
        }

        if(diagMotivoCancelacion) populateSelect(diagMotivoCancelacion, Object.keys(diagnosticoData)); // Ahora usa diagnosticoData
        if(diagSubMotivo0) clearAndDisableSelect(diagSubMotivo0);
        if(diagSubMotivo1) clearAndDisableSelect(diagSubMotivo1);
        if(diagSubMotivo2) clearAndDisableSelect(diagSubMotivo2);
        if(diagSubMotivo3) clearAndDisableSelect(diagSubMotivo3);

        // Oferta de la Competencia
        if(ofertaCompetenciaSelect) populateSelect(ofertaCompetenciaSelect, Object.keys(ofertaCompetenciaOptions));
        if(ofertaMedioComunicacion) populateSelect(ofertaMedioComunicacion, medioComunicacionData);
        if(ofertaOperador) populateSelect(ofertaOperador, operadorData);
        if(ofertaAceptacionPublicitaria) populateSelect(ofertaAceptacionPublicitaria, aceptacionPublicitariaData);
        if(ofertaCFPlanCompetencia) clearAndDisableSelect(ofertaCFPlanCompetencia);
        if(telefonoAGestionarInput) telefonoAGestionarInput.value = data.oppClientPhone; // Precargar con el teléfono del cliente
        if(lineaAdicionalInput) lineaAdicionalInput.value = ''; // Limpiar

        // Despacho / Instalación
        if(despachoTipoDespacho) populateSelect(despachoTipoDespacho, ["Recojo CAC", "Delivery Express", "Delivery regular", "Delivery super express", "Recojo ACD", "Recojo Cadena", "Recojo PickUp"]);
        if(despachoPuntoVenta) populateSelect(despachoPuntoVenta, puntosDeVentaData);
        if(despachoUbigeo) despachoUbigeo.value = '';
        if(despachoFechaSolicitada) despachoFechaSolicitada.value = '';
        if(despachoHoraSolicitada) despachoHoraSolicitada.value = '';
        if(despachoFechaPrometida) despachoFechaPrometida.value = '';
        if(despachoDireccionEntrega) despachoDireccionEntrega.value = '';
        if(despachoReferenciaDireccion) despachoReferenciaDireccion.value = '';

        // Producto / Gestión de Pedido
        if(productoTipoOperacion) populateSelect(productoTipoOperacion, tipoOperacionData);
        if(productoNumSecInicial) productoNumSecInicial.value = generateRandomNumber(18); // Generar un SEC inicial aleatorio de 18 dígitos

        // Acciones de Retención (limpiar tabla)
        if(accionesRetencionTableBody) accionesRetencionTableBody.innerHTML = '';
        rowCount = 0; // Resetear rowCount al abrir el modal
        if(totalRowsSpan) totalRowsSpan.textContent = rowCount;

        // Etapa
        if(etapaSelect) populateSelect(etapaSelect, etapaData);
        if(detalleEtapaSelect) clearAndDisableSelect(detalleEtapaSelect);
    }

    // --- Funciones para poblar y manejar los selects dependientes ---
    function populateSelect(selectElement, options) {
        if (!selectElement) {
            console.warn('populateSelect: Elemento select no encontrado.');
            return;
        }
        selectElement.innerHTML = '<option value="">--select--</option>'; // Limpiar y añadir opción por defecto
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
        selectElement.disabled = false; // Habilitar el select
    }

    function clearAndDisableSelect(selectElement) {
        if (!selectElement) {
            console.warn('clearAndDisableSelect: Elemento select no encontrado.');
            return;
        }
        selectElement.innerHTML = '<option value="">--select--</option>';
        selectElement.disabled = true; // Deshabilitar el select
    }

    // Lógica para Motivo de Cancelación -> Sub Motivo 0
    if (diagMotivoCancelacion) {
        diagMotivoCancelacion.addEventListener('change', () => {
            const selectedMotivo = diagMotivoCancelacion.value;
            clearAndDisableSelect(diagSubMotivo0);
            clearAndDisableSelect(diagSubMotivo1);
            clearAndDisableSelect(diagSubMotivo2);
            clearAndDisableSelect(diagSubMotivo3);

            if (selectedMotivo && diagnosticoData[selectedMotivo]) {
                const subMotivos0 = Object.keys(diagnosticoData[selectedMotivo]);
                populateSelect(diagSubMotivo0, subMotivos0);
            }
        });
    }

    // Lógica para Sub Motivo 0 -> Sub Motivo 1
    if (diagSubMotivo0) {
        diagSubMotivo0.addEventListener('change', () => {
            const selectedMotivo = diagMotivoCancelacion.value;
            const selectedSubMotivo0 = diagSubMotivo0.value;
            clearAndDisableSelect(diagSubMotivo1);
            clearAndDisableSelect(diagSubMotivo2);
            clearAndDisableSelect(diagSubMotivo3);

            if (selectedMotivo && selectedSubMotivo0 &&
                diagnosticoData[selectedMotivo][selectedSubMotivo0]) {

                const subMotivos1 = Object.keys(diagnosticoData[selectedMotivo][selectedSubMotivo0]);
                populateSelect(diagSubMotivo1, subMotivos1);
            }
        });
    }

    // Lógica para Sub Motivo 1 -> Sub Motivo 2
    if (diagSubMotivo1) {
        diagSubMotivo1.addEventListener('change', () => {
            const selectedMotivo = diagMotivoCancelacion.value;
            const selectedSubMotivo0 = diagSubMotivo0.value;
            const selectedSubMotivo1 = diagSubMotivo1.value;
            clearAndDisableSelect(diagSubMotivo2);
            clearAndDisableSelect(diagSubMotivo3);

            if (selectedMotivo && selectedSubMotivo0 && selectedSubMotivo1 &&
                diagnosticoData[selectedMotivo][selectedSubMotivo0][selectedSubMotivo1]) {

                const subMotivos2 = Object.keys(diagnosticoData[selectedMotivo][selectedSubMotivo0][selectedSubMotivo1]);
                populateSelect(diagSubMotivo2, subMotivos2);
            }
        });
    }

    // Lógica para Sub Motivo 2 -> Sub Motivo 3
    if (diagSubMotivo2) {
        diagSubMotivo2.addEventListener('change', () => {
            const selectedMotivo = diagMotivoCancelacion.value;
            const selectedSubMotivo0 = diagSubMotivo0.value;
            const selectedSubMotivo1 = diagSubMotivo1.value;
            const selectedSubMotivo2 = diagSubMotivo2.value;
            clearAndDisableSelect(diagSubMotivo3);

            if (selectedMotivo && selectedSubMotivo0 && selectedSubMotivo1 && selectedSubMotivo2 &&
                diagnosticoData[selectedMotivo][selectedSubMotivo0][selectedSubMotivo1][selectedSubMotivo2]) {

                const subMotivos3 = diagnosticoData[selectedMotivo][selectedSubMotivo0][selectedSubMotivo1][selectedSubMotivo2];
                populateSelect(diagSubMotivo3, subMotivos3);
            }
        });
    }
    // Lógica para Oferta Competencia -> CF Plan Competencia
    if (ofertaCompetenciaSelect) {
        ofertaCompetenciaSelect.addEventListener('change', () => {
            const selectedOperador = ofertaCompetenciaSelect.value;
            clearAndDisableSelect(ofertaCFPlanCompetencia);

            if (selectedOperador && ofertaCompetenciaOptions[selectedOperador]) {
                populateSelect(ofertaCFPlanCompetencia, ofertaCompetenciaOptions[selectedOperador]);
            }
        });
    }

    // Lógica para Etapa -> Detalle Etapa
    if (etapaSelect) {
        etapaSelect.addEventListener('change', () => {
            const selectedEtapa = etapaSelect.value;
            clearAndDisableSelect(detalleEtapaSelect);

            if (selectedEtapa && detalleEtapaData[selectedEtapa]) {
                populateSelect(detalleEtapaSelect, detalleEtapaData[selectedEtapa]);
            }
        });
    }


    // --- Lógica del Login ---
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Detener el envío del formulario
            console.log('Intento de login...');

            // Usar .trim() para eliminar espacios en blanco al inicio o final
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            console.log('Username input value (trimmed):', username);
            console.log('Password input value (trimmed):', password);
            console.log('VALID_USERNAME:', VALID_USERNAME);
            console.log('VALID_PASSWORD:', VALID_PASSWORD);

            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                console.log('Credenciales correctas. Transicionando a main menu...');
                errorMessage.style.display = 'none';
                loginScreen.classList.remove('active');
                mainMenuScreen.classList.add('active');

                if (loggedInUserSpan) {
                    loggedInUserSpan.textContent = DISPLAY_USERNAME;
                }

                // Asegurarse de que el contenido de Home esté activo al iniciar sesión
                const homeContent = document.getElementById('home-content');
                const searchClientContent = document.getElementById('search-client-content');
                const homeNavLink = document.querySelector('.nav-link[data-target="home-content"]');
                const searchClientNavLink = document.querySelector('.nav-link[data-target="search-client-content"]');

                if (homeContent) homeContent.classList.add('active');
                if (searchClientContent) searchClientContent.classList.remove('active');
                if (homeNavLink) homeNavLink.classList.add('active');
                if (searchClientNavLink) searchClientNavLink.classList.remove('active');

            } else {
                console.log('Credenciales incorrectas.');
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
                errorMessage.style.display = 'block';
            }
        });
    } else {
        console.error('El formulario de login (loginForm) no fue encontrado.');
    }


    // --- Lógica de Navegación entre Pestañas ---
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Clic en enlace de navegación:', link.dataset.target);

            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            link.classList.add('active');
            const targetId = link.dataset.target;
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // --- Lógica de Búsqueda de Cliente ---
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            console.log('Botón Buscar clicado.');
            const query = searchInput.value.trim();
            if (query.length > 0) {
                const clientData = generateRandomClientData();
                displayClientData(clientData);
            } else {
                showMessage('Por favor, ingrese un DNI o Teléfono para buscar.', 'error'); // REEMPLAZO DE ALERT
                displayClientData({
                    name: '', docType: '', docNum: '', phone: '', email: '',
                    resumenTrac: '', resumenClaroPuntos: '', resumenSegmento: '', resumenObservado: '', resumenMiClaro: '',
                    ventasLineas: '', ventasPlan: '', experienciaCumpleanios: '', experienciaPuntosVencer: '', experienciaPagoVencido: ''
                });
            }
        });
    }

    // --- Lógica de Guardar Contactabilidad ---
    if (guardarContactabilidadBtn) {
        guardarContactabilidadBtn.addEventListener('click', () => {
            console.log('Botón Guardar Contactabilidad clicado.');
            const numOrigen = numeroOrigenLlamadaInput.value.trim();
            const serialNum = serialNumberInput.value.trim();

            if (numOrigen.length === 0 || serialNum.length === 0) {
                contactabilidadMessage.classList.remove('success-message');
                contactabilidadMessage.classList.add('error-message');
                contactabilidadMessage.textContent = 'Por favor, complete Número origen llamada y Serial Number.';
                contactabilidadMessage.style.display = 'block';
                return;
            }

            if (serialNum.length !== 18 || !/^\d+$/.test(serialNum)) {
                contactabilidadMessage.classList.remove('success-message');
                contactabilidadMessage.classList.add('error-message');
                contactabilidadMessage.textContent = 'Serial Number debe tener 18 dígitos numéricos.';
                contactabilidadMessage.style.display = 'block';
                return;
            }

            contactabilidadMessage.classList.remove('error-message');
            contactabilidadMessage.classList.add('success-message');
            contactabilidadMessage.textContent = '¡Contactabilidad guardada correctamente!';
            contactabilidadMessage.style.display = 'block';

            numeroOrigenLlamadaInput.value = '';
            serialNumberInput.value = '';
            setTimeout(() => {
                contactabilidadMessage.style.display = 'none';
            }, 3000);
        });
    }

    // --- Lógica de apertura/cierre de Modales ---
    if (nuevoClienteBtn) {
        nuevoClienteBtn.addEventListener('click', () => {
            console.log('Abriendo modal Nuevo Cliente.');
            newClientModal.style.display = 'flex';
            document.getElementById('newClientForm').reset();
            document.getElementById('newClientErrorMessage').style.display = 'none';
        });
    }

    if (generarOportunidadBtn) {
        generarOportunidadBtn.addEventListener('click', () => {
            console.log('Abriendo modal Generar Oportunidad.');
            generarOportunidadModal.style.display = 'flex';
            const mockClientDataForOpp = generateRandomClientData();
            fillOpportunityModal(mockClientDataForOpp); // Esto ahora inicializa todos los selects del modal
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Cerrando modal.');
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === newClientModal) {
            console.log('Clic fuera del modal Nuevo Cliente. Cerrando.');
            newClientModal.style.display = 'none';
        }
        if (event.target === generarOportunidadModal) {
            console.log('Clic fuera del modal Generar Oportunidad. Cerrando.');
            generarOportunidadModal.style.display = 'none';
        }
    });

    // --- Lógica del Formulario de Nuevo Cliente (dentro del modal) ---
    const newClientForm = document.getElementById('newClientForm');
    if (newClientForm) {
        newClientForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Formulario Nuevo Cliente enviado.');
            const name = document.getElementById('newClientName').value.trim();
            const docNumber = document.getElementById('newClientDocNumber').value.trim();
            const docType = document.getElementById('newClientDocType').value;
            const phone = document.getElementById('newClientPhone').value.trim();
            const email = document.getElementById('newClientEmail').value.trim();
            const newClientErrorMessage = document.getElementById('newClientErrorMessage');

            let errors = [];

            if (!name) errors.push('Nombre es requerido.');
            if (!docType) errors.push('Tipo de Documento es requerido.');
            if (!docNumber) errors.push('Número de Documento es requerido.');
            else if (docType === 'DNI' && (docNumber.length !== 8 || !/^\d+$/.test(docNumber))) {
                errors.push('DNI debe tener 8 dígitos numéricos.');
            }
            if (!phone) errors.push('Teléfono es requerido.');
            else if (phone.length !== 9 || !/^\d+$/.test(phone)) {
                errors.push('Teléfono debe tener 9 dígitos numéricos.');
            }
            if (!email || !/@/.test(email)) errors.push('Email inválido.');

            if (errors.length > 0) {
                newClientErrorMessage.innerHTML = 'Se han encontrado los siguientes errores:<br><ul>' + errors.map(e => `<li>${e}</li>`).join('') + '</ul>';
                newClientErrorMessage.style.display = 'block';
                showMessage('Errores en el formulario de nuevo cliente.', 'error', 5000); // REEMPLAZO DE ALERT
            } else {
                newClientErrorMessage.style.display = 'none';
                showMessage('Cliente creado exitosamente: ' + name + ' (DNI: ' + docNumber + ', Teléfono: ' + phone + ')', 'success'); // REEMPLAZO DE ALERT
                newClientModal.style.display = 'none';
                newClientForm.reset();
            }
        });
    }

    // --- Lógica de Acciones de Retención (Add Row) ---
    if (addRowBtn) {
        addRowBtn.addEventListener('click', () => {
            console.log('Botón Add Row clicado.');
            rowCount++;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="checkbox"></td>
                <td><i class="fas fa-bars drag-handle"></i></td>
                <td>
                    <select class="action-select">
                        <option value="">-- Select --</option>
                        ${accionesRetencionData.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                </td>
                <td><input type="text" placeholder="Detalle"></td>
                <td><input type="text" placeholder="Detalle2"></td>
                <td>
                    <select class="estado-final-select">
                        <option value="">-- Select --</option>
                        ${estadoFinalData.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                </td>
                <td>
                    <select class="detalle-estado-final-select">
                        <option value="">-- Select --</option>
                    </select>
                </td>
            `;
            accionesRetencionTableBody.appendChild(newRow);
            totalRowsSpan.textContent = rowCount;

            // Añadir event listener para el nuevo select de Estado Final
            const newEstadoFinalSelect = newRow.querySelector('.estado-final-select');
            if (newEstadoFinalSelect) {
                newEstadoFinalSelect.addEventListener('change', (event) => {
                    const selectedEstado = event.target.value;
                    const detalleSelect = event.target.closest('tr').querySelector('.detalle-estado-final-select');
                    clearAndDisableSelect(detalleSelect);
                    if (selectedEstado && detalleEstadoFinalData[selectedEstado]) {
                        populateSelect(detalleSelect, detalleEstadoFinalData[selectedEstado]);
                    }
                });
            }
        });
    }

    // --- Lógica para el botón Guardar del modal de Oportunidad ---
    const guardarOportunidadBtn = document.getElementById('guardarOportunidadBtn');
    if (guardarOportunidadBtn) {
        guardarOportunidadBtn.addEventListener('click', () => {
            console.log('Botón Guardar Oportunidad clicado.');
            // Reemplazo de confirm() por un modal personalizado o una lógica diferente si es necesario
            // Por ahora, mantendremos la lógica simple para la demostración
            if (confirm('¿Está seguro de guardar la oportunidad?')) { // Considera reemplazar este confirm() también
                const oportunidadGenerada = {
                    id: generateRandomNumber(6),
                    campana: "RETENCIÓN MÓVIL PREVENTIVA POSTPAGO",
                    estado: etapaSelect.value || "PENDIENTE",
                    fechaCreacion: new Date().toLocaleDateString('es-ES'),
                    asesor: loggedInUserSpan.textContent || "N/A",
                };
                addOpportunityToTable(oportunidadGenerada);
                showMessage('¡Oportunidad guardada exitosamente!', 'success'); // REEMPLAZO DE ALERT
                generarOportunidadModal.style.display = 'none';
            }
        });
    }

    // --- Función para añadir oportunidad a la tabla de Oportunidades Generadas ---
    function addOpportunityToTable(oportunidad) {
        if (!oportunidadesTableBody) {
            console.error('addOpportunityToTable: Elemento oportunidadesTableBody no encontrado.');
            return;
        }
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${oportunidad.id}</td>
            <td>${oportunidad.campana}</td>
            <td>${oportunidad.estado}</td>
            <td>${oportunidad.fechaCreacion}</td>
            <td>${oportunidad.asesor}</td>
            <td>
                <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                <button class="btn btn-icon"><i class="fas fa-trash"></i></button>
            </td>
        `;
        oportunidadesTableBody.appendChild(newRow);
        console.log('Oportunidad añadida a la tabla:', oportunidad);
    }


    // --- Inicialización al cargar la página ---
    console.log('Configurando estado inicial de pantallas...');
    loginScreen.classList.add('active');
    mainMenuScreen.classList.remove('active');
    console.log('Estado inicial configurado: loginScreen activo, mainMenuScreen inactivo.');

});
