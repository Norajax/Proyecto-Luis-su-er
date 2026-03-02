// form.js - Formulario para guardar empresas

class GestorEmpresas {
    constructor() {
        this.empresas = this.cargarEmpresas();
        this.initEventos();
        this.cargarCiclos();
    }

    // Cargar empresas de localStorage
    cargarEmpresas() {
        const empresasGuardadas = localStorage.getItem('empresasPracticas');
        return empresasGuardadas ? JSON.parse(empresasGuardadas) : [];
    }

    // Guardar empresas en localStorage
    guardarEmpresas() {
        localStorage.setItem('empresasPracticas', JSON.stringify(this.empresas));
    }

    // Añadir nueva empresa
    añadirEmpresa(empresa) {
        empresa.id = Date.now();
        empresa.fechaRegistro = new Date().toLocaleDateString('es-ES');
        this.empresas.push(empresa);
        this.guardarEmpresas();
        this.mostrarNotificacion('Empresa guardada correctamente', 'exito');
    }

    // Cargar ciclos disponibles
    cargarCiclos() {
        this.ciclos = {
            basica: [
                'Informática y Comunicaciones',
                'Instalaciones Electrotécnicas y Mecánica',
                'Fabricación y Montaje',
                'Electricidad y Electrónica'
            ],
            medio: [
                'Sistemas Microinformáticos y Redes',
                'Gestión Administrativa',
                'Instalaciones de Telecomunicaciones',
                'Actividades Comerciales',
                'Mantenimiento Electromecánico',
                'Instalaciones de Producción de Calor',
                'Instalaciones Frigoríficas y de Climatización'
            ],
            superior: [
                'Mecatrónica Industrial',
                'Prevención de Riesgos profesionales',
                'Administración y Finanzas',
                'Transporte y Logística',
                'Mantenimiento Electrónico',
                'Energías Renovables',
                'Comercio Internacional',
                'Asistencia a la Dirección'
            ]
        };
    }

    // Inicializar eventos
    initEventos() {
        // Selector de nivel para cargar ciclos
        document.getElementById('nivelFP').addEventListener('change', (e) => {
            this.cargarCiclosPorNivel(e.target.value, 'ciclo');
        });

        // Formulario
        document.getElementById('empresaForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.guardarFormulario();
        });
    }

    // Cargar ciclos por nivel en el formulario principal
    cargarCiclosPorNivel(nivel, targetId) {
        const selectCiclo = document.getElementById(targetId);
        selectCiclo.innerHTML = '<option value="">Selecciona un ciclo</option>';
        
        if (nivel && this.ciclos[nivel]) {
            this.ciclos[nivel].forEach(ciclo => {
                const option = document.createElement('option');
                option.value = ciclo;
                option.textContent = ciclo;
                selectCiclo.appendChild(option);
            });
        }
    }

    // Guardar datos del formulario
    guardarFormulario() {
        const formData = new FormData(document.getElementById('empresaForm'));
        const empresa = {};
        
        for (let [key, value] of formData.entries()) {
            empresa[key] = value;
        }

        this.añadirEmpresa(empresa);
        document.getElementById('empresaForm').reset();
    }

    // Mostrar notificación
    mostrarNotificacion(mensaje, tipo) {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.innerHTML = `
            <span>${tipo === 'exito' ? '✅' : '❌'}</span>
            <p>${mensaje}</p>
        `;
        
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${tipo === 'exito' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GestorEmpresas();
});