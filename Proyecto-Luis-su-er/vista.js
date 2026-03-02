// vista.js - Visualización de empresas guardadas en formato TABLA

class VisualizadorEmpresas {
    constructor() {
        this.empresas = this.cargarEmpresas();
        this.cargarCiclos();
        this.initEventos();
        this.mostrarEstadisticas();
        // Mostrar todas las empresas al cargar
        this.mostrarTablaEmpresas(this.empresas);
    }

    // Cargar empresas de localStorage (con ejemplos)
    cargarEmpresas() {
        const empresasGuardadas = localStorage.getItem('empresasPracticas');
        
        if (!empresasGuardadas) {
            const ejemplos = [
                {
                    id: 1001,
                    nombreAlumno: "Ana García López",
                    anoAcademico: "2024-2025",
                    nivelFP: "superior",
                    ciclo: "Mecatrónica Industrial",
                    curso: "2",
                    nombreEmpresa: "Tecnologías Innovadoras SL",
                    cifEmpresa: "B12345678",
                    emailEmpresa: "info@tecnologiasinnovadoras.es",
                    telefonoEmpresa: "961234567",
                    nombreTutorEmpresa: "Carlos Martínez",
                    emailTutorEmpresa: "carlos@tecnologias.es",
                    fechaRegistro: "15/01/2025"
                },
                {
                    id: 1002,
                    nombreAlumno: "Pascual Pérez Ruiz",
                    anoAcademico: "2024-2025",
                    nivelFP: "medio",
                    ciclo: "Sistemas Microinformáticos y Redes",
                    curso: "1",
                    nombreEmpresa: "Informática Alzira SL",
                    cifEmpresa: "B87654321",
                    emailEmpresa: "contacto@informatica-alzira.es",
                    telefonoEmpresa: "962345678",
                    nombreTutorEmpresa: "María Ferrando",
                    emailTutorEmpresa: "maria@informatica-alzira.es",
                    fechaRegistro: "16/01/2025"
                },
                {
                    id: 1003,
                    nombreAlumno: "Laura Martínez Conejero",
                    anoAcademico: "2024-2025",
                    nivelFP: "basica",
                    ciclo: "Informática y Comunicaciones",
                    curso: "2",
                    nombreEmpresa: "Soluciones Informáticas SL",
                    cifEmpresa: "B98765432",
                    emailEmpresa: "info@solucionesinformaticas.es",
                    telefonoEmpresa: "963456789",
                    nombreTutorEmpresa: "Antonio Gómez",
                    emailTutorEmpresa: "antonio@solucionesinformaticas.es",
                    fechaRegistro: "17/01/2025"
                },
                {
                    id: 1004,
                    nombreAlumno: "Carlos Ruiz Martínez",
                    anoAcademico: "2024-2025",
                    nivelFP: "superior",
                    ciclo: "Energías Renovables",
                    curso: "2",
                    nombreEmpresa: "Energía Verde Valencia SL",
                    cifEmpresa: "B11223344",
                    emailEmpresa: "info@energiaverdevalencia.es",
                    telefonoEmpresa: "964567890",
                    nombreTutorEmpresa: "Patricia Sánchez",
                    emailTutorEmpresa: "patricia@energiaverde.es",
                    fechaRegistro: "18/01/2025"
                },
                {
                    id: 1005,
                    nombreAlumno: "Marta Fernández Catalán",
                    anoAcademico: "2023-2024",
                    nivelFP: "medio",
                    ciclo: "Instalaciones de Telecomunicaciones",
                    curso: "2",
                    nombreEmpresa: "Telecomunicaciones Ribera SL",
                    cifEmpresa: "B55667788",
                    emailEmpresa: "info@telecomunicacionesribera.es",
                    telefonoEmpresa: "965678901",
                    nombreTutorEmpresa: "Javier Soler",
                    emailTutorEmpresa: "javier@telecomunicaciones.es",
                    fechaRegistro: "10/06/2024"
                }
            ];
            
            localStorage.setItem('empresasPracticas', JSON.stringify(ejemplos));
            return ejemplos;
        }
        
        return JSON.parse(empresasGuardadas);
    }

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

    initEventos() {
        document.getElementById('filtroNivel').addEventListener('change', (e) => {
            this.actualizarSelectorCiclos(e.target.value);
        });

        document.getElementById('btnAplicarFiltros').addEventListener('click', () => {
            this.aplicarFiltros();
        });

        document.getElementById('btnLimpiarFiltros').addEventListener('click', () => {
            this.limpiarFiltros();
        });

        document.getElementById('filtroCurso').addEventListener('change', () => {
            this.aplicarFiltros();
        });
    }

    actualizarSelectorCiclos(nivel) {
        const selectCiclo = document.getElementById('filtroCiclo');
        selectCiclo.innerHTML = '<option value="">Todos los ciclos</option>';
        
        if (nivel && this.ciclos[nivel]) {
            this.ciclos[nivel].forEach(ciclo => {
                const option = document.createElement('option');
                option.value = ciclo;
                option.textContent = ciclo;
                selectCiclo.appendChild(option);
            });
        }
    }

