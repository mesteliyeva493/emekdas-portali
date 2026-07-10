import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Phone } from "lucide-react";
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import type { Option } from "../types/lookup";
import { lookupService } from "../services/lookup.service";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import type { EmployeeFormValues } from "../schemas/employeeSchema";

function ContactInfo() {
  const { control, watch, setValue } = useFormContext<EmployeeFormValues>();

  const isSameAddress = watch("isSameAddress");
  const registrationAddress = watch("registrationAddress");

  const [cities, setCities] = useState<Option[]>([]);
  const [phonePrefixes, setPhonePrefixes] = useState<Option[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchLookups = async () => {
      try {
        const [citiesData, phonePrefixesData] = await Promise.all([
          lookupService.getCities(),
          lookupService.getPhonePrefixes(),
        ]);

        if (!isMounted) return;

        setCities(citiesData);
        setPhonePrefixes(phonePrefixesData);
      } catch (error) {
        console.error("Lookup məlumatları yüklənərkən xəta baş verdi:", error);
      }
    };

    fetchLookups();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isSameAddress) {
      setValue("actualAddress", registrationAddress || "", { shouldValidate: true });
    }
  }, [isSameAddress, registrationAddress, setValue]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 mb-6">

      <div className="flex items-center mb-5">
        <Phone className="h-5 w-5 text-neutral-500" />
        <h2 className="font-semibold text-neutral-800 ml-2">1.2 Əlaqə və ünvan məlumatları</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

        <FormField
          control={control}
          name="registrationAddress"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">Qeydiyyat ünvanı*</FormLabel>
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
          name="isSameAddress"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 h-10 md:mt-5 select-none">
              <FormControl>
                <input
                  type="checkbox"
                  id="isSameAddress"
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-neutral-600 focus:ring-neutral-500 cursor-pointer"
                />
              </FormControl>
              <label
                htmlFor="isSameAddress"
                className="text-xs font-medium text-neutral-600 cursor-pointer"
              >
                Qeydiyyat və faktiki ünvan ile eynidir
              </label>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="actualAddress"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">Faktiki ünvan*</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                disabled={isSameAddress}
              >
                <FormControl>
                  <SelectTrigger className={cn(
                    "h-10 border-neutral-200 text-sm",
                    isSameAddress ? "bg-neutral-50 text-neutral-400 cursor-not-allowed" : "bg-white"
                  )}>
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
          name="phonePrefix"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">Mobil nömrə-prefiks*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="h-10 border-neutral-200 bg-white text-sm">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {phonePrefixes.map((item) => (
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">Mobil nömrə*</FormLabel>
              <FormControl>
                <Input
                  placeholder="5678901"
                  maxLength={7}
                  className="h-10 border-neutral-200"
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
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">E-mail*</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="məs; memmed@gmail.com"
                  className="h-10 border-neutral-200"
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
          name="fax"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">Fax</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex; Lorem ipsum"
                  className="h-10 border-neutral-200"
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
          name="postalCode"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="text-xs font-medium text-neutral-400">Poçt indeksi</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex; Lorem ipsum"
                  className="h-10 border-neutral-200"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 italic" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default ContactInfo;