export interface FormValues {
    field1: number;
    field2: number;
  }
  
  export interface Option {
    id: string;
    label: string;
    value: string;
  }
  
  export interface AddSeriesModalProps {
    title: string;
    handleClose: () => void;
    onSubmit: () => void;
    buttonText: string;
    secondButtonText: string;
    portalId?: string;
    formValues: FormValues;
    paymentMethodOptions: Option[];
    frequencyOptions: Option[];
  }
  
  export interface FormState {
    paymentMethod: string;
    frequency: string;
    field1: string;
    field2: string;
    date: string; 
  }
  