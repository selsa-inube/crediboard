export const props = {
    title: {
      control: {
        type: 'text',
      },
      description: 'Título del modal',
      defaultValue: 'Confirma los datos del usuario',
    },
    buttonText: {
      control: {
        type: 'text',
      },
      description: 'Texto del botón',
      defaultValue: 'Enviar',
    },
    portalId: {
      control: {
        type: 'text',
      },
      description: 'ID del portal donde se renderiza el modal',
      defaultValue: 'portal',
    },
    formValues: {
      control: {
        type: 'object',
      },
      description: 'Valores del formulario',
      defaultValue: {
        field1: 'usuario@inube.com',
        field2: '3122638128',
        field3: '3122638128',
      },
    },
    handleClose: {
      action: 'handleClose',
      description: 'Función para manejar el cierre del modal',
    },
  };
  