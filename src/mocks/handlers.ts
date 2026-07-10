import { http, HttpResponse } from "msw";
import { employees } from "../data/employees";
import { drafts } from "../data/drafts";
import {
  cities,
  genders,
  idSeries,
  maritalStatuses,
  nationalities,
  citizenships,
  documentIssuers,
  phonePrefixes,
  organizations,
  structuralUnits,
  positions,
  jobTypes,
  governmentEmployeeOptions,
  terminationReasons,
} from "../data/lookups";

export const handlers = [
  http.get("/api/cities", () => {
    return HttpResponse.json(cities);
  }),

  http.get("/api/genders", () => {
    return HttpResponse.json(genders);
  }),

  http.get("/api/id-series", () => {
    return HttpResponse.json(idSeries);
  }),
  http.get("/api/marital-statuses", () => {
    return HttpResponse.json(maritalStatuses);
  }),

  http.get("/api/nationalities", () => {
    return HttpResponse.json(nationalities);
  }),
  http.get("/api/citizenships", () => {
    return HttpResponse.json(citizenships);
  }),
  http.get("/api/document-issuers", () => {
    return HttpResponse.json(documentIssuers);
  }),
  http.get("/api/phone-prefixes", () => {
    return HttpResponse.json(phonePrefixes);
  }),
  http.get("/api/organizations", () => {
    return HttpResponse.json(organizations);
  }),
  http.get("/api/structural-units", () => {
    return HttpResponse.json(structuralUnits);
  }),
  http.get("/api/positions", () => {
    return HttpResponse.json(positions);
  }),
  http.get("/api/job-types", () => {
    return HttpResponse.json(jobTypes);
  }),
  http.get("/api/government-employee-options", () => {
    return HttpResponse.json(governmentEmployeeOptions);
  }),
  http.get("/api/termination-reasons", () => {
    return HttpResponse.json(terminationReasons);
  }),

  http.post("/api/employees", async ({ request }) => {
    const body = await request.json();

    employees.push(body);

    return HttpResponse.json(
      {
        success: true,
        message: "Employee successfully created.",
        data: body,
      },
      { status: 201 },
    );
  }),

  http.get("/api/employees", () => {
    return HttpResponse.json(employees);
  }),

  http.get("/api/employees/:id", ({ params }) => {
    const id = Number(params.id);

    const employee = employees[id];

    if (!employee) {
      return HttpResponse.json(
        { message: "Employee not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(employee);
  }),

  http.put("/api/employees/:id", async ({ params, request }) => {
    const id = Number(params.id);

    const body = await request.json();

    employees[id] = body;

    return HttpResponse.json({
      success: true,
      message: "Employee updated.",
      data: body,
    });
  }),

  http.delete("/api/employees/:id", ({ params }) => {
    const id = Number(params.id);

    employees.splice(id, 1);

    return HttpResponse.json({
      success: true,
      message: "Employee deleted.",
    });
  }),

  http.post("/api/employees/draft", async ({ request }) => {
    const body = await request.json();

    drafts.push(body);

    return HttpResponse.json(
      {
        success: true,
        message: "Draft successfully saved.",
        draftId: drafts.length - 1,
        data: body,
      },
      { status: 201 },
    );
  }),

  http.get("/api/employees/draft", () => {
    return HttpResponse.json(drafts);
  }),
];