import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/f',
    component: () => import('layouts/FatigaLayout.vue'),
    children: [
      { path: 'fatiga', component: () => import('src/pages/fatiga/FatigaOnly.vue') },
      {
        path: 'registro',
        component: () => import('src/pages/fatiga/RegistroOnly.vue')
      },
      {
        path: 'politica',
        component: () => import('src/pages/fatiga/PoliticaOnly.vue')
      },
      {
        path: 'servicio',
        component: () => import('src/pages/fatiga/ServicioOnly.vue')
      },
      {
        path: 'ingreso',
        component: () => import('pages/fatiga/IngresoV2.vue')
      },
      {
        path: 'inicio',
        component: () => import('src/pages/fatiga/FatigaInicio.vue'),
        meta: { no_auth: true }
      },
      {
        path: 'home',
        component: () => import('src/pages/fatiga/HomeOnly.vue'),
        meta: { no_auth: true }
      },
      {
        path: 'index',
        component: () => import('pages/fatiga/IndexPage.vue'),
        meta: { no_auth: true }
      },
      {
        path: 'auth/check',
        component: () => import('src/pages/fatiga/CheckOnly.vue'),
        meta: { no_auth: true }
      },
      {
        path: 'operador',
        component: () => import('src/pages/fatiga/OperadorOnly.vue')
      },
      {
        path: 'auth/list',
        component: () => import('pages/fatiga/AuthList.vue')
      },
      { path: 'day/:fecha', component: () => import('src/pages/fatiga/DayOnly.vue') }
    ],
    meta: {
      guest: true
    }
  },
  {
    path: '/p',
    component: () => import('layouts/PersonaLayout.vue'),
    children: [
      { path: 'auth', component: () => import('src/pages/fatiga/AuthOnly.vue') },
      { path: 'datos/:dni', component: () => import('src/pages/fatiga/DatosOnly.vue') }
    ],
    meta: {
      guest: true
    }
  },
  {
    path: '/capa',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      footer: [
        {
          to: '/capa/admin',
          label: 'Admin',
          icon: 'o_home'
        },
        {
          to: '/capa/cursos',
          label: 'Cursos',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/capa/certificado',
          label: 'Diseño',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      { path: 'admin', component: () => import('src/pages/capa/CapaAdmin.vue') },
      { path: 'cursos', component: () => import('src/pages/capa/CapaCursos.vue') },
      { path: 'certificado', component: () => import('src/pages/capa/CapaCertificado.vue') },
      { path: 'home', component: () => import('src/pages/capa/CapaHome.vue') }
    ]
  },
  {
    path: '/oper/racs',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      footer: [
        {
          to: '/oper/racs/home',
          label: 'Home',
          icon: 'o_home'
        },
        {
          to: '/oper/racs/seguimiento',
          label: 'Seguimiento',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/oper/racs/pendientes',
          label: 'Pendientes',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/oper/racs/levantados',
          label: 'Levantados',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: 'store',
        component: () => import('pages/oper/OperRacsEdit.vue')
      },
      {
        path: 'seguimiento',
        component: () => import('pages/oper/coms/RacsList.vue'),
        props: { tipo: 'seguimiento' },
        meta: { title: 'Seguimiento' }
      },
      {
        path: 'pendientes',
        component: () => import('pages/oper/coms/RacsList.vue'),
        props: { tipo: 'pendientes' },
        meta: { title: 'Pendientes' }
      },
      {
        path: 'levantados',
        component: () => import('pages/oper/coms/RacsList.vue'),
        props: { tipo: 'levantados' },
        meta: { title: 'Levantados' }
      },
      {
        path: 'home',
        component: () => import('pages/oper/OperIndex.vue')
      }
    ]
  },

  {
    path: '/iai',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      footers: [
        {
          to: '/iai/home',
          label: 'Ultimos',
          icon: 'o_home'
        },
        {
          to: '/iai/mensual',
          label: 'Por Mes',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: 'home',
        component: () => import('pages/iai/IAIHomeV2.vue'),
        meta: {
          title: 'Accidentes',
          btn: { icon: 'o_add', label: 'Crear', to: '/iai/nuevo' }
        }
      },
      {
        path: 'nuevo',
        component: () => import('pages/iai/AccidenteEditar.vue')
      },
      {
        path: 'editar/:id',
        component: () => import('pages/iai/AccidenteEditar.vue')
      },
      {
        path: 'mes',
        component: () => import('pages/iai/AccidenteList.vue')
      }
    ]
  },

  {
    path: '/perfil',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/perfil/PerfilIndex.vue'),
        meta: { title: 'Perfil' }
      }
    ]
  },

  {
    path: '/oper/petar',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      footer: [
        {
          to: '/oper/petar',
          label: 'Home',
          icon: 'o_home'
        },
        {
          to: '/oper/petar/archivo',
          label: 'Archivo',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: '',
        component: () => import('pages/petar/PetarIndex.vue'),
        meta: {
          title: 'Petar',
          btn: { label: 'Nuevo', icon: 'o_save', to: '/oper/petar/edit' }
        }
      },
      {
        path: 'edit',
        component: () => import('pages/petar/PetarEdit.vue'),
        meta: {
          title: 'Editar Petar',
          btn: { label: 'Guardar', icon: 'o_save', method: 'guardar' }
        }
      }
    ]
  },
  {
    path: '/infra',
    component: () => import('layouts/MainLayout.vue'),
    meta: {},
    children: [
      {
        path: '',
        component: () => import('pages/infra/InfraIndex.vue')
      },
      {
        path: ':item',
        component: () => import('pages/infra/MxInfraList.vue')
      }
    ]
  },

  {
    path: '/oper/personal',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      footer: [
        {
          to: '/oper/personal',
          label: 'Home',
          icon: 'o_home'
        },
        {
          to: '/oper/personal/cargos',
          label: 'Cargos',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/oper/personal/pendientes',
          label: 'Area',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/oper/personal/emos',
          label: 'Emos',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: '',
        component: () => import('pages/personal/PersonalIndex.vue')
      }
    ]
  },

  {
    path: '/oper/veo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/veo/VeoIndex.vue')
      },
      {
        path: 'item',
        component: () => import('pages/veo/VeoItem.vue')
      }
    ]
  },

  {
    path: '/info/directorio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/info/InfoDirectorio.vue')
      }
    ]
  },

  {
    path: '/sso/veo',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      footer: [
        {
          to: '/sso/veo',
          label: 'Cuerpos',
          icon: 'o_home'
        },
        {
          to: '/sso/veo/vetas',
          label: 'Vetas',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/sso/veo/params',
          label: 'Ajustes',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: '',
        component: () => import('pages/veo/coms/MxVeoList.vue'),
        props: { zona: 'cuerpos' }
      },
      {
        path: 'vetas',
        component: () => import('pages/veo/coms/MxVeoList.vue'),
        props: { zona: 'vetas' }
      },
      {
        path: 'edit',
        component: () => import('pages/veo/SsoVeoEdit.vue')
      }
    ]
  },
  {
    path: '/plano',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/plano/cuerpos',
    meta: {
      footer: [
        {
          to: '/plano/cuerpos',
          label: 'Cuerpos',
          icon: 'o_home'
        },
        {
          to: '/plano/vetas',
          label: 'Vetas',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: 'cuerpos',
        component: () => import('pages/sistema/ComDoc.vue'),
        props: { base: 'plano', tag: 'cuerpos' }
      },
      {
        path: 'vetas',
        component: () => import('pages/sistema/ComDoc.vue'),
        props: { base: 'plano', tag: 'vetas' }
      }
    ]
  },

  {
    path: '/panel',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/panel/pets',
    meta: {
      footer: [
        {
          to: '/panel/pets',
          label: 'Pets',
          icon: 'o_home'
        },
        {
          to: '/panel/estandar',
          label: 'Estandar',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/panel/msds',
          label: 'Msds',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/panel/panel',
          label: 'Panel',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: 'pets',
        component: () => import('pages/sistema/ComDoc.vue'),
        props: { base: 'pets' }
      },
      {
        path: 'estandar',
        component: () => import('pages/sistema/ComDoc.vue'),
        props: { base: 'estandar' }
      },
      {
        path: 'msds',
        component: () => import('pages/sistema/ComDoc.vue'),
        props: { base: 'sig', tag: 'msds' }
      },
      {
        path: 'panel',
        component: () => import('pages/sistema/ComDoc.vue'),
        props: { base: 'sig', tag: 'panel' }
      }
    ]
  },
  {
    path: '/fatiga/admin',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/fatiga/admin/dashboard',
    meta: {
      footer: [
        {
          to: '/fatiga/admin/dashboard',
          label: 'Resumen',
          icon: 'o_home'
        },
        {
          to: '/fatiga/admin/personal',
          label: 'Personal',
          icon: 'o_person'
        },
        {
          to: '/fatiga/admin/a',
          label: 'A',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/fatiga/admin/b',
          label: 'B',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/fatiga/admin/c',
          label: 'C',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/fatiga/FatigaDashboard.vue'),
        props: { scope: 'personal' }
      },
      {
        path: 'personal',
        component: () => import('src/pages/fatiga/FatigaAdmin.vue'),
        props: { scope: 'personal' }
      },
      {
        path: 'a',
        component: () => import('src/pages/fatiga/FatigaAdmin.vue'),
        props: { scope: 'A' }
      },
      {
        path: 'b',
        component: () => import('src/pages/fatiga/FatigaAdmin.vue'),
        props: { scope: 'B' }
      },
      {
        path: 'c',
        component: () => import('src/pages/fatiga/FatigaAdmin.vue'),
        props: { scope: 'C' }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/admin/home',
    meta: {
      footer: [
        {
          to: '/admin/home',
          label: 'Home',
          icon: 'o_home'
        },
        {
          to: '/admin/usuario',
          label: 'Usuario',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: '/admin/usuario',
        component: () => import('pages/admin/AdminUsuario.vue')
      },
      {
        path: '/admin/home',
        component: () => import('pages/admin/AdminHome.vue')
      }
    ]
  },
  {
    path: '/mailer',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/mailer/home',
    meta: {
      footer: [
        {
          to: '/mailer/home',
          label: 'Home',
          icon: 'o_home'
        },
        {
          to: '/mailer/setting',
          label: 'configuración',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: 'home',
        component: () => import('pages/mailer/MailerHome.vue')
      },
      {
        path: 'setting',
        component: () => import('pages/mailer/MailerSetting.vue')
      }
    ]
  },
  {
    path: '/fatiga/supervisor',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/fatiga/supervisor/dashboard',
    meta: {
      footer: [
        {
          to: '/fatiga/supervisor/dashboard',
          label: 'Dashboard',
          icon: 'o_home'
        },
        {
          to: '/fatiga/supervisor/personal',
          label: 'Personal',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/fatiga/supervisor/a',
          label: 'A',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/fatiga/supervisor/b',
          label: 'B',
          icon: 'o_perm_contact_calendar'
        },
        {
          to: '/fatiga/supervisor/c',
          label: 'C',
          icon: 'o_perm_contact_calendar'
        }
      ]
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/fatiga/FatigaSuperDashboard.vue'),
        props: { scope: 'dashboard' }
      },
      {
        path: 'personal',
        component: () => import('src/pages/fatiga/FatigaSupervisor.vue'),
        props: { scope: 'personal' }
      },
      {
        path: 'a',
        component: () => import('src/pages/fatiga/FatigaSupervisor.vue'),
        props: { scope: 'A' }
      },
      {
        path: 'b',
        component: () => import('src/pages/fatiga/FatigaSupervisor.vue'),
        props: { scope: 'B' }
      },
      {
        path: 'c',
        component: () => import('src/pages/fatiga/FatigaSupervisor.vue'),
        props: { scope: 'C' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/postulante/home',
        component: () => import('src/pages/postulante/PostulantesOnly.vue')
      },
      {
        path: '/postulante/nuevo',
        component: () => import('pages/postulante/PostulanteEditar.vue')
      },
      {
        path: '/postulante/editar/:id',
        component: () => import('pages/postulante/PostulanteEditar.vue')
      },
      {
        path: '/postulante/ver/:id',
        component: () => import('pages/postulante/PostulanteVer.vue')
      },
      {
        path: '/tormenta/home',
        component: () => import('pages/tormenta/TormentaHome.vue')
      },
      // { path: '/planos/home', component: () => import('pages/sistema/PlanosHome.vue') },
      {
        path: '/doc/:base',
        component: () => import('pages/sistema/ComDoc.vue'),
        props: true
      },
      {
        path: '/doc/:base/:tag',
        component: () => import('pages/sistema/ComDoc.vue'),
        props: true
      },
      {
        path: '/fotocheck/home',
        component: () => import('pages/fotocheck/FotocheckHome.vue')
      },
      {
        path: '/fotocheck/lector',
        component: () => import('pages/fotocheck/FotocheckLector.vue')
      },
      {
        path: '/fotocheck/query',
        component: () => import('pages/fotocheck/FotocheckQuery.vue')
      },
      {
        path: '/fotocheck/registro/:uuid',
        component: () => import('pages/fotocheck/FotocheckRegistro.vue')
      },

      {
        path: '/fatiga/home',
        component: () => import('src/pages/fatiga/FatigaOnly.vue')
      },
      // {
      //   path: "/fatiga/admin",
      //   component: () => import("pages/fatiga/Admin.vue"),
      // },
      {
        path: '/fatiga/reporte',
        component: () => import('pages/fatiga/ReporteV2.vue')
      },
      {
        path: '/fatiga/operador/:dni',
        component: () => import('pages/fatiga/S-Operador.vue')
      },
      {
        path: '/fatiga/operador/:dni/:fecha',
        component: () => import('pages/fatiga/S-Day.vue')
      },
      {
        path: '/fatiga/operador/:dni/:fecha/ingreso',
        component: () => import('pages/fatiga/S-Ingreso.vue')
      },
      {
        path: '/fatiga/item/:dni/:id/ingreso',
        component: () => import('pages/fatiga/S-Ingreso.vue')
      },
      {
        path: '/rrhh/personal',
        component: () => import('src/pages/rrhh/MxPersonal.vue')
      },
      // INSPEC: Formularios para el reporte de inspectores
      {
        path: '/inspec/home',
        component: () => import('src/pages/inspec/InspecHome.vue')
      },
      {
        path: '/inspec/day/:zona/:turno/:fecha',
        component: () => import('src/pages/inspec/InspecReporte.vue')
      },
      {
        path: '/inspec/nivel',
        component: () => import('src/pages/inspec/InspecReporte.vue')
      },
      {
        path: '/inspec/area',
        component: () => import('src/pages/inspec/InspecReporte.vue')
      },
      {
        path: '/inspec/obs/edit/:id',
        component: () => import('pages/inspec/ObservacionEdit.vue')
      },
      {
        path: '/inspec/obs/new',
        component: () => import('pages/inspec/ObservacionEdit.vue')
      },
      {
        path: '/oper/obs/new',
        component: () => import('pages/inspec/ObservacionEdit.vue')
      },
      {
        path: '/inspec/super/home',
        component: () => import('pages/inspec/HomeOperacion.vue')
      },
      { path: '/', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/registro',
    component: () => import('src/pages/login/MxRegistro.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    component: () => import('src/pages/login/MxLogin.vue'),
    name: 'Login',
    meta: {
      guest: true
    }
  },
  {
    path: '/rescue',
    component: () => import('src/pages/login/MxRescue.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/logout',
    component: () => import('src/pages/login/MxLogout.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/rescue/:email/:code',
    component: () => import('src/pages/login/MxRescueCode.vue'),
    meta: {
      guest: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/PageError404.vue'),
    meta: {
      guest: true
    }
  }
]

export default routes
