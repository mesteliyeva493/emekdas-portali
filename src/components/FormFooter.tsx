import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { X, Save, Check, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import type { EmployeeFormValues } from "../schemas/employeeSchema";
import { employeeService } from "../services/employee.service";
import toast from "react-hot-toast";

function FormFooter() {
  const { handleSubmit, reset, getValues } =
    useFormContext<EmployeeFormValues>();

  const [loading, setLoading] = useState(false);

  const onSaveDraft = async () => {
    setLoading(true);
    try {
      const values = getValues();
      await employeeService.saveDraft(values);
      toast.success("Draft uğurla yadda saxlanıldı");
    } catch (error) {
      console.error(error);
      toast.error("Draft yadda saxlanılmadı");
    } finally {
      setLoading(false);
    }
  };

  const onConfirm = async (data: EmployeeFormValues) => {
      console.log(data);
  console.log(data.employmentHistory);
  console.log(
  JSON.stringify(data)
);

    try {
      setLoading(true);

      await employeeService.createEmployee(data);

      toast.success("Əməkdaş uğurla əlavə edildi");

      reset();
    } catch (error) {
      console.error(error);
      toast.error("Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = () => {
    toast.error("Zəhmət olmasa bütün mütləq sahələri düzgün doldurun");
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-neutral-100 p-6 flex justify-end items-center gap-4 mt-10">
      <Button
        type="button"
        variant="ghost"
        onClick={() => reset()}
        disabled={loading}
        className="text-red-500 hover:bg-red-50 hover:text-red-600"
      >
        <X className="w-4 h-4 mr-2" />
        Ləğv et
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onSaveDraft}
        disabled={loading}
        className="border-neutral-200 text-neutral-600"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Save className="w-4 h-4 mr-2" />
        )}
        Yadda saxla
      </Button>

      <Button
        type="button"
        onClick={handleSubmit(onConfirm, onInvalid)}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Check className="w-4 h-4 mr-2" />
        )}
        Əməkdaşı təsdiqlə
      </Button>
    </div>
  );
}

export default FormFooter;