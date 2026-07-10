import React from "react";
import { useForm, FormProvider, Form } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeSchema } from "./schemas/employeeSchema";
import type { EmployeeFormValues } from "./schemas/employeeSchema";
import PersonalInfo from "./components/PersonalInfo";
import ContactInfo from "./components/ContactInfo";
import EmploymentHistory from "./components/EmploymentHistory";
import FormFooter from "./components/FormFooter";

function App() {
  const methods = useForm<EmployeeFormValues>({
    resolver: yupResolver(employeeSchema),
    mode: "onChange",
  });

  const onSubmit = (data: EmployeeFormValues) => {
    console.log("Uğurla toplanan məlumatlar:", data);
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-neutral-50 p-8 flex flex-col items-center">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full max-w-4xl"
        >
          <PersonalInfo />
          <ContactInfo />
          <EmploymentHistory />
          <FormFooter />
        </form>
      </div>
    </FormProvider>
  );
}

export default App;
