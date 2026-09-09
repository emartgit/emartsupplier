export interface OutletCodes {
  bk: string;   // Emart (Batu Kawa) Sdn Bhd
  sbk: string;  // Emart Property (Batu Kawa) Sdn Bhd
  ri: string;   // Emart (Riam) Sdn Bhd
  sri: string;  // Emart Realty (Riam) Sdn Bhd
  bt: string;   // Emart (Bintulu) Sdn Bhd
  sbu: string;  // Emart Realty (Bintulu) Sdn Bhd
}

export interface SubmitPayload extends OutletCodes {
  supplier: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const OUTLET_FIELDS: { key: keyof OutletCodes; label: string }[] = [
  { key: 'bk',  label: 'Emart (Batu Kawa) Sdn Bhd' },
  { key: 'sbk', label: 'Emart Property (Batu Kawa) Sdn Bhd' },
  { key: 'ri',  label: 'Emart (Riam) Sdn Bhd' },
  { key: 'sri', label: 'Emart Realty (Riam) Sdn Bhd' },
  { key: 'bt',  label: 'Emart (Bintulu) Sdn Bhd' },
  { key: 'sbu', label: 'Emart Realty (Bintulu) Sdn Bhd' },
];
