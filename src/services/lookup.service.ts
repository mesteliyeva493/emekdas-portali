import type { Option } from "../types/lookup";
import { axiosInstance } from "../api/axios";

class LookupService {
  async getCities(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/cities");
    return data;
  }

  async getGenders(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/genders");
    return data;
  }

  async getIdSeries(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/id-series");
    return data;
  }

  async getMaritalStatuses(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/marital-statuses");
    return data;
  }

  async getNationalities(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/nationalities");
    return data;
  }

  async getCitizenships(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/citizenships");
    return data;
  }

  async getDocumentIssuers(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/document-issuers");
    return data;
  }

  async getPhonePrefixes(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/phone-prefixes");
    return data;
  }

  async getOrganizations(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/organizations");
    return data;
  }

  async getStructuralUnits(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/structural-units");
    return data;
  }

  async getPositions(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/positions");
    return data;
  }

  async getJobTypes(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/job-types");
    return data;
  }

  async getGovernmentEmployeeOptions(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/government-employee-options");
    return data;
  }

  async getTerminationReasons(): Promise<Option[]> {
    const { data } = await axiosInstance.get<Option[]>("/api/termination-reasons");
    return data;
  }
}

export const lookupService = new LookupService();