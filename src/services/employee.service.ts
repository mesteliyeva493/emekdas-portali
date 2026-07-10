import { axiosInstance } from "../api/axios";
import type { EmployeeFormValues } from "../schemas/employeeSchema";

class EmployeeService {
  async createEmployee(data: EmployeeFormValues) {
    const response = await axiosInstance.post("/api/employees", data);
    return response.data;
  }

  async saveDraft(data: Partial<EmployeeFormValues>) {
    const response = await axiosInstance.post("/api/employees/draft", data);
    return response.data;
  }

  async getEmployees() {
    const response = await axiosInstance.get("/api/employees");
    return response.data;
  }

  async getEmployee(id: number) {
    const response = await axiosInstance.get(`/api/employees/${id}`);
    return response.data;
  }

  async updateEmployee(id: number, data: EmployeeFormValues) {
    const response = await axiosInstance.put(`/api/employees/${id}`, data);
    return response.data;
  }

  async deleteEmployee(id: number) {
    const response = await axiosInstance.delete(`/api/employees/${id}`);
    return response.data;
  }
}

export const employeeService = new EmployeeService();