    limpiarFiltros() {
        document.getElementById('filtroNivel').value = '';
        document.getElementById('filtroCiclo').innerHTML = '<option value="">Todos los ciclos</option>';
        document.getElementById('filtroCurso').value = '';
        this.mostrarTablaEmpresas(this.empresas);
    }

    aplicarFiltros() {
        const nivel = document.getElementById('filtroNivel').value;
        const ciclo = document.getElementById('filtroCiclo').value;
        const curso = document.getElementById('filtroCurso').value;

        const empresasFiltradas = this.getEmpresasFiltradas(nivel, ciclo, curso);
        this.mostrarTablaEmpresas(empresasFiltradas);
    }

    getEmpresasFiltradas(nivel, ciclo, curso) {
        return this.empresas.filter(empresa => {
            if (nivel && empresa.nivelFP !== nivel) return false;
            if (ciclo && empresa.ciclo !== ciclo) return false;
            if (curso && empresa.curso !== curso) return false;
            return true;
        });
    }

    // NUEVO: Mostrar empresas en formato TABLA
    mostrarTablaEmpresas(empresas) {
        const container = document.getElementById('empresasContainer');
        
        if (empresas.length === 0) {
            container.innerHTML = `
                <div class="sin-empresas">
                    <p>📋 No hay empresas registradas para estos filtros</p>
                    <p style="font-size: 14px; margin-top: 10px; color: #8B1E1E;">
                        <a href="formulario.html" style="color: #8B1E1E; font-weight: 600;">→ Ir al formulario para añadir empresas</a>
                    </p>
                </div>
            `;
            return;
        }

        let html = `
            <div class="tabla-container">
                <table class="empresas-tabla">
                    <thead>
                        <tr>
                            <th>Alumno</th>
                            <th>Empresa</th>
                            <th>CIF</th>
                            <th>Ciclo</th>
                            <th>Curso</th>
                            <th>Nivel</th>
                            <th>Año</th>
                            <th>Contacto Empresa</th>
                            <th>Tutor Empresa</th>
                            <th>Email Tutor</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        empresas.forEach(empresa => {
            html += `
                <tr>
                    <td>${empresa.nombreAlumno || '-'}</td>
                    <td><strong>${empresa.nombreEmpresa || '-'}</strong></td>
                    <td>${empresa.cifEmpresa || '-'}</td>
                    <td>${empresa.ciclo || '-'}</td>
                    <td>${empresa.curso || '-'}º</td>
                    <td>${this.getNombreNivel(empresa.nivelFP)}</td>
                    <td>${empresa.anoAcademico || '-'}</td>
                    <td>
                        ${empresa.emailEmpresa ? `<a href="mailto:${empresa.emailEmpresa}">📧</a> ` : ''}
                        ${empresa.telefonoEmpresa ? `📞 ${empresa.telefonoEmpresa}` : ''}
                    </td>
                    <td>${empresa.nombreTutorEmpresa || '-'}</td>
                    <td>${empresa.emailTutorEmpresa ? `<a href="mailto:${empresa.emailTutorEmpresa}">${empresa.emailTutorEmpresa}</a>` : '-'}</td>
                    <td>${empresa.fechaRegistro || '-'}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        container.innerHTML = html;
    }

    getNombreNivel(nivel) {
        const niveles = {
            'basica': 'FP Básica',
            'medio': 'Grado Medio',
            'superior': 'Grado Superior'
        };
        return niveles[nivel] || nivel;
    }

    mostrarEstadisticas() {
        const container = document.getElementById('estadisticasContainer');
        
        if (this.empresas.length === 0) {
            container.style.display = 'none';
            return;
        }

        const totalEmpresas = this.empresas.length;
        const empresasPorNivel = {
            basica: this.empresas.filter(e => e.nivelFP === 'basica').length,
            medio: this.empresas.filter(e => e.nivelFP === 'medio').length,
            superior: this.empresas.filter(e => e.nivelFP === 'superior').length
        };

        container.style.display = 'block';
        container.innerHTML = `
            <h3 class="estadisticas-titulo">📊 Estadísticas</h3>
            <div class="estadisticas-grid">
                <div class="estadistica-item">
                    <span class="estadistica-numero">${totalEmpresas}</span>
                    <span class="estadistica-label">Total empresas</span>
                </div>
                <div class="estadistica-item">
                    <span class="estadistica-numero">${empresasPorNivel.basica}</span>
                    <span class="estadistica-label">FP Básica</span>
                </div>
                <div class="estadistica-item">
                    <span class="estadistica-numero">${empresasPorNivel.medio}</span>
                    <span class="estadistica-label">Grado Medio</span>
                </div>
                <div class="estadistica-item">
                    <span class="estadistica-numero">${empresasPorNivel.superior}</span>
                    <span class="estadistica-label">Grado Superior</span>
                </div>
            </div>
        `;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new VisualizadorEmpresas();
});