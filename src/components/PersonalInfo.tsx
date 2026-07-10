import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CalendarIcon, Upload, User } from "lucide-react";
import type { Option } from "../types/lookup";
import { lookupService } from "../services/lookup.service";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";

import { cn } from "../lib/utils";
import type { EmployeeFormValues } from "../schemas/employeeSchema";

function PersonalInfo() {
  const { control } = useFormContext<EmployeeFormValues>();

  const [idSeries, setIdSeries] = useState<Option[]>([]);
  const [genders, setGenders] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<Option[]>([]);
  const [nationalities, setNationalities] = useState<Option[]>([]);
  const [citizenships, setCitizenships] = useState<Option[]>([]);
  const [documentIssuers, setDocumentIssuers] = useState<Option[]>([]);

  const formatDate = (
    date: Date | string | number | null | undefined,
  ): string => {
    if (!date) return "Select date";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Select date";
    return d.toLocaleDateString("az-AZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchLookups = async () => {
      try {
        const [
          idSeriesData,
          gendersData,
          citiesData,
          maritalStatusesData,
          nationalitiesData,
          citizenshipsData,
          documentIssuersData,
        ] = await Promise.all([
          lookupService.getIdSeries(),
          lookupService.getGenders(),
          lookupService.getCities(),
          lookupService.getMaritalStatuses(),
          lookupService.getNationalities(),
          lookupService.getCitizenships(),
          lookupService.getDocumentIssuers(),
        ]);

        if (!isMounted) return;

        setIdSeries(idSeriesData);
        setGenders(gendersData);
        setCities(citiesData);
        setMaritalStatuses(maritalStatusesData);
        setNationalities(nationalitiesData);
        setCitizenships(citizenshipsData);
        setDocumentIssuers(documentIssuersData);
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
        <User className="h-5 w-5" />

        <h1 className="font-semibold text-neutral-800 ">
          1. Şəxsi məlumatlar - Əlaqə Məlumatları
        </h1>
      </div>
      <div className=" flex items-center gap-2  mb-5 ">
        <User className="h-5 w-5" />
        <h2 className="  font-semibold text-neutral-800  ">
          1.1 Şəxsi məlumatlar
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FormField
          control={control}
          name="fin"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                FİN*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="məs; 123ABC4"
                  className="h-10 border-neutral-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="idSeria"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Ş.V. seriya
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-10 border-neutral-200 bg-white text-sm">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {idSeries.map((item) => (
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
          name="idNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Ş.V. nömrəsi*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="məs; 0454876"
                  className="h-10 border-neutral-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Ad*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="məs; Elvin"
                  className="h-10 border-neutral-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Soyad*
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="məs; Həsənov"
                  className="h-10 border-neutral-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="fatherName"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Ata adı
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="məs; Murad"
                  className="h-10 border-neutral-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Cinsi*
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-10 border-neutral-200 bg-white text-sm">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genders.map((item) => (
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
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Doğum tarixi*
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-10 pl-3 text-left font-normal border-neutral-200 bg-white w-full flex justify-between items-center text-sm",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <span>{formatDate(field.value)}</span>
                      <CalendarIcon className="h-4 w-4 opacity-50 text-neutral-500" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    startMonth={new Date(1940, 0)}
                    endMonth={new Date()}
                    defaultMonth={
                      field.value ? new Date(field.value) : new Date(1995, 0)
                    }
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="birthPlace"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Doğulduğu yer*
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-10 border-neutral-200 bg-white text-sm">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((item) => (
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
          name="maritalStatus"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Ailə vəziyyəti*
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-10 border-neutral-200 bg-white text-sm">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {maritalStatuses.map((item) => (
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
          name="nationality"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Milliyyəti*
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-10 border-neutral-200 bg-white text-sm">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {nationalities.map((item) => (
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
          name="citizenship"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Vətəndaşlığı*
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-10 border-neutral-200 bg-white text-sm">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {citizenships.map((item) => (
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
          name="documentIssuer"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Sənədi verən qurum*
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-10 border-neutral-200 bg-white text-sm">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {documentIssuers.map((item) => (
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
          name="documentIssueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Sənədin verilmə tarixi*
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-10 pl-3 text-left font-normal border-neutral-200 bg-white w-full flex justify-between items-center text-sm",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <span>{formatDate(field.value)}</span>
                      <CalendarIcon className="h-4 w-4 opacity-50 text-neutral-500" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    startMonth={new Date(1990, 0)}
                    endMonth={new Date()}
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentExpiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Son etibarlılıq tarixi
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-10 pl-3 text-left font-normal border-neutral-200 bg-white w-full flex justify-between items-center text-sm",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <span>{formatDate(field.value)}</span>
                      <CalendarIcon className="h-4 w-4 opacity-50 text-neutral-500" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    startMonth={new Date()}
                    endMonth={new Date(new Date().getFullYear() + 15, 0)}
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="ssn"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                SSN - Sosial Sığorta Nömrəsi
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="məs; lorem ipsum"
                  className="h-10 border-neutral-200 bg-white text-sm focus-visible:ring-1"
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
          name="profilePicture"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Profil şəkli
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center h-10 border border-neutral-200 rounded-md overflow-hidden bg-white group hover:border-neutral-300 transition-colors">
                  <span className="text-sm text-neutral-400 pl-3 flex-1 select-none truncate">
                    {value && value instanceof FileList && value.length > 0
                      ? value[0].name
                      : value instanceof File
                        ? value.name
                        : "Drag & drop or upload file"}
                  </span>
                  <div className="h-full border-l border-neutral-200 px-3 flex items-center bg-neutral-50 group-hover:bg-neutral-100 cursor-pointer">
                    <Upload
                      className="h-4 w-4 text-neutral-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => onChange(e.target.files)}
                    {...rest}
                  />
                </div>
              </FormControl>
              <span className="text-[10px] text-neutral-400 block mt-0.5 pl-0.5">
                Max size: 5MB
              </span>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentScan"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">
                Sened skanı əlavə et
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center h-10 border border-neutral-200 rounded-md overflow-hidden bg-white group hover:border-neutral-300 transition-colors">
                  <span className="text-sm text-neutral-400 pl-3 flex-1 select-none truncate">
                    {value && value instanceof FileList && value.length > 0
                      ? value[0].name
                      : value instanceof File
                        ? value.name
                        : "Drag & drop or upload file"}
                  </span>
                  <div className="h-full border-l border-neutral-200 px-3 flex items-center bg-neutral-50 group-hover:bg-neutral-100 cursor-pointer">
                    <Upload
                      className="h-4 w-4 text-neutral-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => onChange(e.target.files)}
                    {...rest}
                  />
                </div>
              </FormControl>
              <span className="text-[10px] text-neutral-400 block mt-0.5 pl-0.5">
                Max size: 5MB
              </span>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default PersonalInfo;
