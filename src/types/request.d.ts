import { Recipient } from './recipient.d';
export interface IRequest {
  notary_id: string;
  reasonOfRequest: string;
  requestDate: string;
  requestTime: string;
  requestLocation: string;
  requestMessage: string;
  numOfRecipients: number;
  Recipients: Recipient[];
}

export interface IRequestItem {
  DT_RowIndex: number;
  created_at: Date;
  created_by: number;
  deleted: number;
  draggedElArr: null;
  id: number;
  individual_details: Details;
  lat: null;
  long: null;
  notary_details: Details;
  notary_id: number;
  notary_request_status: number;
  numOfRecipients: number;
  read_status: number;
  reasonOfRequest: string;
  requestDate: string;
  requestLocation: number;
  requestMessage: string;
  requestTime: number;
  request_location_list: RequestLocationList;
  status: number;
  uniqid: null;
  updated_at: Date;
  updated_by: number;
}
export interface Details {
  BannerImage: null | string;
  BioDescription: null | string;
  ProofOfEmployes: number;
  ProofOfEmployesDoc: null | string;
  ShortDescription: null | string;
  about_notary: null;
  account_type: number;
  address1: null | string;
  address2: null | string;
  bussiness_start_up_date: null;
  city: null | string;
  company: null;
  country: null | string;
  created_at: Date;
  created_by: number;
  deleted: number;
  email: string;
  email_verified_at: null;
  first_name: string;
  hired_time: null;
  id: number;
  image: string;
  industry_id: number;
  ip_sign_in: string;
  ip_sign_up: string;
  last_name: string;
  lat: null | string;
  licence_number: null;
  location_sign_in: string;
  location_sign_up: string;
  logged_in: number;
  logged_in_at: Date;
  logged_out_at: Date;
  long: null | string;
  mobile: null;
  name: string;
  notary_document: null | string;
  notary_document_staus: number;
  phone: string;
  profile_photo_url: string;
  sign_up_reasons_id: number;
  state: null | string;
  status: number;
  steps: number;
  trial_account: number;
  trial_account_expired: number;
  updated_at: Date;
  updated_by: number;
  user_type: number;
  verification_code: string;
  verification_code_expire_at: Date;
  verification_date: Date;
  verification_status: number;
  video_call: null;
  zip_code: number;
}

export interface RequestLocationList {
  address: string;
  city: string;
  country: string;
  created_at: Date;
  created_by: number;
  deleted: number;
  id: number;
  lat: string;
  long: string;
  name: string;
  state: string;
  status: number;
  updated_at: Date;
  updated_by: number;
  user_id: number;
  uuid: string;
  zip_code: string;
}
