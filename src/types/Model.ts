export interface Model {
    job_id:string;
    model_name: string;
    model_type:string;
    model_version:number;
    num_categorical:number;
    num_continuous:number;
    pk:string;
    sk:string;
    ts_end:number;
    ts_start:number;
    ts_updated:number;
  }

  export type ModelWithoutPk = Omit<Model, 'pk'>