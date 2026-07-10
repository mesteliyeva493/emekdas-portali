import React, { useEffect, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  Trash2,
  Plus,
  GraduationCap,
  GraduationCapIcon,
  Wallet,
} from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import type { Option } from "../types/lookup";
import { lookupService } from "../services/lookup.service";

function EmploymentHistory() {
  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employmentHistory",
  });

  const [organizations, setOrganizations] = useState<Option[]>([]);
  const [structuralUnits, setStructuralUnits] = useState<Option[]>([]);
  const [positions, setPositions] = useState<Option[]>([]);
  const [jobTypes, setJobTypes] = useState<Option[]>([]);
  const [governmentEmployeeOptions, setGovernmentEmployeeOptions] = useState<
    Option[]
  >([]);
  const [terminationReasons, setTerminationReasons] = useState<Option[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchLookups = async () => {
      try {
        const [
          organizationsData,
          structuralUnitsData,
          positionsData,
          jobTypesData,
          governmentEmployeeOptionsData,
          terminationReasonsData,
        ] = await Promise.all([
          lookupService.getOrganizations(),
          lookupService.getStructuralUnits(),
          lookupService.getPositions(),
          lookupService.getJobTypes(),
          lookupService.getGovernmentEmployeeOptions(),
          lookupService.getTerminationReasons(),
        ]);

        if (!isMounted) return;

        setOrganizations(organizationsData);
        setStructuralUnits(structuralUnitsData);
        setPositions(positionsData);
        setJobTypes(jobTypesData);
        setGovernmentEmployeeOptions(governmentEmployeeOptionsData);
        setTerminationReasons(terminationReasonsData);
      } catch (error) {
        console.error("Lookup məlumatları yüklənərkən xəta baş verdi:", error);
      }
    };

    fetchLookups();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 mb-6">
      <div className=" flex justify-center gap-2 items-center   mb-5 ">
        <GraduationCapIcon className="h-5 w-5" />

        <h1 className="font-semibold text-neutral-800 ">
          2. Əmək fəaliyyəti-Təhsil-Elmi dərəcə -Sertifikatlar
        </h1>
      </div>
      <div className=" flex items-center gap-2  mb-5 ">
        <Wallet className="h-5 w-5" />

        <h2 className="font-semibold text-neutral-800 ">2.1 Əmək fəaliyyəti</h2>
      </div>

      {fields.map((field, index) => {
        const isCurrentlyWorking = watch(
          `employmentHistory.${index}.isCurrentlyWorking`,
        );

        return (
          <div
            key={field.id}
            className="mb-8 p-4 border border-neutral-100 rounded-lg bg-neutral-50/30"
          >
            <h3 className="font-medium text-sm text-neutral-700 mb-4">
              Əmək fəaliyyəti - {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField
                control={control}
                name={`employmentHistory.${index}.organizationName`}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-xs text-neutral-400">
                      Təşkilatın adı*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {organizations.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`employmentHistory.${index}.structuralUnit`}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-xs text-neutral-400">
                      Struktur bölmə*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {structuralUnits.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`employmentHistory.${index}.position`}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-xs text-neutral-400">
                      Vəzifə*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {positions.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`employmentHistory.${index}.isMainJob`}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-xs text-neutral-400">
                      Əsas/əlavə iş yeri
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTypes.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`employmentHistory.${index}.employmentDocument`}
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-xs text-neutral-400">
                      Əmək fəaliyyəti ilə bağlı sənəd
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".jpg,.png,.pdf"
                        onChange={(e) => onChange(e.target.files)}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`employmentHistory.${index}.isGovernmentEmployee`}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-xs text-neutral-400">
                      Dövlət qulluqçu*
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {governmentEmployeeOptions.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`employmentHistory.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-xs text-neutral-400">
                      Başlama tarixi*
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />

              <div className="col-span-3">
                <FormField
                  control={control}
                  name={`employmentHistory.${index}.isCurrentlyWorking`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 mt-2">
                      <FormControl>
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium">
                        Hal hazırda işləyir
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name={`employmentHistory.${index}.endDate`}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-xs text-neutral-400">
                      Bitmə tarixi{!isCurrentlyWorking ? "*" : ""}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        disabled={isCurrentlyWorking}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`employmentHistory.${index}.terminationReason`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-xs text-neutral-400">
                      Xitam maddəsi{!isCurrentlyWorking ? "*" : ""}
                    </FormLabel>
                    <Select
                      disabled={isCurrentlyWorking}
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {terminationReasons.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500 italic" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={() => remove(index)}
              className="text-red-500 mt-4 text-xs"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Əmək fəaliyyətini sil
            </Button>
          </div>
        );
      })}

      <Button
        type="button"
        onClick={() =>
          append({
            organizationName: "",
            structuralUnit: "",
            position: "",
            isMainJob: "",
            employmentDocument: null,
            isGovernmentEmployee: "",
            startDate: "",
            isCurrentlyWorking: false,
            endDate: "",
            terminationReason: "",
          })
        }
        className="bg-blue-600 text-white"
      >
        <Plus className="w-4 h-4 mr-2" /> Əmək fəaliyyəti əlavə et
      </Button>
    </div>
  );
}

export default EmploymentHistory;
